const express = require("express");
const { getForomessagesvivencias, createForomessagesvivencias } = require("../controllers/foromessagevivenciasControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(getForomessagesvivencias);
router.route("/create").post(protect, createForomessagesvivencias);

module.exports = router;