var jwt = require('jsonwebtoken');
var enviroment_var = require('../config/enviroment_var')

//Esta funcion se llama, solo luego de haber pasado por passport
// y vuelvo a consultar el usuario a la base de datos
// para poder formar el token
exports.login = (req, res) => {
  var username = req.user;
  if (username.codigo != 0) {
    var userInfo = setUserInfo(username);
    res.status(200).json({
      token: 'JWT ' + generateToken(userInfo),
      user: userInfo
    });
  } else {
    res.json(username);
  }
}

function setUserInfo(request) {
  return {
    idUsuario: request.idUsuario,
    username: request.usuario,
    rol: request.rol,
  };
}

function generateToken(user) {
  return jwt.sign(user, enviroment_var.secret_key, {
    expiresIn: 10080
  });
}