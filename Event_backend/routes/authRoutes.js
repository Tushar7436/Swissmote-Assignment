const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Get current logged-in user (Protected Route)
router.get("/user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});


// User Registration - POST /api/auth/register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1️⃣ Check if the user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "Email already registered" });

    // 2️⃣ Hash the password before storing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3️⃣ Save user to MongoDB
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    // 4️⃣ Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // 5️⃣ Send response
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });

  } catch (error) {
    res.status(500).send("Server Error");
  }
});


// User Login Route - POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1️⃣ Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    // 2️⃣ Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // 3️⃣ Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // 4️⃣ Send response to frontend
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });

  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
