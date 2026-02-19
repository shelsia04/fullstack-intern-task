const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
}

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    if (!name || name.trim().length < 2) {
      return res.status(400).json({ message: "Name must be at least 2 characters" });
    }
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ message: "Valid email is required" });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) return res.status(409).json({ message: "Email already registered" });

    const passwordHash = await bcrypt.hash(password, 10);
    await User.create({ name: name.trim(), email: email.toLowerCase().trim(), passwordHash });

    return res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ message: "Valid email is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
