const asyncHandler = require("express-async-handler");
const Emotion = require("../models/emotionModel");

const getEmotions = asyncHandler(async (req, res) => {
    const emotions = await Emotion.find();
    res.json(emotions);
  });

  module.exports={getEmotions};