const mongoose = require("mongoose");
const User = require("../models/User");
const Player = require("../models/Cricketer");

// Fetch players by category
const getPlayersByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const players = await Player.find({ Category: category }); // Ensure the field name matches your database schema
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Select a player for the user's team
const selectPlayer = async (req, res) => {
  try {
    const { userId, playerId } = req.body;

    // Validate ObjectIds
    if (
      !mongoose.isValidObjectId(userId) ||
      !mongoose.isValidObjectId(playerId)
    ) {
      return res.status(400).json({ error: "Invalid user or player ID" });
    }

    const user = await User.findById(userId).populate("selectedTeam");
    if (!user) return res.status(404).json({ error: "User not found" });

    // Check if player is already in the team
    if (
      user.selectedTeam.some((player) => player._id.toString() === playerId)
    ) {
      return res.status(400).json({ error: "Player already in team" });
    }

    // Check if team has 11 players already
    if (user.selectedTeam.length >= 11) {
      return res
        .status(400)
        .json({ error: "Cannot select more than 11 players" });
    }

    const player = await Player.findById(playerId);
    if (!player) return res.status(404).json({ error: "Player not found" });

    // Check budget
    const totalSpent = user.selectedTeam.reduce(
      (sum, p) => sum + (p.playerValue || 0),
      0
    );
    if (totalSpent + (player.playerValue || 0) > user.budget) {
      return res.status(400).json({ error: "Not enough budget" });
    }

    // Add player to team
    user.selectedTeam.push(player); // Push the full player object, not just the playerId
    await user.save();

    res.json({ message: "Player added successfully", team: user.selectedTeam });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Server error" });
  }
};

// Remove a player from the team
const removePlayer = async (req, res) => {
  try {
    const { userId, playerId } = req.body;

    // Validate ObjectIds
    if (
      !mongoose.isValidObjectId(userId) ||
      !mongoose.isValidObjectId(playerId)
    ) {
      return res.status(400).json({ error: "Invalid user or player ID" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Remove player from selectedTeam array
    user.selectedTeam = user.selectedTeam.filter(
      (id) => id.toString() !== playerId
    );
    await user.save();

    res.json({
      message: "Player removed successfully",
      team: user.selectedTeam,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get user's selected team
const getUserTeam = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate ObjectId
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await User.findById(userId).populate("selectedTeam");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user.selectedTeam);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getPlayersByCategory,
  selectPlayer,
  removePlayer,
  getUserTeam,
};
