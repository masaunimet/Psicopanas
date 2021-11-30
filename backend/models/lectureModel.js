const mongoose = require("mongoose");

/**
 * @desc Es el modelo o esquema que usara la base de datos de lecturas
 *  para guardar su informacion
 */
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
  image: {
    type: String,
    required: true,
  },
  publicationDate: {
    type: Date,
    required: true,
  },
});

/**
 * @desc Transforma el modelo lectureSchema en un modelo mongoose de la base de datos mongoDB
 */
const Lecture = mongoose.model("Lecture", lectureSchema);

module.exports = Lecture;
