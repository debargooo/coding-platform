const express = require("express");
const db = require("../db/db");

const router = express.Router();

// Fetch all users
router.get("/", (req, res) => {
  const sql = "SELECT * FROM User";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("MySQL Query Error:", err.message);
      return res.status(500).json({ error: "Failed to fetch users" });
    }
    return res.json(data);
  });
});

module.exports = router;
