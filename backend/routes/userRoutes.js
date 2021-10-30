const express = require("express");
const {
  registerUser,
  authUser,
  noSecurityUserProfile,
  securityUserProfile,
  personalStatsUserProfile,
  updateUserProfile,
  getAllUsers,
  changeUserStatus,
} = require("../controllers/userControllers");
const { getStats, getTagsStats } = require("../controllers/statsControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile/noSecurity").post(noSecurityUserProfile);
router.route("/profile/security").post(securityUserProfile);
router.route("/profile/personalStats").post(personalStatsUserProfile);
router.route("/profile/update").post(protect, updateUserProfile);
router.route("/changeUserStatus/:id").post(changeUserStatus);
router.route("/stats/:id").get(getStats);
router.route("/tagstats/:id").get(getTagsStats);
router.route("/getAllUsers").get(getAllUsers);

module.exports = router;
