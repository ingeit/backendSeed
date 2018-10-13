var express = require('express');
var router = express.Router();
var authRouter = require('./auth');
var auth = require('../auth/metodo1/authC');

var usuarioRouter = require('./usuario');
var establecimientoRuouter = require('./establecimiento');

router.get('/', (req, res) => {
    res.render('index',{ title: "URL de ingreso: /auth" });
})
router.use('/auth', authRouter);

// Desde aqui hacia abajo, se pide token de auth para poder ingresar a las rutas
// router.use(auth.ensureAuthenticated) 
router.use('/usuario', usuarioRouter);
router.use('/establecimiento', establecimientoRuouter);

module.exports = router;