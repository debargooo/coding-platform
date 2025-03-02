const express = require("express");
const axios = require("axios");

const router = express.Router();

const allProblemsUrl = "https://alfa-leetcode-api.onrender.com/problems";
const singleProblemUrl = "https://alfa-leetcode-api.onrender.com/select?titleSlug=";

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
router.get("/", async (req, res) => {
  try {
    const problems = await fetchAllProblems();
    res.send(problems);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Route to fetch a single problem dynamically using titleSlug
router.get("/:titleSlug", async (req, res) => {
  const titleSlug = req.params.titleSlug;
  const fetchUrl = `${singleProblemUrl}${titleSlug}`;

  console.log(`Fetching problem from URL: ${fetchUrl}`); // Debugging

  try {
    const response = await axios.get(fetchUrl);
    res.send(response.data); // Send the problem data back to the client
  } catch (error) {
    console.error(`Error fetching problem with titleSlug ${titleSlug}: `, error.message);
    res.status(500).send({ error: "Failed to fetch problem" });
  }
});

module.exports = router;
