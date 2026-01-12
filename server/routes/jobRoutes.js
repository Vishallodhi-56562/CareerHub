import express from "express";
import Job from "../models/job.js";

const router = express.Router();

// Get all jobs
router.get("/", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});


router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Add new job
router.post("/", async (req, res) => {
  const newJob = new Job(req.body);
  await newJob.save();
  res.json({ message: "Job added", job: newJob });
});

// SEARCH JOBS
router.get("/search", async (req, res) => {
  try {
    const { q, type, location } = req.query;

    const filter = {};

    if (q) {
      filter.$or = [
        { jobTitle: { $regex: q, $options: "i" } },
        { companyName: { $regex: q, $options: "i" } }
      ];
    }

    if (type) {
      filter.jobType = type;
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    const jobs = await Job.find(filter);

    res.json(jobs);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Search failed" });
  }
});


export default router;
