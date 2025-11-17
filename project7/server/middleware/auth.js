// server/middleware/auth.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "changeme";

// verifyToken — same as "protect"
export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    if (!token) return res.status(401).json({ message: "Not authorized, token missing" });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    req.tokenPayload = decoded; // optional helper
    next();
  } catch (err) {
    console.error("verifyToken error:", err.message);
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};

// isAdmin — middleware that requires admin role
export const isAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Not authenticated" });
  if (req.user.role !== "admin") return res.status(403).json({ message: "Admin access required" });
  next();
};

// Backwards-compatible aliases (if other files import protect/adminOnly)
export const protect = verifyToken;
export const adminOnly = isAdmin;
