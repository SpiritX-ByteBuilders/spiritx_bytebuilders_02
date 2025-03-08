const express = require('express');
const { createPlayer, getAllPlayers, getPlayerById, updatePlayer, deletePlayer } = require('../controller/playerController');
const router = express.Router();

router.post('/', createPlayer); // Create a new player
router.get('/', getAllPlayers); // Get all players
router.get('/:id', getPlayerById); // Get player by ID
router.put('/:id', updatePlayer); // Update player
router.delete('/:id', deletePlayer); // Delete player

module.exports = router;