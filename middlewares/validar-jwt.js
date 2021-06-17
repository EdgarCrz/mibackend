const { response } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "Error en el token",
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
    // el resultado de "jwt.verify(token, process.env.SECRET_JWT_SEED)" va a ser un objeto que contiene el payload, del cual voy a desestructurar para obtener el uid y el name
    req.uid = uid;
    req.name = name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no valido",
    });
  }
  // TODO OK! sigue adelante
  next();
};

module.exports = { validarJWT };
