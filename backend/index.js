const express = require("express");
const axios = require("axios");
const cors = require("cors"); // Import the cors package
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

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
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error: "Password must contain at least one uppercase letter, one number, and be at least 8 characters long."
    });
  }


  const sql = "INSERT INTO User (Username, Email, Password) VALUES (?, ?, ?)";
  
  db.query(sql, [name, email, password], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.status(201).json({ message: "User created successfully", userId: result.insertId });
  });
});

app.get("/auth/status", (req, res) => {
  const { userId } = req.cookies; // Assuming you're storing userId in cookies after login

  if (!userId) {
    return res.json({ authenticated: false });
  }

  const sql = "SELECT * FROM User WHERE id = ?";
  db.query(sql, [userId], (err, data) => {
    if (err || data.length === 0) {
      return res.json({ authenticated: false });
    }
    return res.json({ authenticated: true, user: data[0] });
  });
});


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
