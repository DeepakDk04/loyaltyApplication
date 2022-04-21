import jwt from "jsonwebtoken";
import { STATUS_CODE } from "../Utils/constents.js";

const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer "))
    return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(STATUS_CODE.FORBIDDEN); //invalid token
    req.user = decoded.username;
    next();
  });
};

export default verifyAccessToken;
