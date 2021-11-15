const express = require("express");

const { getForomessages, createForomessages } = require("../controllers/foromessageControllers");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(getForomessages);
//router.route("/:id").get(protect,getEmotion);

module.exports = router;