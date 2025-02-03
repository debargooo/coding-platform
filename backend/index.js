const express = require("express");
const axios = require("axios");
const cors = require("cors"); // Import the cors package
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();


const app = express();
const PORT = 8080;
const db = require("./db/db"); // Import the MySQL database connection
const allProblemsUrl = "https://alfa-leetcode-api.onrender.com/problems";
const singleProblemUrl =
  "https://alfa-leetcode-api.onrender.com/select?titleSlug=";





// Enable CORS for all routes
app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true
}));

app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello world");
});

// Function to fetch all problems
const fetchAllProblems = async () => {
  try {
    const response = await axios.get(allProblemsUrl);
    return response.data.problemsetQuestionList;
  } catch (error) {
    throw new Error("Failed to fetch problems");
  }
};

// Route to fetch all problems
app.get("/problems", async (req, res) => {
  try {
    const problems = await fetchAllProblems();
    res.send(problems);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Route to fetch a single problem dynamically using titleSlug
app.get("/problems/:titleSlug", async (req, res) => {
  const titleSlug = req.params.titleSlug;
  const fetchUrl = `${singleProblemUrl}${titleSlug}`;

  console.log(`Fetching problem from URL: ${fetchUrl}`); // Debugging line

  try {
    const response = await axios.get(fetchUrl);
    res.send(response.data); // Send the problem data back to the client
  } catch (error) {
    console.error(
      `Error fetching problem with titleSlug ${titleSlug}: `,
      error.message
    ); // Error log
    res.status(500).send({ error: "Failed to fetch problem" });
  }
});


app.get("/users", (req, res) => {
  const sql = "SELECT * FROM User";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("MySQL Query Error:", err.message);
      return res.status(500).json({ error: "Failed to fetch users" });
    }
    return res.json(data);
  });
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Check if any field is missing
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Validate email format
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: "Please provide a valid email."
    });
  }

  // Validate password format
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error: "Password must contain at least one uppercase letter, one number, and be at least 8 characters long."
    });
  }

  // Check if the email already exists in the database
  const emailCheckQuery = "SELECT * FROM User WHERE Email = ?";
  db.query(emailCheckQuery, [email], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (result.length > 0) {
      return res.status(400).json({ error: "Email is already registered." });
    }

    // Check if the username already exists in the database
    const usernameCheckQuery = "SELECT * FROM User WHERE Username = ?";
    db.query(usernameCheckQuery, [name], (err, result) => {
      if (err) return res.status(500).json({ error: "Database error" });

      if (result.length > 0) {
        return res.status(400).json({ error: "Username is already taken." });
      }

      // If email and username are available, insert the user (without hashing the password)
      const sql = "INSERT INTO User (Username, Email, Password) VALUES (?, ?, ?)";
      db.query(sql, [name, email, password], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: "User created successfully", userId: result.insertId });
      });
    });
  });
});

app.post("/login", (req, res) => {
  const {name, email, password } = req.body;
  const jwtSecretKey = process.env.JWT_SECRET_KEY;

  // Check if email is provided
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  // Query to check if the email exists
  const query = "SELECT * FROM User WHERE Email = ?";
  db.query(query, [email], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
  
    if (result.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
  
    const user = result[0];
  
    // Log the user object to see the structure
    console.log(user); // Check the structure of the user object
  
    if (password !== user.Password) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
  
    // Create a JWT token (using user id and a secret key)
    const token = jwt.sign({ userId: user.UserId }, jwtSecretKey, { expiresIn: '1h' });
  
    // Set the JWT token as a cookie
    res.cookie('authToken', token, {
      httpOnly: true, // Prevents access to cookie via JavaScript
      secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
      maxAge: 3600000, // 1 hour
    });
  
    // Send the response with the token and username
    return res.json({
      token,
      username: user.Username,  // Make sure 'username' exists in the user object
    });
  });  
});




app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
