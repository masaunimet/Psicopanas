const mongoose = require("mongoose");

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
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Tag",
    },
  },
  {
    timestamps: true,
  }
);

const Entry = mongoose.model("Entry", entrySchema);

module.exports = Entry;
