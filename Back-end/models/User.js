const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    selectedTeam: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cricketer",
    }, ],
    budget: { type: Number, default: 9000000 }, // Example budget
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);