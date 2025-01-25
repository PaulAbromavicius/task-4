const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const checkUserStatus = require('./middleware/checkUserStatus');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Public routes
app.use('/auth', authRoutes);

// Protected routes
app.use('/users', checkUserStatus, userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
