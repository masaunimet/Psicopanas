const asyncHandler = require("express-async-handler");
const Foromessage = require("../models/foroModelmessage");

const getForomessages = asyncHandler(async (req, res) => {
  const foromessages = await Foromessage.find();
  res.json(foromessages);
});

const createForomessages = asyncHandler(async (req, res) => {
  const { username, message, icon } = req.body;
  if (!message || !username) {
    res.status(400);
    throw new Error("Por favor rellena todos los datos");
  } else {
    const foromessage = new Foromessage({
      //user: req.user._id,
      username,
      message,
      icon,
    });

    const createdForomessage = await foromessage.save();
    console.log(createForomessage);
    res.status(201).json(createdForomessage);
  }
});

module.exports = {
  getForomessages,
  createForomessages,
};
