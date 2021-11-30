const mongoose = require("mongoose");

/**
 * @desc Es el modelo o esquema que usara la base de datos de mensajes del foro vivencias
 *  para guardar su informacion
 */
const foromessagevivenciaSchema = mongoose.Schema(
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
 * @desc Transforma el modelo foromessagevivenciaSchema en un modelo mongoose de la base de datos mongoDB
 */
const Foromessagevivencia = mongoose.model(
  "Foromessagevivencias",
  foromessagevivenciaSchema
);

module.exports = Foromessagevivencia;
