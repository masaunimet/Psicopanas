const express = require("express");
const { createLecture } = require("../controllers/lectureControllers");

const router = express.Router();
router.route("/").get();
router.route("/create").post(createLecture);
module.exports = router;
