const { response } = require("express");
const { validationResult } = require("express-validator");

const validarCampos = (req, res = response, next) => {
  const errors = validationResult(req);
  // creo una constante "errors" la cual va a ser el resultado del metodo que importamos este metodo  hace la validacion del resultado y para eso le tenemos que mandar el request, algo asi que verifica que lo que mandamos de regreso sea lo que se pidio
  console.log(errors);
  // imprimir los errores

  if (!errors.isEmpty()) {
    // si error no esta vacio
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
    // retorname uns statis 400 que es un "error en la base"
    // tambien retornamos un objeto json con ok en falso y el error con el metodo mapped()
  }
  next();
  //   esta funcion se utiliza para darle continuidad al flujo de la peticion, o de los middlewares siguientes
  //   sin next, la aplicacion se quedara trabada, ya que
};

module.exports = { validarCampos };
