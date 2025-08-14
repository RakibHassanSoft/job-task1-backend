import { config } from "../../config/env.provider.js";
// import * as userService from "./user.service.js";
import  {userService} from "./index.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const register = async (req, res, next) => {
  try {
    const { user, token, cookieOptions } = await userService.registerUser(req.body);
    res.cookie(config.COOKIE_NAME, token, cookieOptions);
    return res.status(201).json(
      new ApiResponse(
        { user: { id: user._id, name: user.name, email: user.email } },
        "Registered successfully"
      )
    );
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { user, token, cookieOptions } = await userService.loginUser(req.body);
    res.cookie(config.COOKIE_NAME, token, cookieOptions);
    return res.json(
      new ApiResponse(
        { user: { id: user._id, name: user.name, email: user.email } },
        "Logged in successfully"
      )
    );
  } catch (err) {
    next(err);
  }
};

export const me = async (req, res, next) => {
  try {
    const user = await userService.getMe(req.user.id);
    return res.json(new ApiResponse({ user }, "User info"));
  } catch (err) {
    next(err);
  }
};

export const logout = (_req, res) => {
  userService.logoutUser();
  res.clearCookie(config.COOKIE_NAME, { path: "/", sameSite: "lax" });
  return res.json(new ApiResponse({}, "Logged out successfully"));
};
