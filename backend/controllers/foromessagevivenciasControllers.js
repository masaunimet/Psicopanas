const asyncHandler = require("express-async-handler");
const Foromessagevivencia = require("../models/foroModelmessagevivencias");

/**
 * @desc Busca la lista de mensajes del foro vivencias del backend y la devuelve en un JSON
 */
const getForomessagesvivencias = asyncHandler(async (req, res) => {
  const foromessagevivencia = await Foromessagevivencia.find();
  res.json(foromessagevivencia);
});

/**
 * @desc Comprueba si con los datos suministrado pueden crear un mensaje del foro vivencias para 
 * luego devolverlo como un JSON si pudo ser creada
 */
  const createForomessagesvivencias = asyncHandler(async (req, res) => {
    const { username, message, icon } = req.body;
  
    if (!message || !username ) {
      res.status(400);
      throw new Error("Por favor rellena todos los datos");
    } else {
      const foromessagevivencia = new Foromessagevivencia({
        //user: req.user._id,
        username,
        message,
        icon,
      });
  
      const createdForomessagevivencia = await foromessagevivencia.save();
  
      res.status(201).json(createdForomessagevivencia);
    }
  });

module.exports = {
  getForomessagesvivencias,
  createForomessagesvivencias,
};
