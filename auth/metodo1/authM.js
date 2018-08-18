var db = require('../../models/default/dbQuery');

exports.findOne = (params) => {
  return new Promise((resolve, reject) => {
    let sp_name = 'auth_login'
    let parametros = [
      params.username
    ];
    db.query(sp_name, parametros)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}
