import { STATUS_CODE } from "../Utils/constents.js";
import ErrorResponse from "../Utils/errorResponse.js";

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  if (err.code === 11000) {
    const message = `Duplicate Field value entered`;
    error = new ErrorResponse(message, STATUS_CODE.BAD_REQUEST);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, STATUS_CODE.BAD_REQUEST);
  }

  console.log("Err Middleware Msg : ", error.message);

  res.status(error.statusCode || STATUS_CODE.INTERNAL_SERVER_ERROR).json({
    error: error.message || "Server Error",
  });
};

export default errorHandler;
