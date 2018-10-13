var establecimiento = require('../models/establecimiento');

exports.nuevo = (req, res) => {

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
    establecimiento.listar()
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

exports.baja = (req, res) => {
    establecimiento.baja(req.params,req.headers.idUsuario)
        .then(respuesta => {
            res.json(respuesta)
        })
        .catch(error => {
            res.json(error);
        })
}

exports.habilitar = (req, res) => {
    console.log('TCL: exports.habilitar -> req.body', req.body);
    console.log('TCL: exports.habilitar -> req.headers.idUsuario', req.headers.idUsuario);
    establecimiento.habilitar(req.body,req.headers.idUsuario)
        .then(respuesta => {
            res.json(respuesta)
        })
        .catch(error => {
            res.json(error);
        })
}