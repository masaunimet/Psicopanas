const express = require("express");

const { getEmotions } = require("../controllers/emotionControllers");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();
// Rutas del backend encargadas de alojar los distintos controllers 
router.route("/").get(getEmotions);
//router.route("/:id").get(protect,getEmotion);

module.exports = router;
