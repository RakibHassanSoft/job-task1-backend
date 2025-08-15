import createHttpError from "http-errors";
// import { User } from "./User.model";
import { User } from "./index.js";
import { signAccessToken } from "../../utils/jwt.js";
import { config } from "../../config/env.provider.js";

const cookieOptions = {
  httpOnly: true,
  secure: config.NODE_ENV === "production",  // only in production
  sameSite: config.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
  maxAge: 24 * 60 * 60 * 1000, // 1 day
};


/**
 * Register a new user
 * @param {Object} data - { name, email, password }
 * @returns {Object} - { user, token }
 */
export const registerUser = async ({ name, email, password }) => {
  const exists = await User.findOne({ email });
  if (exists) throw createHttpError(409, "Email already registered");

  const user = await User.create({ name, email, password });
  const token = signAccessToken({ id: user._id });

  return { user, token, cookieOptions };
};

/**
 * Login user
 * @param {Object} data - { email, password }
 * @returns {Object} - { user, token }
 */
export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw createHttpError(401, "Invalid credentials");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw createHttpError(401, "Invalid credentials");

  const token = signAccessToken({ id: user._id });
  return { user, token, cookieOptions };
};


export const getMe = async (userId) => {
  const user = await User.findById(userId).select("name email");
  if (!user) throw createHttpError(404, "User not found");
  return user;
};

/**
 * Logout user (currently just clears cookie in controller)
 */
export const logoutUser = () => true;

export { cookieOptions };
