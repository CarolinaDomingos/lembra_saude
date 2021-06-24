const express = require("express");
const router = express.Router();
require("dotenv").config();

//controllers
const AuthController = require("../controller/PaymentController");

router.post("/payment", AuthController.payment);

module.exports = router;
