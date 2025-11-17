import express from "express";
import Job from "../models/job.js";
import Company from "../models/company.js";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// POST A JOB (company only)
router.post("/post", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "company") {
      return res.status(403).json({ message: "Only companies can post jobs" });
    }

    const { jobTitle, jobDescription, jobType, salary, location, requirements } = req.body;

    const job = new Job({
      jobTitle,
      jobDescription,
      jobType,
      salary,
      location,
      requirements,
      companyId: req.user.id
    });

    await job.save();

    res.json({ message: "Job posted successfully", job });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Job posting failed" });
  }
});

// GET JOBS POSTED BY THIS COMPANY
router.get("/my-jobs", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "company") {
      return res.status(403).json({ message: "Only companies can view this" });
    }

    const jobs = await Job.find({ companyId: req.user.id });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Error loading jobs" });
  }
});

export default router;
