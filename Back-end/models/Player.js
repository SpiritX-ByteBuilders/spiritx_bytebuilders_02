const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    playerType: {
        type: String,
        enum: ["Batsman", "Bowler", "All-Rounder"],
        required: true,
    },
    runs: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    playerValue: { type: Number, required: true },
    team: { type: String }, // optional: track which team the player belongs to
});

// Rounding player value to the nearest multiple of 50,000
playerSchema.pre("save", function(next) {
    this.playerValue = Math.round(this.playerValue / 50000) * 50000;
    next();
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;