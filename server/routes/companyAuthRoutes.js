import express from "express";
import Company from "../models/company.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// REGISTER COMPANY
router.post("/register", async (req, res) => {
  try {
    const { companyName, email, password, location, about, website } = req.body;

    const existing = await Company.findOne({ email });
    if (existing) return res.status(400).json({ message: "Company already exists" });

    const company = new Company({
      companyName,
      email,
      password,
      location,
      about,
      website
    });

    await company.save();

    const token = jwt.sign(
      { id: company._id, role: "company" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Company registered",
      company,
      token
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Registration failed" });
  }
});

// LOGIN COMPANY
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const company = await Company.findOne({ email });
    if (!company) return res.status(400).json({ message: "Company not found" });

    const match = await company.comparePassword(password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: company._id, role: "company" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Company logged in",
      company,
      token
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Login failed" });
  }
});

export default router;
