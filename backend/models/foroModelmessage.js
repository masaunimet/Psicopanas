const mongoose = require("mongoose");

/**
 * @desc Es el modelo o esquema que usara la base de datos de mensajes del foro general
 *  para guardar su informacion
 */
const foromessageSchema = mongoose.Schema(
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
 * @desc Transforma el modelo foromessageSchema en un modelo mongoose de la base de datos mongoDB
 */
const Foromessage = mongoose.model("Foromessage", foromessageSchema);

module.exports = Foromessage;
