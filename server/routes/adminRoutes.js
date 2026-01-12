import express from "express";
import { verifyToken, isAdmin } from "../middleware/auth.js";
import Job from "../models/job.js";
import User from "../models/user.js";

const router = express.Router();

// GET ALL USERS
router.get("/users", verifyToken, isAdmin, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// GET ALL JOBS
router.get("/jobs", verifyToken, isAdmin, async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

// DELETE A JOB
router.delete("/jobs/:id", verifyToken, isAdmin, async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: "Job deleted" });
});

export default router;
