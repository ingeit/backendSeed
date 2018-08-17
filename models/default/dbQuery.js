var db = require('../../config/database')
/*
Al hacer un insert en DB, la respuesta tiene la forma 
=> respuesta[0] = object
=> respuesta[1] = emptyArray
respuesta [Object: {codigo,mensaje} , [] ]

en donde 
codigo = -1, (STATUS 500 Internal Server Error) error interno
codigo = 0, (STATUS 400 bad request) no paso por los controles propios del SP
codigo > 1 (STATUS 200 OK) es el id en cuestion generado correctamente

***********************************************************************************************************

Al hacer un query de datos, la respuesta tiene la forma
=> respuesta[0] = object
=> respuesta[1] = emptyArray en caso de que no haya que mostrar en la vista, o array con las rows de la vista
respuesta [Object: {codigo,mensaje} , [...] ]

si codigo = 1 (STATUS 200 OK), la consulta se hizo correctamente, aunque la vista puede no devolver ninguna fila simplemente 
porq no se encontro la informacion solicitada
si codigo = 0,(STATUS 400 bad request) no paso por los controles del SP
si codigo = -1 (STATUS 500 Internal Server Error) error interno.

respuesta[1] = [row,row,row,...] o [] empty en caso de codigo = 1
respuesta[1] no hace referencia a la consulta en caso de codigo = 0 o -1
*/



exports.query_insert_data = (sp_name, parametros = []) => {
    return new Promise((resolve, reject) => {
        var respuesta = [Object];
        let call_sp = build_query(sp_name, parametros);
        db.query(call_sp, parametros)
            .then(rows => {
                respuesta[0] = rows[0][0]
                if (respuesta[0].codigo < 1) {
                    return reject(respuesta)
                }
                return resolve(respuesta);
            })
            .catch(err => {
                respuesta[0] = { 'codigo': -1, 'mensaje': "Error numero: " + err.errno + ". Descripcion: " + err.message }
                return reject(respuesta);
            })
    })
}

exports.query_get_data = (sp_name, parametros = []) => {
    return new Promise((resolve, reject) => {
        var respuesta = [Object, []];
        let call_sp = build_query(sp_name, parametros);
        db.query(call_sp, parametros)
            .then(rows => {
                respuesta[0] = rows[0][0]
                if (respuesta[0].codigo < 1) {
                    return reject(respuesta)
                }
                respuesta[1] = rows[1]
                return resolve(respuesta);
            })
            .catch(err => {
                respuesta[0] = { 'codigo': -1, 'mensaje': "Error numero: " + err.errno + ". Descripcion: " + err.message }
                return reject(respuesta);
            })
    })
}

build_query = (sp_name, params) => {
    if (params.length == 0) {
        return `call ${sp_name}()`
    } else {
        let size = params.length
        let consulta = `call ${sp_name}(?`;
        for (let i = 1; i < size; i++) {
            consulta = consulta.concat(',?')
        }
        consulta = consulta.concat(')')
        return consulta;
    }
}