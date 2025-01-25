const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const router = express.Router();

// User registration
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
        [name, email, hashedPassword], 
        (err, result) => {
            if (err) return res.status(500).json({ message: "Error creating user", error: err });
            res.status(201).json({ message: "User registered successfully" });
        }
    );
});
usermanagementdb
// User login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err || results.length === 0) return res.status(404).json({ message: "User not found" });

        const user = results[0];
        if (user.status === 'blocked') return res.status(403).json({ message: "User is blocked" });

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) return res.status(401).json({ message: "Invalid credentials" });

       
        db.query('UPDATE users SET last_login = NOW() WHERE id = ?', [user.id], (updateErr) => {
            if (updateErr) {
                console.error("Error updating last login:", updateErr);
                return res.status(500).json({ message: "Failed to update last login" });
            }

            const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });
            res.status(200).json({ token, user });
        });
    });
});

module.exports = router;
