var express = require('express');
var router = express.Router();

var usuarios = require('../controllers/usuarios')

router.post('/nuevo', usuarios.nuevo);
router.get('/listar', usuarios.listar);


module.exports = router;
