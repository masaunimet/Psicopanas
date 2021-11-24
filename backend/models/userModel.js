const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isPremium: {
      type: Boolean,
      required: true,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    personalTags: {
      type: [String],
      required: true,
      default: [],
    },
    diarySecurity: {
      type: Boolean,
      required: true,
      default: false,
    },
    diaryPassword: {
      type: String,
      required: true,
      default: "1234",
    },
    profilePicture: {
      type: String,
      required: true,
      default:
        "https://res.cloudinary.com/psicopanas/image/upload/v1637791867/Anonimo_h4g8dj.png",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
