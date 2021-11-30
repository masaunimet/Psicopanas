const express = require("express");
const {
  getEntrys,
  createEntry,
  getEntryById,
  updateEntry,
} = require("../controllers/entryControllers");
const { getStats, getTagsStats } = require("../controllers/statsControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();
// Rutas del backend encargadas de alojar los distintos controllers 
router.route("/").get(protect, getEntrys);
router.route("/:id").get(getEntryById).put(protect, updateEntry);
router.route("/create").post(protect, createEntry);
// router.route("/lastEntry/:id").get(lastEntry);
router.route("/stats/:id").get(getStats);
router.route("/tagStats/:id").get(getTagsStats);
module.exports = router;
