import jwt from "jsonwebtoken";
import ErrorResponse from "../Utils/errorResponse.js";
import User from "../Models/Common/User.js";
import { STATUS_CODE } from "../Utils/constents.js";

export async function protect(req, res, next) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new ErrorResponse(
        "Not authorized to access this route",
        STATUS_CODE.UNAUTHORIZED
      )
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(
        new ErrorResponse("No user found with this id", STATUS_CODE.NOT_FOUND)
      );
    }

    req.user = user;
    next();
  } catch (err) {
    return next(
      new ErrorResponse(
        "Not authorized to access this router",
        STATUS_CODE.UNAUTHORIZED
      )
    );
  }
}
