import express from "express";
import { verifyToken, isAdmin } from "../middleware/auth.js";
import User from "../models/user.js";
import Job from "../models/job.js";

const router = express.Router();

// 📌 Get all analytics data
router.get("/", verifyToken, isAdmin, async (req, res) => {
  try {
    // total users
    const totalUsers = await User.countDocuments();

    // admins vs users
    const adminCount = await User.countDocuments({ role: "admin" });
    const userCount = await User.countDocuments({ role: "user" });

    // total jobs
    const totalJobs = await Job.countDocuments();

    // jobs per month (last 6 months)
    const monthlyJobs = await Job.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      totalUsers,
      adminCount,
      userCount,
      totalJobs,
      monthlyJobs,
      // no applications collection yet, so we skip until you create Apply collection
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Analytics fetch failed" });
  }
});

export default router;
