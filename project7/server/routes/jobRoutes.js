import express from "express";
import Job from "../models/Job.js";

const router = express.Router();

// Get all jobs
router.get("/", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

// Add new job
router.post("/", async (req, res) => {
  const newJob = new Job(req.body);
  await newJob.save();
  res.json({ message: "Job added", job: newJob });
});

export default router;
