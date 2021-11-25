const mongoose = require("mongoose");

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

const Foromessagevivencia = mongoose.model(
  "Foromessagevivencias",
  foromessagevivenciaSchema
);

module.exports = Foromessagevivencia;
