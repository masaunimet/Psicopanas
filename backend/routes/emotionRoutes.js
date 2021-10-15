const express = require("express");

const { getEmotions } = require("../controllers/emotionControllers");

const {protect} = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(protect,getEmotions);
//router.route("/:id").get(protect,getEmotion);

module.exports = router;