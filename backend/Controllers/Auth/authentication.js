import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../../Models/Common/User.js";
import Consumer from "../../Models/Consumer.js";
import ErrorResponse from "../../Utils/errorResponse.js";
import sendEmail from "../../Utils/sendEmail.js";
import {
  forgetPasswordSchema,
  loginSchema,
  signUpConsumerSchema,
} from "../validation.js";
import { nanoid } from "nanoid";
import {
  CONSUMER_AC_VERIFICATION_BASE_URL,
  PASSWORD_RESET_BASE_URL,
  STATUS_CODE,
} from "../../Utils/constents.js";
import {
  emailVerificationTemplate,
  forgetPasswordTemplate,
} from "../../Utils/emailTemplates.js";

// @desc    Login user and sent login token and user info
export const loginConsumer = async (req, res, next) => {
  // End User Request Validation against the Login Schema
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    return next(new ErrorResponse(`${error.message}`, STATUS_CODE.BAD_REQUEST));
  }
  const { email, password, phoneNo } = value;
  let user = null;
  try {
    if (email) {
      // Login using Email
      user = await User.findOne({ email }).select("+password");
    } else if (phoneNo) {
      //Login Using Phone No
      user = await User.findOne({ phoneNo }).select("+password");
    }
    if (!user) {
      return next(
        new ErrorResponse("Invalid credentials", STATUS_CODE.UNAUTHORIZED)
      );
    }
    // Check that password match
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(
        new ErrorResponse("Invalid credentials", STATUS_CODE.UNAUTHORIZED)
      );
    }

    // updates last active time when login
    const consumer = await Consumer.findByIdAndUpdate(user.profile, {
      $set: { "meta.lastActive": Date.now() },
    });

    // updates status from registerd to active on first time login
    if (consumer.get("meta.status") === "registered") {
      console.log("you made a first time login, you are now active user");
      consumer.meta.status = "active";
      await consumer.save();
    }

    sendToken(user, STATUS_CODE.OK, res);
  } catch (err) {
    return next(err);
  }
};

// @desc    Logout User and remove Refresh Token
export const logoutUser = async (req, res, next) => {
  // On client side, also delete the accessToken

  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(STATUS_CODE.NO_CONTENT);
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const user = await User.findOne({ refreshToken });

  if (!user) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(STATUS_CODE.NO_CONTENT);
  }

  // Delete refreshToken in db
  user.refreshToken = "";
  const result = await user.save();
  console.log(result);
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(STATUS_CODE.NO_CONTENT);
};

// @desc create a account for consumer
export const signupConsumer = async (req, res, next) => {
  // End User Request Validation with the Signup Schema
  const { error, value } = signUpConsumerSchema.validate(req.body);
  if (error) {
    return next(new ErrorResponse(`${error.message}`, STATUS_CODE.BAD_REQUEST));
  }
  const { account, profile } = value;
  const { userName, email, password, phoneNo } = account;
  const { firstName, lastName, age, sex, bio } = profile;

  // Gaurd Functions
  if (await User.exists({ email })) {
    return next(new ErrorResponse("email already exist", STATUS_CODE.CONFLICT));
  }
  if (await User.exists({ phoneNo })) {
    return next(new ErrorResponse("phone already exist", STATUS_CODE.CONFLICT));
  }

  const emailCode = nanoid();
  // TODO: use rapid api to sent sms verification code to verify ph no

  try {
    const consumer = await Consumer.create({
      meta: {
        firstName,
        lastName,
        age,
        sex,
        bio,
      },
      verify: {
        emailCode,
      },
    });

    const user = await User.create({
      userType: "consumer",
      userName,
      email,
      password,
      phoneNo,
      profile: consumer._id,
      onModel: "Consumer",
    });

    // HTML Message
    const fullName = `${firstName} ${lastName || ""} ...`;
    const verificationUrl = `${CONSUMER_AC_VERIFICATION_BASE_URL}/${emailCode}?email=${email}`;
    const message = emailVerificationTemplate(verificationUrl, fullName);

    // verification email sent
    sendVerificationEmail(fullName, email, message, next);

    // sending access token to user
    sendToken(user, STATUS_CODE.CREATED, res);
  } catch (err) {
    console.log("couldn't create consumer");
    return next(err);
  }
};

// @desc verifies the consumer using the verification email sent
export const verifyConsumer = async (req, res, next) => {
  const emailCode = req.params.emailCode;
  const email = req.query.email;
  const password = req.body.password;
  if (!password || !emailCode || !email) {
    return next(new ErrorResponse("Missing Field", STATUS_CODE.BAD_REQUEST));
  }
  try {
    const user = await User.findOne({ email })
      .select("+password")
      .populate("profile");
    if (!user || user.profile.verify.emailCode !== emailCode) {
      return next(new ErrorResponse("Invalid URL", STATUS_CODE.BAD_REQUEST));
    }
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(
        new ErrorResponse("Invalid Credentials", STATUS_CODE.NOT_FOUND)
      );
    }
    //updates the verifiedEmail to TRUE on the consumer
    await Consumer.findByIdAndUpdate(user.profile, {
      "verify.verifiedEmail": true,
    });

    res.sendStatus(STATUS_CODE.NO_CONTENT);
  } catch (err) {
    return next(err);
  }
};

