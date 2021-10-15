const express = require("express");

const { getTags } = require("../controllers/tagControllers");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(getTags);

module.exports = router;
