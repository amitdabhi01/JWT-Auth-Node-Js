import User from "../model/User.js";
import HttpsError from "./HttpError.js";

import jwt from "jsonwebtoken";

const auth = async function (req, res, next) {
  try {
    const authHeader = req.header("Authorization");

    console.log("authHeader", authHeader);

    if (!authHeader) {
      return next(new HttpsError("auth header is required", 401));
    }

    const token = authHeader.replace("Bearer ", "");

    console.log("token", token);

    const decoded = jwt.verify(process.env.JWT_SECRET);

    console.log("decoded", decoded);

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      return next(new HttpsError("authentication failed", 401));
    }

    req.user = user;

    req.token = token;

    next();
  } catch (error) {
    next(new HttpsError("please authenticate", 401))
  }
};

export default auth;
