var db = require('./default/dbQuery');
var bcrypt = require('bcrypt');

//ejemplo de un POST (insertar de alguna forma algo en la DB)
exports.nuevo = (params) => {
    return new Promise((resolve, reject) => {
        const saltRounds = 12;
        bcrypt.hash(params.password, saltRounds).then((passHashed) => {
            let sp_name = 'usuario_nuevo';
            let parametros = [
                params.username,
                passHashed,
                params.nombre,
                params.apellido,
                params.mail
            ];
            db.query_insert_data(sp_name, parametros)
                .then(res => resolve(res))
                .catch(err => reject(err))
        });
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
        const saltRounds = 12;
        bcrypt.hash(params.password, saltRounds).then((passHashed) => {
            let sp_name = 'usuario_modificar';
            let parametros = [
                params.idUsuario,
                params.username,
                passHashed,
                params.nombre,
                params.apellido,
                params.mail
            ];
            db.query_insert_data(sp_name, parametros)
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    });
}