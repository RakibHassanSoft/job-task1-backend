import express from "express";
import {userRouter} from "../src/user/index.js";

const router = express.Router();


// User routes
router.use("/user", userRouter);

export default router;