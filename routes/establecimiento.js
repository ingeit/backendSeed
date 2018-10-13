var express = require('express');
var router = express.Router();
var establecimiento = require('../controllers/establecimiento')
var auth = require('../auth/metodo1/authC');
//requiere autentificacion
router.use(auth.ensureAuthenticated) 

router.get('/', establecimiento.listar); // get sin params es listar todos
router.get('/:idUsuario', establecimiento.dame); // get con params es mostrar 1 usuario
router.delete('/:idEstablecimientoEducativo', establecimiento.baja); // get con params es mostrar 1 usuario
router.post('/habilitar', establecimiento.habilitar); // get con params es mostrar 1 usuario
// router.put('/', establecimiento.modificar); //put es actualizar


module.exports = router;
