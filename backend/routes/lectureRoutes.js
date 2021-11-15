const express = require("express");
const {
  createLecture,
  listPublicatedLectures,
  listNonPublicatedLectures,
  getLectureByID,
  updateLectureByID,
} = require("../controllers/lectureControllers");

const router = express.Router();
router.route("/listPublicatedOnes").get(listPublicatedLectures);
router.route("/listNonPublicatedOnes").get(listNonPublicatedLectures);
router.route("/create").post(createLecture);
router.route("/edit/:id").get(getLectureByID).put(updateLectureByID);
module.exports = router;