// // @desc    Forgot Password Initialization, Send Email to email provided
export const forgotPassword = async (req, res, next) => {
  // End User Request Validation against the Login Schema
  const { error, value } = forgetPasswordSchema.validate(req.body);
  if (error) {
    return next(new ErrorResponse(`${error.message}`, STATUS_CODE.BAD_REQUEST));
  }
  const { email } = value;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("Invalid Email", STATUS_CODE.NOT_FOUND));
    }
    // Reset Token Gen and add to database hashed (private) version of token
    const resetToken = user.getResetPasswordToken();
    await user.save();

    // Create reset url to email to provided email
    const resetUrl = `${PASSWORD_RESET_BASE_URL}?resetToken=${resetToken}`;
    const username = user.get("userName");

    // HTML Message
    const message = forgetPasswordTemplate(resetUrl, username);

    try {
      await sendEmail({
        to: email,
        subject: "You have requested a Password Reset",
        text: message,
      });

      res.status(STATUS_CODE.ACCEPTED).json({ message: "Email Sent" });
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(
        new ErrorResponse(
          "Email could not be sent",
          STATUS_CODE.INTERNAL_SERVER_ERROR
        )
      );
    }
  } catch (err) {
    next(err);
  }
};

// // @desc    Reset User Password
export const resetPassword = async (req, res, next) => {
  const resetToken = req.query.resetToken;
  const newPassword = req.body.password;
  if (!resetToken || !newPassword) {
    return next(new ErrorResponse("Missing Fields", STATUS_CODE.BAD_REQUEST));
  }
  // Compare token in URL params to hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid Token", STATUS_CODE.BAD_REQUEST));
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(STATUS_CODE.CREATED).json({
      message: "Password Updated Successfully",
      token: user.getAccessToken(),
    });
  } catch (err) {
    next(err);
  }
};

// @desc get the new AccessToken Using the RefreshToken stored in client
export const getAccessTokenUsingRefreshToken = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return next(
      new ErrorResponse("Refresh Token Missing", STATUS_CODE.UNAUTHORIZED)
    );
  }
  const refreshToken = cookies.jwt;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    return next(new ErrorResponse("Invalid Token", STATUS_CODE.FORBIDDEN));
  }
  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || user._id !== decoded._id)
      return res.sendStatus(STATUS_CODE.FORBIDDEN);
    const accessToken = user.getAccessToken();
    res.json({ accessToken });
  });
};

// @desc sent the login token and user info details to the user
const sendToken = async (user, statusCode, res, projectOptions = {}) => {
  const accessToken = user.getAccessToken();
  const refreshToken = user.getRefreshToken();

  const userData = await User.findById(user._id, projectOptions)
    .populate("profile")
    .lean();

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  }); //secure: true,

  res.status(statusCode).json({ accessToken, userData });
};
// @desc sending the verification email to the user when registerd an account
const sendVerificationEmail = async (fullName, email, message, next) => {
  try {
    await sendEmail({
      to: email,
      subject: `Hi ${fullName} Kindly verify your email address`,
      text: message,
    });
  } catch (err) {
    console.log(err);
    return next(
      new ErrorResponse(
        "Email could not be sent",
        STATUS_CODE.INTERNAL_SERVER_ERROR
      )
    );
  }
};

// for debug - to get all user details
export const getAllUsers = async (req, res, next) => {
  const key = req.query.key;
  if (!key) {
    return next(new ErrorResponse("Missing Key", STATUS_CODE.UNAUTHORIZED));
  }
  if (key !== "iamadmin") {
    return next(new ErrorResponse("Not Authorised", STATUS_CODE.FORBIDDEN));
  }
  try {
    const users = await User.find()
      .select("+password")
      .populate("profile")
      .lean();
    console.log("debug-log: admin - all user requested");
    res.status(STATUS_CODE.OK).json({
      users,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// for debug - to get all user details
export const deleteAllUsers = async (req, res, next) => {
  const key = req.query.key;
  if (!key) {
    return next(new ErrorResponse("Missing Key", STATUS_CODE.UNAUTHORIZED));
  }
  if (key !== "iamadmin") {
    return next(new ErrorResponse("Not Authorised", STATUS_CODE.FORBIDDEN));
  }
  try {
    const users = await User.deleteMany({}).exec();
    const consumers = await Consumer.deleteMany({}).exec();
    console.log("debug-log: admin - all user delete requested");
    res.status(STATUS_CODE.OK).json({
      users,
      consumers,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
