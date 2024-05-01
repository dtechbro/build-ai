const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register endpoint
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    user = new User({ username, email, password });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    // Generate JWT token with user credentials
    const token = jwt.sign(
      { user: { id: user.id, username, email } },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully.",
      token,
      user: { id: user.id, username, email },
    });
  } catch (error) {
    console.error(error.message);
    // Handle specific errors (e.g., mongoose validation errors)
    if (error.name === "MongoError" && error.code === 11000) {
      return res.status(400).json({ message: "Duplicate field value" });
    }
    res.status(500).json({ message: "Server Error" });
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token with user credentials
    const token = jwt.sign(
      { user: { id: user.id, username: user.username, email: user.email } },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successfully",
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error, Please try again" });
  }
});

// Logout endpoint
router.post("/logout", (req, res) => {
  res.json({ message: "Logged out" });
});

module.exports = router;
