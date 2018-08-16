var express = require('express');
var router = express.Router();

var usuario = require('../controllers/usuario')

router.post('/', usuario.nuevo); // post es nuevo usuario
router.get('/', usuario.listar); // get sin params es listar todos
// router.get('/:id', usuarios.dame); // get con params es mostrar 1 usuario
// router.put('/:id', usuarios.modificar); //put es actualizar


module.exports = router;
