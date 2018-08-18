var jwt = require('jsonwebtoken');
var enviroment_var = require('../config/enviroment_var')
var util = require('../providers/utils')
//Esta funcion se llama, solo luego de haber pasado por passport
// y vuelvo a consultar el usuario a la base de datos
// para poder formar el token
exports.login = (req, res) => {
  var codigo = req.user[0].codigo;
  if (codigo == 1) {
    var user = req.user[1][0];
    var passwordDB = req.user[1][0].password;
    var passwordRQ = req.body.password;
    util.compararPassword(passwordRQ, passwordDB).then(passwordMatch => {
      if(passwordMatch){
        var userInfo = setUserInfo(user);
        var response = {
          token: 'JWT ' + generateToken(userInfo),
          user: userInfo
        };
        req.user[1][0] = response;
        res.json(req.user)
      }else{
        req.user[0].codigo = 0;
        req.user[0].mensaje = 'Error en usuario o contreseña';
        res.json(req.user);
      }
    })
    .catch(e => {req.user[0].codigo = -1; res.json(req.user);});
  } else {
    res.json(req);
  }
}

function setUserInfo(user) {
  return {
    idUsuario: user.idUsuario,
    username: user.username,
    rol: user.rol,
  };
}

function generateToken(user) {
  return jwt.sign(user, enviroment_var.secret_key, {
    expiresIn: 10080
  });
}