// filepath: c:\Users\muham\Desktop\spiritx_bytebuilders_02\Back-end\routes\adminRoute.js
const express = require("express");
const { adminRegister, adminLogin } = require("../controller/adminController");
const router = express.Router();

router.post("/register", adminRegister);
router.post("/login", adminLogin);

module.exports = router;
