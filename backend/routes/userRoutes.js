const express = require("express");
const {
  registerUser,
  authUser,
  noSecurityUserProfile,
  securityUserProfile,
  personalStatsUserProfile,
} = require("../controllers/userControllers");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile/noSecurity").post(noSecurityUserProfile);
router.route("/profile/security").post(securityUserProfile);
router.route("/profile/personalStats").post(personalStatsUserProfile);

module.exports = router;
