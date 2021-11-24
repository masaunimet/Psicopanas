const express = require("express");
const { getForomessageshobbies, createForomessageshobbies } = require("../controllers/foromessagehobbieControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(getForomessageshobbies);
router.route("/create").post(protect, createForomessageshobbies);

module.exports = router;