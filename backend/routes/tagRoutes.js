const express = require("express");

const { getTags } = require("../controllers/tagControllers");

//const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();
// Rutas del backend encargadas de alojar los distintos controllers 
router.route("/").get(getTags);

module.exports = router;
