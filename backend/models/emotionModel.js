const mongoose = require("mongoose");

/**
 * @desc Es el modelo o esquema que usara la base de datos de emociones
 *  para guardar su informacion
 */
const emotionSchema = mongoose.Schema(
    {
        name:{

            type:String,
            require:true,
            unique:true
        },

        value:{

            type:Number,
            require:true,
        },

        icon:{

            type: String,
            require:true
        }
    }
);

/**
 * @desc Transforma el modelo emotionSchema en un modelo mongoose de la base de datos mongoDB
 */
const Emotion = mongoose.model("Emotion",emotionSchema);

module.exports = Emotion;