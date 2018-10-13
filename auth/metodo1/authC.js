var bcrypt = require('bcrypt');
var usuario = require('../../models/usuario');
var auth = require('./authM');
var utils = require('../../providers/utils')

exports.register = (req, res) => {
  if (!req.body.password || req.body.password.length == 0) {
    var error = [{ 'codigo': 0, 'mensaje': "Debe ingresar una contraseña" }]
    return res.json(error);
  }
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  usuario.nuevo(req.body)
    .then(respuesta => {
      let token = utils.createToken(respuesta[1][0]);
      respuesta[1][0] = {};
      respuesta[1][0].token = token;
      res.json(respuesta)
    })
    .catch(error => {
      res.json(error);
    })
};

exports.login = (req, res) => {
  auth.findOne(req.body)
    .then(respuesta => {
      const pass_db = respuesta[1][0].password;
      const pass_req = req.body.password;
      const equal = bcrypt.compareSync(pass_req, pass_db);
      if (equal) {
        const token = utils.createToken(respuesta[1][0])
        respuesta[1][0].token = token;
        delete respuesta[1][0].password;
        return res.json(respuesta)
      } else {
        const err = [{ 'codigo': 0, 'mensaje': "Contraseña incorrecta" }]
        return res.json(err)
      }
    })
    .catch(error => {
      res.json(error);
    })
};

exports.ensureAuthenticated = function (req, res, next) {
  let token = req.headers.authorization

  if (!token) {
    let respuesta = [{ 'codigo': -500, 'mensaje': "Token inexistente en cabecera" }]
    return res.json(respuesta)
  }

  utils.verifyToken(token)
    .then(decoded => {
      req.headers.idUsuario = decoded.idUsuario;
      return next();
    })
    .catch(err => {
      let respuesta = [{ 'codigo': -401, 'mensaje': `${err.message}` }]
      return res.json(respuesta)
    })
}