const asyncHandler = require("express-async-handler");
const Tag = require("../models/tagModel");

//Obtener todas las etiquetas
const getTags = asyncHandler(async (req, res) => {
  const tags = await Tag.find();
  res.json(tags);
});

module.exports = { getTags };
