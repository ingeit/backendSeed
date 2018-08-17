var db = require('./dbQuery');

exports.login = (username, password) => {
  return new Promise((resolve, reject) => {
    let sp_name = 'auth_login'
    let parametros = [
      username,
      password
    ];
    db.query_get_data(sp_name, parametros)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

exports.dame = (params) => {
  return new Promise((resolve, reject) => {
    let sp_name = 'auth_dame'
    let parametros = [
      params.idUsuario
    ];
    db.query_get_data(sp_name, parametros)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}