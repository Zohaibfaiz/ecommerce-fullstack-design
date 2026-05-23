import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

function extractUser(req, res) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    res.status(401).json({ message: "Authentication required" });
    return null;
  }

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
    return null;
  }
}

export function requireAuth(req, res, next) {
  const payload = extractUser(req, res);
  if (!payload) return;
  req.user = payload;
  next();
}

export async function requireAdmin(req, res, next) {
  const payload = extractUser(req, res);
  if (!payload) return;

  try {
    const user = await User.findById(payload.id).lean();
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    req.user = { ...payload, role: user.role };
    next();
  } catch (error) {
    next(error);
  }
}
