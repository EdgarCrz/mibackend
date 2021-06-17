const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

module.exports = model("Usuario", UsuarioSchema);

// creamos el modelo de la base de datos, basicamente es la forma que va a tener la base
// un usuario con sus propiedades, y son nombre de tipo string y la validacion como "require"
// email: el tipo y sus validaciones, "require" y "unique"
// password: de tipo string y "require"
