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

exports.listar = (req,res) => {
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
