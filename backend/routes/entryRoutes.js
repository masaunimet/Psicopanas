const express = require("express");
const {
  getEntrys,
  createEntry,
  getEntryById,
  updateEntry,
  lastEntry,
} = require("../controllers/entryControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getEntrys);
router.route("/:id").get(getEntryById).put(protect, updateEntry);
router.route("/create").post(protect, createEntry);
router.route("/lastEntry/:id").get(lastEntry);
module.exports = router;
