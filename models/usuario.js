var db = require('./default/dbQuery');

//ejemplo de un POST (insertar de alguna forma algo en la DB)
exports.nuevo = (params) => {
    return new Promise((resolve, reject) => {
        let sp_name = 'usuario_nuevo';
        let parametros = [
            params.nombre,
            params.apellido
        ];
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

exports.dame = (params) => {
    return new Promise((resolve, reject) => {
        let sp_name = 'usuario_dame'
        let parametros = [
            params.idUsuario
        ];
        db.query_get_data(sp_name, parametros)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

exports.modificar = (params) => {
    return new Promise((resolve, reject) => {
        let sp_name = 'usuario_modificar';
        let parametros = [
            params.idUsuario,
            params.nombre,
            params.apellido
        ];
        db.query_insert_data(sp_name, parametros)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}