const asyncHandler = require("express-async-handler");
const Foromessage = require("../models/foroModelmessage");

const getForomessages = asyncHandler(async (req, res) => {
    const foromessages = await Foromessage.find();
    res.json(foromessages);
  });

  const createForomessages = asyncHandler(async (req, res) => {
    const { username, message, icon } = req.body;
  
    if (!message || !username ) {
      res.status(400);
      throw new Error("Por favor rellena todos los datos");
    } else {
      const entry = new Entry({
        user: req.user._id,
        username,
        menssage,
        icon,
      });
  
      const createdForomenssage = await entry.save();
  
      res.status(201).json(createdForomessage);
    }
  });

module.exports = {
  getForomessages,
  createForomessages,
};