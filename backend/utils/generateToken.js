const jwt = require("jsonwebtoken");

/**
 * @desc Genera un token a cada usuario para darle mas seguridad a su cuenta
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
