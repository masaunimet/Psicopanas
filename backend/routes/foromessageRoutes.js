const express = require("express");
const { getForomessages, createForomessages } = require("../controllers/foromessageControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();
// Rutas del backend encargadas de alojar los distintos controllers 
router.route("/").get(getForomessages);
router.route("/create").post(protect, createForomessages);

module.exports = router;