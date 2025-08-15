import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import { joiValidate } from "../../middlewares/joiValidate.js";
import { expanceValidation, expanceController } from "./index.js";

const router = express.Router();

// Protect all routes
router.use(authMiddleware);

// Routes
router.post(
  "/create",
  joiValidate(expanceValidation.expenseSchemaCreate),
  authMiddleware,
  expanceController.create
);
router.post(
  "/create",
  joiValidate(expanceValidation.expenseSchemaCreate),
  authMiddleware,
  expanceController.create
);
router.get("/all", authMiddleware, expanceController.getAll);
router.patch(
  "/update/:id",
  joiValidate(expanceValidation.expenseSchemaUpdate),
  authMiddleware,
  expanceController.update
);
router.delete("/delete/:id", authMiddleware, expanceController.remove);

export default router;

