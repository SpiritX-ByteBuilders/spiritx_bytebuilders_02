const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Import routes
const playerRoutes = require('./route/playerRoutes');
const tournamentRoutes = require('./route/tournamentRoutes');

dotenv.config();

// Initialize the app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // to parse JSON bodies

// Connect to the database
connectDB();

// Set up routes
app.use('/api/players', playerRoutes);
app.use('/api/tournament-summary', tournamentRoutes);

// Root route (optional)
app.get('/', (req, res) => {
    res.send('Welcome to the Spirit11 Backend!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});