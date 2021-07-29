const express = require("express");
const router = express.Router();
require("dotenv").config();
//middleware
const { checkAuth } = require("../middleware/auth");
const FoodPlanController = require("../controller/FoodPlanController");

router.get("/", checkAuth, FoodPlanController.getPlan);
router.post("/add", checkAuth, FoodPlanController.addPlan);
router.put("/delete", checkAuth, FoodPlanController.deleteCardFromPlan);

module.exports = router;
