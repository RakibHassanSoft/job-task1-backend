// server/src/middlewares/auth.js
import jwt from "jsonwebtoken";
import { config } from "../config/env.provider.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../src/user/index.js"; 

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies[config.COOKIE_NAME] || req.headers.authorization?.split(" ")[1];
    if (!token) throw new ApiError(401, "Unauthorized");

    const decoded = jwt.verify(token, config.JWT_ACCESS_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) throw new ApiError(401, "User not found");

    next();
  } catch (err) {
    next(err);
  }
};

export default authMiddleware;
