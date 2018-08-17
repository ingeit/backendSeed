var usuario = require('../models/usuario');

exports.nuevo = (req, res) => {
    usuario.nuevo(req.body)
        .then(respuesta => {
            res.status(200).send(respuesta)
        })
        .catch(error => {
            res.status(buildStatus(error)).send(error);
        })
}

exports.listar = (req, res) => {
    usuario.listar()
        .then(respuesta => {
            res.status(200).send(respuesta)
        })
        .catch(error => {
            res.status(buildStatus(error)).send(error);
        })
}

exports.dame = (req, res) => {
    usuario.dame(req.params)
        .then(respuesta => {
            res.status(200).send(respuesta)
        })
        .catch(error => {
            res.status(buildStatus(error)).send(error);
        })
}

exports.modificar = (req, res) => {
    usuario.modificar(req.body)
        .then(respuesta => {
            res.status(200).send(respuesta)
        })
        .catch(error => {
            res.status(buildStatus(error)).send(error);
        })
}

function buildStatus(err) {
    var status;
    switch (err[0].codigo) {
        case -1:
            status = 500
            break;
        case 0:
            status = 400
            break;
        default:
            status = 500
            break;
    }
    return status;
}