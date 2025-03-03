const express = require('express');
const pool = require('../db');
const router = express.Router();

// Get all reviews for an item
router.get('/:itemId', async (req, res) => {
    try {
        const item = await pool.query("SELECT * FROM items WHERE id = $1", [req.params.itemId]);

        if (item.rows.length === 0) {
            return res.status(404).json({ error: "Item not found" });
        }

        res.json(item.rows[0]);
    } catch (err) {
        console.error("Error fetching item:", err);
        res.status(500).json({ error: "Server error" });
    }
});


// Submit a review
router.post('/', async (req, res) => {
    const { userId, rating, text } = req.body;
    try {
        console.log("Submitting review for item:", req.params.itemId);
        const review = await pool.query(
            "INSERT INTO reviews (user_id, item_id, rating, text) VALUES ($1, $2, $3, $4) RETURNING *",
            [userId, req.params.itemId, rating, text]
        );

        res.status(201).json(review.rows[0]);
    } catch (err) {
        console.error("Error submitting review:", err);
        res.status(500).json({ error: "Server error" });
    }
});



module.exports = router;
