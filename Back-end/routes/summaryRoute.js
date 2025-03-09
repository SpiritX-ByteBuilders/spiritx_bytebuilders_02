const express = require("express");
const { getTournamentSummary } = require("../controller/summaryController"); // Correct the file name
const router = express.Router();

router.get("/", getTournamentSummary); // Get the tournament summary

module.exports = router;
