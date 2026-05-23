import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "../server/src/routes/auth.js";
import productsRouter from "../server/src/routes/products.js";
import { connectDatabase, seedDatabaseIfEmpty } from "../server/src/db/connect.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Database connection middleware for Serverless environment
app.use(async (req, res, next) => {
  try {
    await connectDatabase();
    await seedDatabaseIfEmpty();
    next();
  } catch (err) {
    console.error("Database connection error in Serverless Function:", err);
    res.status(500).json({ message: "Database connection failed", error: err.message });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "API is running on Vercel Serverless Functions" });
});

app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);

export default app;
