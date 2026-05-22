import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || "http://127.0.0.1:5173" }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "Backend scaffold is ready for Week 2 product APIs.",
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
