const express = require("express");
const { getStats } = require("../controllers/statsControllers");
const { registerUser, authUser } = require("../controllers/userControllers");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/stats/:id").get(getStats);

module.exports = router;
