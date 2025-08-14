import { config } from "../../config/env.provider.js";
// import * as userService from "./user.service.js";
import  {userService} from "./index.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { responseHandler } from "../../utils/responseHandler.js";

export const register = async (req, res, next) => {
  try {
    const { user, token, cookieOptions } = await userService.registerUser(req.body);
    res.cookie(config.COOKIE_NAME, token, cookieOptions);

    responseHandler(res, {
      user: { id: user._id, name: user.name, email: user.email
      },
      message: "Registered successfully"
    });
 
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { user, token, cookieOptions } = await userService.loginUser(req.body);
    res.cookie(config.COOKIE_NAME, token, cookieOptions);
    
    responseHandler(res, {
      user: { id: user._id, name: user.name, email: user.email },
      message: "Logged in successfully"
    });


  } catch (err) {
    next(err);
  }
};

export const me = async (req, res, next) => {
  try {
    const user = await userService.getMe(req.user.id);

    responseHandler(res, {
      user: { id: user._id, name: user.name, email: user.email },
      message: "User info retrieved successfully"
    });

  } catch (err) {
    next(err);
  }
};

export const logout = async (_req, res) => {
  await userService.logoutUser();
  res.clearCookie(config.COOKIE_NAME, { path: "/", sameSite: "lax" });
  
  return responseHandler(res, {
    message: "Logged out successfully"
  });
};

