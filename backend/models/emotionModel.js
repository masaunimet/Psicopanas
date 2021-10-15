const mongoose = require("mongoose");

const emotionSchema = mongoose.Schema(
    {
        name:{

            type:String,
            require:true,
            unique:true
        },

        value:{

            type:Int32Array,
            require:true,
        },

        icon:{

            type: String,
            require:true
        }
    }
);

const Emotion = mongoose.model("Emotion",emotionSchema);

module.exports = Emotion;