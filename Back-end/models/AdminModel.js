// filepath: c:\Users\muham\Desktop\spiritx_bytebuilders_02\Back-end\models\adminModel.js
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
