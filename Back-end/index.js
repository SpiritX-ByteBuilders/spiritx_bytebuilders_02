const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Import routes
const playerRoute = require("./routes/playerRoute");
const tournamentRoute = require("./routes/tournamentRoute");
const users = require("./routes/userRoute");
const teamRoutes = require("./routes/teamRoute")

dotenv.config();

// Initialize the app
const app = express();

// Middleware
app.use(
    cors({
        origin: "http://localhost:5173", // Replace with your frontend URL
        credentials: true,
    })
);
app.use(express.json()); // to parse JSON bodies

// Connect to the database
connectDB();

// Set up routes
app.use("/api/players", playerRoute);
app.use("/api/users", users);
app.use("/api/team", teamRoutes);
// app.use("/api/tournament-summary", tournamentRoute);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});