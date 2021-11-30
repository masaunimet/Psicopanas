const mongoose = require("mongoose");

/**
 * @desc Es el modelo o esquema que usara la base de datos de mensajes del foro salud
 *  para guardar su informacion
 */
const foromessagesaludSchema = mongoose.Schema(
  {
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "User",
    // },

    username: {
      type: String,
      require: true,
    },

    message: {
      type: String,
      require: true,
    },

    icon: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

/**
 * @desc Transforma el modelo foromessagesaludSchema en un modelo mongoose de la base de datos mongoDB
 */
const Foromessagesalud = mongoose.model(
  "Foromessagesalud",
  foromessagesaludSchema
);

module.exports = Foromessagesalud;
