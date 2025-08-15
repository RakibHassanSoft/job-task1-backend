import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middlewares/errorHandler.js";
import { ApiError } from "./utils/ApiError.js";
import routes from "./routes/routes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",           // local dev
  "jocular-fenglisu-bf33a6.netlify.app" // production frontend
];

// ===== Middlewares =====
app.use(cors({
  origin: "*",          // <-- allow all origins
  credentials: true,    // allow cookies
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());

// ===== Routes =====
app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.send("Server is running successfully! Welcome to the API.");
});

// ===== 404 Handler =====
app.use((req, res, next) => next(new ApiError(404, "Route not found")));

// ===== Error Handler =====
app.use(globalErrorHandler);

export default app;
