import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  userType: {
    type: String,
    enum: {
      values: ["consumer", "vendor", "moderator", "admin"],
      message: "{VALUE} is not supported",
    },
    required: [true, "Please provide user type"],
  },
  userName: {
    type: String,
    minlength: [5, "Minimum 5 letter Required"],
    maxlength: [15, "Maximum 15 characters only"],
    required: [true, "Please provide username"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email address"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: [6, "Minimum 6 letter Required"],
    select: false,
  },
  phoneNo: {
    type: String,
    minlength: [10, "10 Digits Required"],
    maxlength: [12, "Maximum 12 Digits allowed"],
    required: [true, "Please provide phone number"],
    unique: true,
    trim: true,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  refreshToken: String,
  profile: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    refPath: "onModel",
  },
  onModel: {
    type: String,
    required: true,
    enum: ["Consumer", "Vendor", "Moderator", "Admin"],
  },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
  });
};

UserSchema.methods.getRefreshToken = function () {
  const refreshToken = jwt.sign(
    { id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
    }
  );
  this.refreshToken = refreshToken;
  this.save();
  return refreshToken;
};

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token (private key) and save to database
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set token expire date
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes
  // call .save() after this getResetPasswordToken() function call to reflect this change in db
  return resetToken;
};

const User = mongoose.model("User", UserSchema);

export default User;
