const express = require("express");
const { getForomessagessalud, createForomessagessalud } = require("../controllers/foromessagesaludControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(getForomessagessalud);
router.route("/create").post(protect, createForomessagessalud);

module.exports = router;