import express from "express";
import User from "../models/user.js";
import Job from "../models/job.js";
import Application from "../models/application.js";

const router = express.Router();

// === GET USER DATA ===
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("savedJobs")
      .populate("appliedJobs");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// === UPDATE PROFILE ===
router.put("/:id/profile", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { profile: req.body },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// === SAVE JOB ===
router.post("/:id/save/:jobId", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user.savedJobs.includes(req.params.jobId)) {
      user.savedJobs.push(req.params.jobId);
      await user.save();
    }
    res.json({ message: "Job saved successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// === REMOVE SAVED JOB ===
router.delete("/:id/save/:jobId", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.savedJobs = user.savedJobs.filter(
      (jobId) => jobId.toString() !== req.params.jobId
    );
    await user.save();
    res.json({ message: "Job removed from saved list" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// === APPLY FOR JOB ===
router.post("/:id/apply/:jobId", async (req, res) => {
  try {
    const { id, jobId } = req.params;

    const existingApp = await Application.findOne({ user: id, job: jobId });
    if (existingApp) return res.json({ message: "Already applied" });

    const application = new Application({ user: id, job: jobId });
    await application.save();

    const user = await User.findById(id);
    user.appliedJobs.push(jobId);
    await user.save();

    res.json({ message: "Job application submitted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
