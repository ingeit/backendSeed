var bcrypt = require('bcrypt');
var usuario = require('../../models/usuario');
var auth = require('./authM');
var utils = require('../../providers/utils')

exports.registrar = (req, res) => {
  if (req.body.password.length == 0) {
    var error = [{ 'codigo': 0, 'mensaje': "Debe ingresar una contraseña" }]
    return res.json(error);
  }
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  usuario.nuevo(req.body)
    .then(respuesta => {
      respuesta[1][0].token = utils.createToken(req.body)
      res.json(respuesta)
    })
    .catch(error => {
      res.json(error);
    })
};

exports.login = (req, res) => {
  auth.findOne(req.body)
    .then(respuesta => {
      let pass_db = respuesta[1][0].password;
      let pass_req = req.body.password;
      let equal = bcrypt.compareSync(pass_req, pass_db);
      if (equal) {
        respuesta[1][0].token = utils.createToken(respuesta[1][0])
        return res.json(respuesta)
      }
    })
    .catch(error => {
      res.json(error);
    })
};

exports.ensureAuthenticated = function (req, res, next) {
  let token = req.headers['x-access-token']
  console.log('​exports.ensureAuthenticated -> token', token);

  if (!token) {
    let respuesta = [{ 'codigo': -2, 'mensaje': "Token inexistente en cabecera" }]
    return res.json(respuesta)
  }

  utils.verifyToken(token)
    .then(decoded => {
      console.log('​exports.ensureAuthenticated -> decoded', decoded);
      return next();
    })
    .catch(err => {
      let respuesta = [{ 'codigo': -3, 'mensaje': `Token incorrecto. Motivo: ${err.message}` }]
      return res.json(respuesta)
    })
}