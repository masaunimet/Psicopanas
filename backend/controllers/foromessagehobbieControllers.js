const asyncHandler = require("express-async-handler");
const Foromessagehobbie = require("../models/foroModelmessagehobbie");

/**
 * @desc Busca la lista de mensajes del foro hobbie del backend y la devuelve en un JSON
 */
const getForomessageshobbies = asyncHandler(async (req, res) => {
  const foromessagehobbie = await Foromessagehobbie.find();
  res.json(foromessagehobbie);
});

/**
 * @desc Comprueba si con los datos suministrado pueden crear un mensaje del foro hobbie para 
 * luego devolverlo como un JSON si pudo ser creada
 */
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
