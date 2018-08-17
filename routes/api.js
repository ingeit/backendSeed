var express = require('express');
var router = express.Router();

var usuarioRouter = require('./usuario');
var authRouter = require('./auth');

router.use('/auth', authRouter);
router.use('/usuario', usuarioRouter);

module.exports = router;