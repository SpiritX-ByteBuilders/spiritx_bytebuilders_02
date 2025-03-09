const mongoose = require("mongoose");

const cricketerSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    University: { type: String, required: true },
    Category: {
      type: String,
      enum: ["Batsman", "Bowler", "All-Rounder"],
      required: true,
    },
    "Total Runs": { type: Number, default: 0 },
    "Balls Faced": { type: Number, default: 0 },
    "Innings Played": { type: Number, default: 0 },
    Wickets: { type: Number, default: 0 },
    "Overs Bowled": { type: Number, default: 0 },
    "Runs Conceded": { type: Number, default: 0 },
  },
  { collection: "cricketers" }
);

const Cricketer = mongoose.model("Cricketer", cricketerSchema);
module.exports = Cricketer;
