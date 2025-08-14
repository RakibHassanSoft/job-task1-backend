import express from "express";
import {userRouter} from "../src/user/index.js";
import {expanceRouter} from "../src/expense/index.js";


const router = express.Router();


// User routes
router.use("/auth", userRouter);
// Expense routes
router.use("/expense", expanceRouter);

export default router;