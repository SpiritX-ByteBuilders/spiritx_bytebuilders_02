const express = require("express");
const { getAllPlayers, getPlayerById } = require("../controller/playerControl");
const router = express.Router();

router.get("/", getAllPlayers); // Create a new player
// router.get("/", getAllPlayers); // Get all players
router.get("/:id", getPlayerById); // Get player by ID
// router.put("/:id", updatePlayer); // Update player
// router.delete("/:id", deletePlayer); // Delete player

module.exports = router;