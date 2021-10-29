const express = require("express");
const {
  registerUser,
  authUser,
  noSecurityUserProfile,
  securityUserProfile,
  personalStatsUserProfile,
  updateUserProfile,
} = require("../controllers/userControllers");
const { getStats } = require("../controllers/statsControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile/noSecurity").post(noSecurityUserProfile);
router.route("/profile/security").post(securityUserProfile);
router.route("/profile/personalStats").post(personalStatsUserProfile);
router.route("/profile/update").post(protect, updateUserProfile);
router.route("/stats/:id").get(getStats);

module.exports = router;
