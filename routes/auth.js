const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearUsuario,
  loginUsuario,
  revalidarUsuario,
} = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

// esto es como hacer una importacion en Angular, un poco diferente

const router = Router();
// creamos una constante a la cual le vamos a cargar la funcion que acabamos de importar, esto para poder maniobrarla en este archivo(como si le estuvieramos poniendo un tipado)
// de esta manera podemos usar las "propiedades" que tiene Router(), como lo son get, post... etc y todo lo que se le puede hacer a una ruta

// crear un nuevo usuario
router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "La correo es obligatorio").isEmail(),
    check("password", "La contraseña  es obligatoria").isLength({ min: 6 }),
    validarCampos,
    // no se pone validarCampos() no se le pone parentesis, porque no lo estoy ejecutando,solo estoy mandando llamar la funcion
  ],
  // check/verificar, en primera instancia esta el nombre del campo que queremos verificar, como segunda instancia el mensaje que queremos mostrar, y por ultimo las validaciones que queremos que tenga este campo

  crearUsuario
  // creamos el usuario
);
// Usamos router.post ya que en esta peticion vamos a crear un nuevo usuario, osea vamos a enviar datos al servidor
// En estas peticiones tenemos como respuestas/parametros req y res pedido y respuesta
// usamos unaa importacion de el otro archivo, esta bien chido que una vez exportando en el otro archivo, podemos llamar a esas funciones en este script

// Login de usuario
router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña  es obligatorio").isLength({ min: 6 }),
    validarCampos,
  ],
  // check/verificar, en primera instancia esta el nombre del campo que queremos verificar, como segunda instancia el mensaje que queremos mostrar, y por ultimo las validaciones que queremos que tenga este campo
  loginUsuario
);
// Usamos router.post ya que en esta peticion vamos de nuevo a mandar datos al servidor, para verificar que el usuario ya ha sido registrado
// En estas peticiones tenemos como respuestas/parametros req y res pedido y respuesta
// usamos unaa importacion de el otro archivo, esta bien chido que una vez exportando en el otro archivo, podemos llamar a esas funciones en este script

// Validar y revalidad token
router.get("/renew", validarJWT, revalidarUsuario);
// Usamos router.get ya que vamos a pedir datos del servidor para verificar que el token siga siendo valido
// En estas peticiones tenemos como respuestas/parametros req y res pedido y respuesta
// usamos unaa importacion de el otro archivo, esta bien chido que una vez exportando en el otro archivo, podemos llamar a esas funciones en este script

module.exports = router;

//  en este script, tenemos las rutas, de nuestra aplicacion, en este caso, son 3, de las cuales manejamos el path
// al cual queremos llegar, en este caso son rutas hijas  ya que antes de este path siempre incluiremos el path padre
// de cualquier manera, los "controladores" de nuestras peticiones http las creamos en otro archivo para optimizar el codigo
// de esta manera solo las importamos para poder usarlas aqui
