export const BASE_URL = "http://localhost:5000";

export const STATUS_CODE = {
  //SUCCESS
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT : 204,
  PARTIAL_CONTENT: 206,
  //CLIENT ERRORS
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  //SERVER ERRORS
  INTERNAL_SERVER_ERROR: 500,
};

export const CONSUMER_AC_VERIFICATION_BASE_URL =
  "http://localhost:3000/consumer/verify";

export const PASSWORD_RESET_BASE_URL = "http://localhost:3000/reset-password";
