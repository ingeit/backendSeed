var usuario = require('../models/usuario');
var bcrypt = require('bcrypt');

exports.nuevo = (req, res) => {
    if (req.body.password.length == 0) {
        var error = [{ 'codigo': 0, 'mensaje': "Debe ingresar una contraseña" }]
        return res.json(error);
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    usuario.nuevo(req.body)
        .then(respuesta => {
            res.json(respuesta)
        })
        .catch(error => {
            res.json(error);
        })
}

exports.listar = (req, res) => {
    usuario.listar()
        .then(respuesta => {
            res.json(respuesta)
        })
        .catch(error => {
            res.json(error);
        })
}

exports.dame = (req, res) => {
    usuario.dame(req.params)
        .then(respuesta => {
            res.json(respuesta)
        })
        .catch(error => {
            res.json(error);
        })
}

exports.modificar = (req, res) => {
    usuario.modificar(req.body)
        .then(respuesta => {
            res.json(respuesta)
        })
        .catch(error => {
            res.json(error);
        })
}