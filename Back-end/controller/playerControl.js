// playerController.js
const Player = require('../models/player'); // Assuming the Player model is in the models folder

// Create a new player
const createPlayer = async(req, res) => {
    try {
        // Extract data from the request body
        const { name, playerType, playerValue, team } = req.body;

        // Create a new player instance
        const newPlayer = new Player({
            name,
            playerType,
            playerValue,
            team,
        });

        // Save the player to the database
        const savedPlayer = await newPlayer.save();

        // Respond with the created player
        res.status(201).json(savedPlayer);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: "Failed to create player" });
    }
};

module.exports = {
    createPlayer,
};