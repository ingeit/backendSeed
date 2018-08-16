var passport = require('passport');
var auth = require('./../models/default/auth');
var enviroment_var = require('./enviroment_var')
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local').Strategy;

var jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: enviroment_var.secret_key
};

var localLogin = new LocalStrategy(
  (username, password, done) => {
    process.nextTick(() => {
      auth.login(username, password)
        .then((user) => {
          return done(null, user);
        })
        .catch(() => {
          return done(null, false);
        })
    });
  }
);

var jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  auth.dame(payload.idUsuario)
    .then((user) => {
      return done(null, user);
    })
    .catch(() => {
      return done(null, false);
    })
});

passport.use(localLogin);
passport.use(jwtLogin);