const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
/**
 * @desc es para autentificar las cosas que estan pasando
 */
const protect = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("No tiene autorización, token inválido");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("No tiene autorización, no tiene token");
  }
});

module.exports = { protect };
