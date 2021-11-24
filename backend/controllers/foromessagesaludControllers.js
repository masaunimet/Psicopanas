const asyncHandler = require("express-async-handler");
const Foromessagesalud = require("../models/foroModelmessagesalud");

const getForomessagessalud = asyncHandler(async (req, res) => {
  const foromessagesalud = await Foromessagesalud.find();
  res.json(foromessagesalud);
});

  const createForomessagessalud = asyncHandler(async (req, res) => {
    const { username, message, icon } = req.body;
  
    if (!message || !username ) {
      res.status(400);
      throw new Error("Por favor rellena todos los datos");
    } else {
      const foromessagesalud = new Foromessagesalud({
        //user: req.user._id,
        username,
        message,
        icon,
      });
  
      const createdForomessagesalud = await foromessagesalud.save();
  
      res.status(201).json(createdForomessagesalud);
    }
  });

module.exports = {
  getForomessagessalud,
  createForomessagessalud,
};
