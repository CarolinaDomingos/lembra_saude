const express = require("express");
const router = express.Router();
require("dotenv").config();

//controllers
const AuthController = require("../controller/AuthController");

router.get("/signin", AuthController.signin);
router.post("/signup", AuthController.signup);

module.exports = router;
