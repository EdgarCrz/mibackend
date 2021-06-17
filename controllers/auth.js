const { response } = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
// cremos esta "importacion" para poder usar el tipado, para poder tener acceso a las funciones de las peticiones

const crearUsuario = async (req, res = response) => {
  const { email, name, password } = req.body;

  try {
    // Verificar el email
    const usuario = await Usuario.findOne({ email: email });
    // en el findOne/buscarUno gracias a ecma6 podriamos solo poner "email" una vez ya que ecma dice que si el nombre de una propiedad y una variable en el mismo en el mismo metodo, queda sobre entendido que se le esta asignando el valor o que hablamos de lo mismo
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya existe con ese email",
      });
    }
    // Crear el usuario con el modelo
    const dbUser = new Usuario(req.body);
    // hashear la contraseña/encriptar
    const salt = bcrypt.genSaltSync();
    dbUser.password = bcrypt.hashSync(password, salt);
    // Generar el JWT
    const token = await generarJWT(dbUser.id, name);
    // Crear usuario de DB
    await dbUser.save();
    // aqui guardamos el usuario en "Usuario"
    // Generar respuesta exitosa
    return res.status(201).json({
      ok: true,
      uid: dbUser.id,
      name,
      token,
      // se vuelve usar el ecma para no escribir name: name
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Algo salio mal, hable con el administrador",
    });
  }
};
// Al momento de hacer nuestra peticion en postman, o en nuestra app, mandamos informacion con el metodo post en formato json
// misma informacion, que ya es manipulable en este backend

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const dbUser = await Usuario.findOne({ email: email });
    // recordar que en ecma6 es redundande, pero yo lo dejo para entender bien de donde provienen los valores
    if (!dbUser) {
      return res.status(400).json({
        ok: false,
        msg: "El correo no existe",
      });
    }
    // confirmar si el password hace match

    const validPassword = bcrypt.compareSync(password, dbUser.password);
    // dbUser, esta cargado con las propiedades que estan en Usuario, que es un tipado se encuentra en 'models/Usuarios.js'

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña incorrecta",
      });
    }
    //Si paso aquí podemos generar el JWT
    // Generar el JWT
    const token = await generarJWT(dbUser.id, dbUser.name);
    // respuesta del servicio
    return res.status(200).json({
      ok: true,
      uid: dbUser.id,
      name: dbUser.name,
      token,
      msg: "Bienvenido",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const revalidarUsuario = async (req, res = response) => {
  const { uid, name } = req;
  // Generar el JWT
  const token = await generarJWT(uid, name);
  return res.json({
    ok: true,
    uid,
    name,
    token,
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarUsuario,
};
