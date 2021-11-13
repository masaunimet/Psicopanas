const mongoose = require("mongoose");

const foromenssageSchema = mongoose.Schema(
    {

        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },

        username:{

            type:String,
            require:true,
        },

        menssage:{

            type:String,
            require:true,
        },

        icon:{

            type: String,
            require:true
        }
    }
);

const Foromenssage = mongoose.model("Foromenssage",foromenssageSchema);

module.exports = Foromenssage;