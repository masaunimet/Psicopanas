// const moment = require("moment");

const asyncHandler = require("express-async-handler");
const Entry = require("../models/entryModel");

const getEntrys = asyncHandler(async (req, res) => {
  const entries = await Entry.find({ user: req.user._id });
  res.json(entries);
});

// const lastEntry = asyncHandler(async (req, res) => {
//   const start = moment().startOf("day").toDate(); // set to 12:00 am today
//   const end = moment().endOf("day").toDate(); // set to 23:59 pm today
//   const entry = await Entry.findOne({
//     user: req.params.id,
//     createdAt: { $gte: start, $lte: end },
//   });
//   res.json(entry);
// });

const createEntry = asyncHandler(async (req, res) => {
  const { title, content, tags, emotion } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error("Por favor rellena todos los datos");
  } else {
    const entry = new Entry({
      user: req.user._id,
      title,
      content,
      tags,
      emotion,
    });

    const createdEntry = await entry.save();

    res.status(201).json(createdEntry);
  }
});

const updateEntry = asyncHandler(async (req, res) => {
  const { title, content, tags, emotion } = req.body;

  const entry = await Entry.findById(req.params.id);

  if (entry.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("No puedes llevar a cabo esta acción");
  }

  if (entry) {
    entry.title = title;
    entry.content = content;
    entry.tags = tags;
    entry.emotion = emotion;

    const updatedEntry = await entry.save();
    res.json(updatedEntry);
  } else {
    res.status(404);
    throw new Error("Entrada no encontrada");
  }
});

const getEntryById = asyncHandler(async (req, res) => {
  const entry = await Entry.findById(req.params.id);

  if (entry) {
    res.json(entry);
  } else {
    res.status(404).json({ message: "Entrada no encontrada" });
  }

  res.json(entry);
});

module.exports = {
  getEntrys,
  createEntry,
  getEntryById,
  updateEntry,
  // lastEntry,
};
