var express = require('express');
var router = express.Router();
var auth = require('../auth/metodo1/authC')

router.post('/register', auth.register); 
router.post('/login', auth.login);


module.exports = router;
