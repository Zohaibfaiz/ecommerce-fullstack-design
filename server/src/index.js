import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { connectDatabase, seedDatabaseIfEmpty } from "./db/connect.js";
import authRouter from "./routes/auth.js";
import productsRouter from "./routes/products.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === "production";

const allowedOrigins = (process.env.CLIENT_URL || "http://127.0.0.1:5173,http://127.0.0.1:5174")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin) || !isProduction) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "API is running", environment: process.env.NODE_ENV || "development" });
});

app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);

const clientDist = path.resolve(__dirname, "../../client/dist");
if (isProduction && fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get(/^\/(?!api).*/, (_req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: error.message || "Internal server error" });
});

async function start() {
  await connectDatabase();
  await seedDatabaseIfEmpty();
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    if (isProduction && fs.existsSync(clientDist)) {
      console.log("Serving client build from /");
    }
  });
}

start().catch((error) => {
  console.error("Failed to start server:", error.message);
  process.exit(1);
});
