import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV ,
  CLIENT_URL: process.env.CLIENT_URL,

  // Database
  MONGODB_URI: process.env.MONGODB_URI,

  // JWT
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES ,
  COOKIE_NAME: process.env.COOKIE_NAME ,
  SALT_ROUNDS:process.env.SALT_ROUNDS ,
};
