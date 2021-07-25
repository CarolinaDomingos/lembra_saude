const express = require("express");
const router = express.Router();
require("dotenv").config();
//middleware
const { checkAuth } = require("../middleware/auth");
//controllers
const AgendaController = require("../controller/AgendaController");

router.get("/", checkAuth, AgendaController.getUserAgenda);
router.post("/create", checkAuth, AgendaController.createUserAgenda);
router.put("/update/", checkAuth, AgendaController.update);
router.put(
  "/updatebyprofessional/",
  checkAuth,
  AgendaController.updateByProfessional
);
router.get("/professionals/consults/", checkAuth, AgendaController.getConsults);

module.exports = router;
