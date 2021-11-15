const mongoose = require("mongoose");

const foromessageSchema = mongoose.Schema(
    {

        // user: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     required: true,
        //     ref: "User",
        // },

        username:{

            type:String,
            require:true,
        },

        message:{

            type:String,
            require:true,
        },

        icon:{

            type: String,
            require:true
        }
    }
);

const Foromessage = mongoose.model("Foromessage",foromessageSchema);

module.exports = Foromessage;