// aqui van los metodos utilizados como ser Transoformar fechas, y cosas asi q se puedan utilizar en varios lados
// como por ej tb Primera Letra Mayuscula

var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var enviroment_var = require('../config/enviroment_var');
global.moment = require('moment');
moment.locale('es');
global.timestamp = moment().format('DD/MM/YYYY HH:mm:ss');// moment global para usar en cualquier lado sin importarla cada vez.

//esta funcion no esta en uso, se uso encambio, la misma pero sincronica, directamente en el controller por cuestiones de implementacion de AUTH.
exports.encriptarPassword = (password = '') => {
    return new Promise((resolve, reject) => {
        if (password.length == 0) {
            var respuesta = [{ 'codigo': 0, 'mensaje': "Debe ingresar una contraseña" }]
            return reject(respuesta);
        }
        const saltRounds = 12;
        bcrypt.hash(password, saltRounds)
            .then((passHashed) => {
                return resolve(passHashed)
            })
            .catch(() => {
                var respuesta = [{ 'codigo': -1, 'mensaje': "Problemas para encriptar el password" }]
                return reject(respuesta);
            })
    })
}

exports.createToken = (usuario) => {
    let payload = {
        idUsuario: usuario.idUsuario,
        username: usuario.username,
        rol: usuario.rol,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        mail: usuario.mail
    };
    let expires = { expiresIn: '1m' }
    return jwt.sign(payload, enviroment_var.secret_key, expires);
};

exports.verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, enviroment_var.secret_key, function (err, decoded) {
            if (err) return reject(err)
            // console.log('time left:', decoded.exp - Math.floor(Date.now()/1000));
            return resolve(decoded)
        });
    })
};