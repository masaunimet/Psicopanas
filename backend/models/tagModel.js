const mongoose = require("mongoose");

/**
 * @desc Es el modelo o esquema que usara la base de datos de etiquetas
 *  para guardar su informacion
 */
const tagSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  group: {
    type: String,
  },
});

/**
 * @desc Transforma el modelo tagSchema en un modelo mongoose de la base de datos mongoDB
 */
const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;
