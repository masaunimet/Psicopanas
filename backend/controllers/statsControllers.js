const asyncHandler = require("express-async-handler");
const Emotion = require("../models/emotionModel");
const Entry = require("../models/entryModel");

const getStats = asyncHandler(async (req, res) => {
  const entries = await Entry.find({ user: req.params.id });
  const emotions = await Emotion.find();

  let muyBien = 0;
  let bien = 0;
  let normal = 0;
  let mal = 0;
  let muyMal = 0;

  const idemotions = emotions?.map((emotion) => emotion.icon);
  const identries = entries?.map((entry) => entry.emotion);

  identries?.map((iden) => {
    if (iden === idemotions[0]) muyBien++;
    else if (iden === idemotions[1]) bien++;
    else if (iden === idemotions[2]) normal++;
    else if (iden === idemotions[3]) mal++;
    else if (iden === idemotions[4]) muyMal++;
  });

  const data = [muyBien, bien, normal, mal, muyMal];

  res.json(data);
});

module.exports = { getStats };
