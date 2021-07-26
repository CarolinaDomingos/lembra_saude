const express = require("express");
const router = express.Router();
require("dotenv").config();

//controllers
const AuthController = require("../controller/PaymentController");

router.post("/pay", AuthController.payment);
router.get("/payment/:id", AuthController.getPayment);

module.exports = router;
