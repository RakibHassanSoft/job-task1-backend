import express from "express";
import { userController } from "./index.js";

import { joiValidate } from "../../middlewares/joiValidate.js";
import { registerSchema, loginSchema } from "./user.validation.js"; 
import authMiddleware from "../../middlewares/auth.js";


const router = express.Router();

// Register
router.post("/register", joiValidate(registerSchema), userController.register);

// Login
router.post("/login", joiValidate(loginSchema), userController.login);

// Get current user info
router.get("/me", authMiddleware, userController.me);

// Logout
router.post("/logout", userController.logout);

export default router;
