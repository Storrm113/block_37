const express = require('express');
const pool = require('../db');
const router = express.Router();

// Get all reviews for an item
router.get('/', async (req, res) => {
    try {
        const reviews = await pool.query("SELECT * FROM reviews WHERE item_id = $1", [req.params.itemId]);
        res.json(reviews.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Submit a review
router.post('/', async (req, res) => {
    const { userId, rating, text } = req.body;
    try {
        const review = await pool.query(
            "INSERT INTO reviews (user_id, item_id, rating, text) VALUES ($1, $2, $3, $4) RETURNING *",
            [userId, req.params.itemId, rating, text]
        );
        res.json(review.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
