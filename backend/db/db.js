const mysql = require('mysql2');


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "debarghya",
    database: "codingPlatform"
});

// Connect to the database and handle errors
db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err.message);
        return;
    }
    console.log("Connected to MySQL database!");
});

module.exports = db; // Export the db connection
