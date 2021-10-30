const asyncHandler = require("express-async-handler");
const moment = require("moment");
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

const getMonthStats = asyncHandler(async (req, res) => {
  const start = moment().startOf("month").toDate();
  const end = moment().endOf("month").toDate();

  const entries = await Entry.find({
    user: req.params.id,
    createdAt: { $gte: start, $lte: end },
  });

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

const getTagsStats = asyncHandler(async (req, res) => {
  const entries = await Entry.find(
    { user: req.params.id },
    { tags: 1, _id: 0 }
  );

  const identries = entries?.map((entry) => entry.tags);

  const arrayTags = [];

  identries.map((iden) => iden.map((idn) => arrayTags.push(idn)));

  const repetidos = {};
  const repetidosData = [];

  arrayTags.forEach(function (numero) {
    repetidos[numero] = (repetidos[numero] || 0) + 1;
  });

  arrayTags.forEach(function (numero) {
    repetidosData.push({ name: numero, value: repetidos[numero] });
  });

  let sinRepetidos = repetidosData.filter(
    (valorActual, indiceActual, arreglo) => {
      return (
        arreglo.findIndex(
          (valorDelArreglo) =>
            JSON.stringify(valorDelArreglo) === JSON.stringify(valorActual)
        ) === indiceActual
      );
    }
  );

  res.json(sinRepetidos);
});

module.exports = { getStats, getTagsStats, getMonthStats };
