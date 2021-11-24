const express = require("express");
const {
  createLecture,
  listPublicatedLectures,
  listNonPublicatedLectures,
  getLectureByID,
  updateLectureByID,
  getActualLecture,
} = require("../controllers/lectureControllers");

const router = express.Router();
router.route("/listPublicatedOnes").get(listPublicatedLectures);
router.route("/listNonPublicatedOnes").get(listNonPublicatedLectures);
router.route("/create").post(createLecture);
router.route("/edit/:id").get(getLectureByID).put(updateLectureByID);
router.route("/getActualLecture").get(getActualLecture);
module.exports = router;
