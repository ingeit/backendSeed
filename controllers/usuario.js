var usuario = require('../models/usuario');

exports.nuevo = (req, res) => {
    usuario.nuevo(req.body)
        .then(respuesta => {
            res.status(200).send(respuesta)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

exports.listar = (req, res) => {
    usuario.listar()
    .then(respuesta => {
        console.log('​exports.listar -> respuesta', respuesta);
        res.status(200).send(respuesta)
    })
    .catch(error => {
        console.log('​exports.listar -> error', error);
        res.status(400).send(error)
    })
}

exports.dame = (req, res) => {
    usuario.dame(req.params)
    .then(respuesta => {
        console.log('​exports.dame -> respuesta', respuesta);
        res.status(200).send(respuesta)
    })
    .catch(error => {
        console.log('​exports.dame -> error', error);
        res.status(400).send(error)
    })
}

exports.modificar = (req, res) => {
    usuario.modificar(req.body)
        .then(respuesta => {
            res.status(200).send(respuesta)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}