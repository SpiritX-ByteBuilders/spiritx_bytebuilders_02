const express = require("express");
const router = express.Router();
const teamController = require("../controller/teamController");

router.get("/players/:category", teamController.getPlayersByCategory);
router.post("/select", teamController.selectPlayer);
router.post("/remove", teamController.removePlayer);
router.get("/:userId", teamController.getUserTeam);

module.exports = router;
