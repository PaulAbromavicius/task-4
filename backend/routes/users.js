const express = require('express');
const db = require('../config/db');

const router = express.Router();

// Get all users, sorted by last_login (most recent first)
router.get('/', (req, res) => {
    db.query(
        'SELECT id, name, email, status, last_login, created_at FROM users ORDER BY last_login DESC',
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Error fetching users", error: err });
            }
            res.json(results);
        }
    );
});

// Update last_login when the user logs in
router.post('/login', (req, res) => {
    const { userId } = req.body; // Assuming you get the user's ID after authentication
    
    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    db.query(
        'UPDATE users SET last_login = NOW() WHERE id = ?',
        [userId],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Error updating last login", error: err });
            }
            res.json({ success: true, message: "Last login updated successfully" });
        }
    );
});

// Block users
router.post('/block', (req, res) => {
    const { userIds } = req.body;

    if (!userIds || !Array.isArray(userIds)) {
        return res.status(400).json({ message: "Invalid user IDs" });
    }

    const placeholders = userIds.map(() => '?').join(',');
    const query = `UPDATE users SET status = 'blocked' WHERE id IN (${placeholders})`;

    db.query(query, userIds, (err, results) => {
        if (err) {
            console.error("Error blocking users:", err);
            return res.status(500).json({ message: "Failed to block users" });
        }
        res.json({ success: true, message: `${results.affectedRows} user(s) blocked` });
    });
});

// Delete users
router.post('/delete', (req, res) => {
    const { userIds } = req.body;

    if (!userIds || !Array.isArray(userIds)) {
        return res.status(400).json({ message: "Invalid user IDs" });
    }

    const placeholders = userIds.map(() => '?').join(',');
    const query = `DELETE FROM users WHERE id IN (${placeholders})`;

    db.query(query, userIds, (err, results) => {
        if (err) {
            console.error("Error deleting users:", err);
            return res.status(500).json({ message: "Failed to delete users" });
        }
        res.json({ success: true, message: `${results.affectedRows} user(s) deleted` });
    });
});

module.exports = router;
