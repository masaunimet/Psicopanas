const mongoose = require("mongoose");

const lectureSchema = mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  publicationDate: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Lecture = mongoose.model("Lecture", lectureSchema);

module.exports = Lecture;
