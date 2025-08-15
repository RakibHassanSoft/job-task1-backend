import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middlewares/errorHandler.js";
import { ApiError } from "./utils/ApiError.js";
import routes from "./routes/routes.js";

const app = express();

// ===== Allowed origins =====
const allowedOrigins = [
  "http://localhost:5173", // local dev
  "https://jocular-fenglisu-bf33a6.netlify.app" // production frontend
];

// ===== Middlewares =====
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman or server-to-server requests
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy does not allow this origin"), false);
    }
  },
  credentials: true, // required for cookies
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
