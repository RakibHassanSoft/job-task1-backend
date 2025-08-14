// app.js
import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { globalErrorHandler } from "./middlewares/errorHandler.js";
import { ApiError } from "./utils/ApiError.js";


// Routes
import routes from "./routes/routes.js";

const app = express();


// ===== Global Middlewares =====
// Security headers
app.use(helmet());
// CORS
app.use(cors({ origin: "*", credentials: true }));
// Logging (only in dev)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// JSON body parsing & cookies
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
// Rate limiter
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests, please try again later."
  })
);


// ===== Routes =====
app.use("/api/v1", routes);
app.use("/api/v1", (req, res) => {
  res.send("Server is running successfully! Welcome to the API.");
});



// ===== 404 Handler =====
app.use((req, res, next) => {
  next(new ApiError(404, "Route not found"));
});

// ===== Error Handler =====
app.use(globalErrorHandler);

export default app;
