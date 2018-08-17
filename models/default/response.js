var mung = require('express-mung');
/*
La respuesta siempre es de la siguiente forma para el cliente:
status 200:
    todo okey, el contenido de la respuesta va en el body en un [] vacio o no, depende del tipo de respuesta esperada, 
    en caso de insercion y modificacion, vendra [{idTarget: x}]
    en caso de una vista vendra [{fila1},{fila2}...{filaN}]
status 400 y 500:
    en el body directamente se manda un string con el contenido del mensaje 
    (400) algun parametro esta incorrecto
    (500) error interno de mysql
*/
var response = mung.json(
    function transform(body, req, res) {
        let status;
        let codigo = body[0].codigo
        let mensaje = body[0].mensaje
        let respuesta = body[1]
        if (codigo > 0) {
            return res.status(200).json(respuesta);
        }
        (codigo == 0) ? status = 400 : status = 500
        return res.status(status).json(mensaje);
    }
);

module.exports = response;