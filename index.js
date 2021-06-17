const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");
require("dotenv").config();

console.log(process.env);

// crear el servidor/aplicacion de express

const app = express();
// Base de datos
dbConnection();
// Directorio Público
app.use(express.static("public"));
// con este middleware estoy sirviendo un archivo estatico como lo es el html
// de esta misma manera vamos a servir nuestras paginas, conociendo el path de la pagina que queremos servir y puede ser independiente y encontrarse en otro hosting
// este middleware esta implementando mi archivo de vista, accediento a la carpeta donde se encuentra el html

// CORS
app.use(cors());
// app usa control de acceso HTTP

// Lectura y parseo del body
app.use(express.json());

// rutas
app.use("/api/auth", require("./routes/auth"));
//use: es un middleware simplemente es una funcion que se ejecuta, cuando el interprete pasa ejecutando las lineas de codigo
// cuando alguien haga una peticion al "path principal" "/api/auth" vamos a importar el otro archivo
//  donde tengo mis rutas(en este caso la importacion se hace con un required/requerido y le añadimos
// la ruta del archivo), de esta manera jalamos las rutas, y de igual manera que en angular jalara
// la ruta por defauld, que en este caso es la ruta "/" a menos que nosotros le indiquemos un path-hijo por asi decirlo

app.listen(process.env.PORT, () => {
  console.log(`servidor corriendo en puerto ${process.env.PORT}`);
  // Variables de entorno, estamos accediento a una variable de entorno  con el proccess.env. para acceder al
  // archivo .env y asi mismo acceder a la variable ahi declarada "PORT" y ahi podemos cambiar el valor de esa variable
});
