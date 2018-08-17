var express = require('express');
var passport = require('passport');
var passportService = require('../config/auth');
var router = express.Router();

var auth = require('../controllers/auth')
var requireLogin = passport.authenticate('local', { session: false });

router.post('/', requireLogin, auth.login); // post es nuevo usuario

module.exports = router;
