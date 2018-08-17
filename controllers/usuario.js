var usuario = require('../models/usuario');

exports.nuevo = (req, res) => {
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