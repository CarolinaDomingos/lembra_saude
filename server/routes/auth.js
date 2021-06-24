const express = require("express");
const router = express.Router();
require("dotenv").config();

//controllers
const AuthController = require("../controller/AuthController");

router.post("/signin", AuthController.signin);
router.post("/signup", AuthController.signup);
router.put("/reset_password", AuthController.resetPassword);

module.exports = router;
