const express = require('express');
const pool = require('../db');
const router = express.Router();

// Get all items
router.get('/:itemId', async (req, res) => {
    try {
        console.log("Fetching item with ID:", req.params.itemId);
        const item = await pool.query("SELECT * FROM items WHERE id = $1", [req.params.itemId]);

        if (item.rows.length === 0) {
            console.log("Item not found");
            return res.status(404).json({ error: "Item not found" });
        }

        res.json(item.rows[0]);
    } catch (err) {
        console.error("Database query error:", err);
        res.status(500).json({ error: "Server error" });
    }
});


// Get a specific item by ID
router.get('/:itemId', async (req, res) => {
    try {
        const item = await pool.query("SELECT * FROM items WHERE id = $1", [req.params.itemId]);
        if (item.rows.length === 0) return res.status(404).json({ error: "Item not found" });
        res.json(item.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, description } = req.body;
        const item = await pool.query(
            "INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *",
            [name, description]
        );
        res.status(201).json(item.rows[0]); // Ensure ID is returned
    } catch (err) {
        console.error("Error creating item:", err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
