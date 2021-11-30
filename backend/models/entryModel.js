const mongoose = require("mongoose");

/**
 * @desc Es el modelo o esquema que usara la base de datos de entradas del diario
 *  para guardar su informacion
 */
const entrySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    tags: {
      type: [String],
      required: true,
      ref: "Tag",
    },
    emotion: {
      type: String,
      require: true,
      ref: "Emotion",
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @desc Transforma el modelo entrySchema en un modelo mongoose de la base de datos mongoDB
 */
const Entry = mongoose.model("Entry", entrySchema);

module.exports = Entry;
