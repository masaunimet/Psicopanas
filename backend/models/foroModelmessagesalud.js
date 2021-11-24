const mongoose = require("mongoose");

const foromessagesaludSchema = mongoose.Schema(
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

const Foromessagesalud = mongoose.model("Foromessagesalud",foromessagesaludSchema);

module.exports = Foromessagesalud;