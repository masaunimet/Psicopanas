const asyncHandler = require("express-async-handler");
const Foromessagehobbie = require("../models/foroModelmessagehobbie");

const getForomessageshobbies = asyncHandler(async (req, res) => {
  const foromessagehobbie = await Foromessagehobbie.find();
  res.json(foromessagehobbie);
});

  const createForomessageshobbies = asyncHandler(async (req, res) => {
    const { username, message, icon } = req.body;
  
    if (!message || !username ) {
      res.status(400);
      throw new Error("Por favor rellena todos los datos");
    } else {
      const foromessagehobbie = new Foromessagehobbie({
        //user: req.user._id,
        username,
        message,
        icon,
      });
  
      const createdForomessagehobbie = await foromessagehobbie.save();
  
      res.status(201).json(createdForomessagehobbie);
    }
  });

module.exports = {
  getForomessageshobbies,
  createForomessageshobbies,
};
