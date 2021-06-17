const jwt = require("jsonwebtoken");

const generarJWT = (uid, name) => { 
  const payload = { uid, name };
//Se crea la funcion "generarJWT" a la cual le mando dos parametros el uid y el name
// esos dos datos recibitos los guardo en una variable payload ahora payload tiene dentro un objeto con esos dos propiedades 

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) {
          //   todo mal
          console.log(err);
          reject(err);
        } else {
          //    todo bien
          resolve(token);
        }
      }
    );
  });
};

module.exports = { generarJWT };

// TODO: EXPLICACION:
// Importamos la librerira de JWT
// Creamos la funcion "generarJWT" que recibirá dos parametros "uid" y "name"
// Creamos una constante que va a tener el valor de un objeto compuesto por los dos parametros que nos mandan
// creamos una promesa y dentro colocamos el metodo para crear el token, se crea la promesa ya que el metodo original, aun trabaja en base a callbacks
// jwt.sing: creara el token y para eso ocupa que le pasemos dos cosas payload y la firma "SECRET_JWT_SEED" que creamos en las variables de desarrollo(la firma la podemos crear como queramos)
// a "jwt.sing" tambien le podemos mandar un argunmento indicando la duracion que quermos que teng nuestro token(algo asi como su caducidad)
// dentro de la funcion, tenemos el callback, que va a recibir o un error o un token
// si recibimos el error imprimelo y usa el reject de la promesa mandando el error
// de otro modo resuelveme mandandome el token
