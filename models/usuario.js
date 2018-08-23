var db = require('./default/dbQuery');
var utils = require('../providers/utils');

//ejemplo de un POST (insertar de alguna forma algo en la DB)
exports.nuevo = (params) => {
    return new Promise((resolve, reject) => {
        let sp_name = 'usuario_nuevo';
        let parametros = [
            params.username,
            params.password,
            'usuario',
            params.nombre,
            params.apellido,
            params.mail
        ];
        db.query(sp_name, parametros)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                console.error(timestamp, " Error crear usuario", err[0])
                reject(err)
            })

    })
}

exports.listar = () => {
    return new Promise((resolve, reject) => {
        let sp_name = 'usuario_listar'
        db.query(sp_name)
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
        db.query(sp_name, parametros)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

exports.modificar = (params) => {
    return new Promise((resolve, reject) => {
        utils.encriptarPassword(params.password)
            .then((passHashed) => {
                let sp_name = 'usuario_modificar';
                let parametros = [
                    params.idUsuario,
                    params.username,
                    passHashed,
                    params.nombre,
                    params.apellido,
                    params.mail
                ];
                db.query(sp_name, parametros)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            })
            .catch(err => {
                reject(err)
            })
    });
}