import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  jobDescription: { type: String, required: true },
  jobType: { type: String, enum: ["full-time", "part-time", "internship", "contract"], required: true },
  salary: { type: Number, required: true },
  location: { type: String, required: true },
  requirements: { type: String },

  // Company that posted the job
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },

  createdAt: { type: Date, default: Date.now }
});

// IMPORTANT: prevent OverwriteModelError
export default mongoose.models.Job || mongoose.model("Job", jobSchema);
