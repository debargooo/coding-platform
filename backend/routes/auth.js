const express = require("express");
const db = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

// User Registration
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Please provide a valid email." });
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error:
        "Password must contain at least one uppercase letter, one number, one special character, and be at least 8 characters long.",
    });
  }

  // Check if email exists
  const emailCheckQuery = "SELECT * FROM User WHERE Email = ?";
  db.query(emailCheckQuery, [email], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (result.length > 0) {
      return res.status(400).json({ error: "Email is already registered." });
    }

    // Check if username exists
    const usernameCheckQuery = "SELECT * FROM User WHERE Username = ?";
    db.query(usernameCheckQuery, [name], async (err, result) => {
      if (err) return res.status(500).json({ error: "Database error" });

      if (result.length > 0) {
        return res.status(400).json({ error: "Username is already taken." });
      }

      try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password:", hashedPassword);

        // Insert user into database
        const sql = "INSERT INTO User (Username, Email, Password) VALUES (?, ?, ?)";
        db.query(sql, [name, email, hashedPassword], (err, result) => {
          if (err) return res.status(500).json({ error: "Database error" });

          res.status(201).json({ message: "User created successfully", userId: result.insertId });
        });
      } catch (hashError) {
        return res.status(500).json({ error: "Error hashing password" });
      }
    });
  });
});


// User Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const jwtSecretKey = process.env.JWT_SECRET_KEY;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const query = "SELECT * FROM User WHERE Email = ?";
  db.query(query, [email], async (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (result.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const user = result[0];

    // 🔥 Compare the hashed password with the entered password
    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign({ userId: user.UserId }, jwtSecretKey, { expiresIn: "7d" });

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 3600000, // 1 hour
    });

    return res.json({ token, username: user.Username });
  });
});

module.exports = router;
