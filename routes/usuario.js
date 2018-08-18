var express = require('express');
var router = express.Router();

var auth = require('../auth/metodo1/authC');
var usuario = require('../controllers/usuario')

router.get('/', usuario.listar); // get sin params es listar todos
// las rutas que esten abajo de este router.use auth, son las unicas q requieren auth jwt. las de arrica como ser usuario.listar NO requieren el middleware :D
// y oara hacerlo mas general, se podria poner este use en el archivo api.js de rutas, y elegir directamente q router de los modelos usan el middleware!
router.use(auth.ensureAuthenticated) 
router.get('/:idUsuario', usuario.dame); // get con params es mostrar 1 usuario
router.put('/', usuario.modificar); //put es actualizar


module.exports = router;
