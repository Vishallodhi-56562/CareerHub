// models/job.js
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  salary: { type: String, required: true },
  description: { type: String },
}, { timestamps: true });

// ✅ Prevent OverwriteModelError
export default mongoose.models.Job || mongoose.model("Job", jobSchema);
