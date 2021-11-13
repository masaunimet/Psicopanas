const asyncHandler = require("express-async-handler");
const Foromenssage = require("../models/foroModelmenssage");

const getForomenssages = asyncHandler(async (req, res) => {
    const foromenssages = await Foromenssage.find();
    res.json(foromenssages);
  });

  const createForomenssages = asyncHandler(async (req, res) => {
    const { username, menssage, icon } = req.body;
  
    if (!menssage || !username ) {
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
  
      res.status(201).json(createdForomenssage);
    }
  });

module.exports = {
  getForomenssages,
  createForomenssages,
};