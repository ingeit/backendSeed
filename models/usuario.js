var db = require('../config/database');

//ejemplo de un POST (insertar de alguna forma algo en la DB)
exports.nuevo = (params) => {
    return new Promise((resolve, reject) => {
        let parametros = [
            params.apellido,
            params.nombre
        ];
        let sp_name = 'usuario_nuevo';
        db.query_insert_data(sp_name, parametros)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

exports.listar = () => {
    return new Promise((resolve, reject) => {
        let sp_name = 'usuario_listar'
        db.query_get_data(sp_name)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}