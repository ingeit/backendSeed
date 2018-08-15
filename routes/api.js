var express = require('express');
var router = express.Router();

var usuariosRouter = require('./usuarios');

router.use('/usuarios', usuariosRouter);

module.exports = router;