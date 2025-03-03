const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');
require('dotenv').config();

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Ensure all fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Check for duplicate email
        const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: "Email already in use." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user
        const newUser = await pool.query(
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email",
            [username, email, hashedPassword]
        );

        res.status(201).json(newUser.rows[0]);
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({ error: "Server error" });
    }
});


// Login User
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: "Email already in use." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query(
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email",
            [username, email, hashedPassword]
        );

        console.log("User registered:", newUser.rows[0]); // Debugging
        res.status(201).json(newUser.rows[0]); // Ensure ID is returned
    } catch (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ error: "Server error" });
    }
});



module.exports = router;
