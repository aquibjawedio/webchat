import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import from folders
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import "./config/passport.js";

// Import all routes
import { healthRouter } from "./routes/health.route.js";
import { authRouter } from "./routes/auth.route.js";

const app = express();

app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  })
);
app.set("trust proxy", 1);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Database Connection
connectDB();

// Handling all routes here

app.use("/api/v1/health", healthRouter);
app.use("/api/v1/auth", authRouter);

// ERROR HANDLING MIDDLEWARE
app.use(errorHandler);

export { app };
