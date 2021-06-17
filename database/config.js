const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    //   try: es el flujo correcto de esta funcion, "si no ha pasado ningun error estamos en esta parte"
    await mongoose.connect(process.env.BD_CNN, {
      // connect: es una promesa
      //conect necesita de la cadena de conexion
      // await/esperar/aguantame las carnitas:esperar a que se resuelva la promesa: el sitio se detiene hasta que la conexion de la base de datos este echa, no ejecutara nada hasta que ya tengamos la conexion
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Base de datos online");
    // si en la consola vemos este console.log quiere decir que todo salio bien
  } catch (error) {
    //   catch:es el flujo incorrecto de esta funcion, "si por algun motivo hay un error en el try, nos mandara directo a esta parte y aqui se ejecuta lo que deseemos mostrar ante un error, como un mensaje de errror valga la redundancia"
    console.log(error);
    throw new Error("Error al inicializar la DB");
  }
};

module.exports = { dbConnection };
