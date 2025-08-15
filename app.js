import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middlewares/errorHandler.js";
import { ApiError } from "./utils/ApiError.js";
import routes from "./routes/routes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",           // local dev
  "https://your-frontend-domain.com" // production frontend
];

// ===== Middlewares =====
app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
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
