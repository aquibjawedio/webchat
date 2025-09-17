import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import from folders
import { env } from "./config/env.js";

// Import all routes
import { healthRouter } from "./routes/health.route.js";

const app = express();

app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Database Connection

// Handling all routes here

app.use("/api/v1/health", healthRouter);

export { app };
