var express = require('express');
var router = express.Router();

var auth = require('../auth/metodo1/authC');
var usuario = require('../controllers/usuario')

router.get('/', auth.ensureAuthenticated, usuario.listar); // get sin params es listar todos
router.get('/:idUsuario', auth.ensureAuthenticated, usuario.dame); // get con params es mostrar 1 usuario
router.put('/', auth.ensureAuthenticated, usuario.modificar); //put es actualizar


module.exports = router;
