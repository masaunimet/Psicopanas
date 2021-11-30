const asyncHandler = require("express-async-handler");
const Emotion = require("../models/emotionModel");

/**
 * @desc Busca la lista de emociones del backend y la devuelve en un JSON
 */
const getEmotions = asyncHandler(async (req, res) => {
    const emotions = await Emotion.find();
    res.json(emotions);
  });

  module.exports={getEmotions};