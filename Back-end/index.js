const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Import routes
const playerRoute = require("./routes/playerRoute");
const tournamentRoute = require("./routes/summaryRoute"); // Ensure this is correctly imported
const users = require("./routes/userRoute");

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
app.use("/api/tournament-summary", tournamentRoute); // Ensure this is correctly mounted

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
