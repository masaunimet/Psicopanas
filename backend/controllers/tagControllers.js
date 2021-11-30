const asyncHandler = require("express-async-handler");
const Tag = require("../models/tagModel");

/**
 * @desc Busca la lista de etiquetas del backend y la devuelve en un JSON
 */
const getTags = asyncHandler(async (req, res) => {
  const tags = await Tag.find();
  res.json(tags);
});

module.exports = { getTags };
