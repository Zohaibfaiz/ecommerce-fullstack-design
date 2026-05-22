import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDatabase, seedDatabaseIfEmpty } from "./db/connect.js";
import productsRouter from "./routes/products.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || "http://127.0.0.1:5173" }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "API is running" });
});

app.use("/api/products", productsRouter);

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: error.message || "Internal server error" });
});

async function start() {
  await connectDatabase();
  await seedDatabaseIfEmpty();
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error("Failed to start server:", error.message);
  process.exit(1);
});
