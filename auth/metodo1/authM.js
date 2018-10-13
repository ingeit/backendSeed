var db = require('../../models/default/dbQuery');

exports.findOne = (params) => {
  let sp_name = 'auth_login'
  let parametros = [
    params.username
  ];
  return db.query(sp_name, parametros);
}
