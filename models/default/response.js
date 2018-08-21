var mung = require('express-mung');
/*
La respuesta siempre es de la siguiente forma para armarla aqui:
en respuesta[0] = {codigo: number, mensaje: string}
en respuesta[1] = [consulta], puede venir vacio, o con objetos, por ejemplo una vista.
en caso de un register o login, devuelve el token en respuesta[1][0]
en caso de una vista: respuesta[1][row1,row2,row3]

esto es para armar la respuesta con status de la siguiente forma:

status 200:
    todo okey, el contenido de la respuesta va en el body en un [] vacio o no, depende del tipo de respuesta esperada, 
    en caso de insercion y modificacion, vendra [{idTarget: x}]
    en caso de una vista vendra [{fila1},{fila2}...{filaN}]
status 400 y 500:
    en el body directamente se manda un string con el contenido del mensaje 
    (400) algun parametro esta incorrecto
        401 problemas de auth
        403 idem
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
        if (codigo == 0) status = 400;
        if (codigo == -1) status = 500
        if (codigo == -2) status = 401;
        if (codigo == -3) status = 403;
        return res.status(status).json(mensaje);
    }
);

module.exports = response;