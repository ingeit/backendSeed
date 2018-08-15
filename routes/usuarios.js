var express = require('express');
var router = express.Router();

var usuarios = require('../controllers/usuarios')

router.post('/', usuarios.nuevo); // post es nuevo usuario
router.get('/', usuarios.listar); // get sin params es listar todos
// router.get('/:id', usuarios.dame); // get con params es mostrar 1 usuario
// router.put('/:id', usuarios.modificar); //put es actualizar


module.exports = router;
