const asyncHandler = require("express-async-handler");
const Foromessage = require("../models/foroModelmessage");

/**
 * @desc Busca la lista de mensajes del foro general del backend y la devuelve en un JSON
 */
const getForomessages = asyncHandler(async (req, res) => {
  const foromessages = await Foromessage.find();
  res.json(foromessages);
});

/**
 * @desc Comprueba si con los datos suministrado pueden crear un mensaje del foro general para 
 * luego devolverlo como un JSON si pudo ser creada
 */
const createForomessages = asyncHandler(async (req, res) => {
    const { username, message, icon } = req.body;
  
    if (!message || !username ) {
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
  
      res.status(201).json(createdForomessage);
    }
  });

module.exports = {
  getForomessages,
  createForomessages,
};
