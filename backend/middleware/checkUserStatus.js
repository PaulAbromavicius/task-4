const jwt = require('jsonwebtoken');
const db = require('../config/db');

const checkUserStatus = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) return res.status(403).json({ message: "Forbidden" });

        const userId = decoded.id;
        db.query('SELECT status FROM users WHERE id = ?', [userId], (error, results) => {
            if (error || results.length === 0) {
                return res.status(404).json({ message: "User not found" });
            }

            const user = results[0];
            if (user.status === 'blocked') {
                return res.status(403).json({ message: "User is blocked" });
            }

            next();
        });
    });
};

module.exports = checkUserStatus;
