const express = require('express');
const pool = require('../db');
const router = express.Router();

// Get all items
router.get('/', async (req, res) => {
    try {
        const items = await pool.query("SELECT * FROM items");
        res.json(items.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
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

module.exports = router;
