const express = require("express");

const { getForomenssages, createForomenssages } = require("../controllers/foromenssageControllers");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(getForomenssages);
//router.route("/:id").get(protect,getEmotion);

module.exports = router;