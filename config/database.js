var mysql = require('promise-mysql');

var db = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
    timezone: 'utc'
});

/*
Al hacer un insert en DB, la respuesta tiene la forma 
{
    codigo: number
    mensaje: string
} 
en donde 
codigo = -1, error interno
codigo = 0, no paso por los controles propios del SP
codigo > 1 es el id en cuestion generado correctamente

***********************************************************************************************************

Al hacer un query de datos, la respuesta tiene la forma
respuesta[0][0] contiene la prop. codigo y mensaje ( mensaje solo cuando codigo es 0 o -1)
respuesta[1] contiene dentro otro array en donde estan las filas consultadas. puede ser o no un array vacio
si codigo = 1, la consulta se hizo correctamente, aunque la vista puede no devolver ninguna fila simplemente 
porq no se encontro la informacion solicitada
si codigo = 0, no paso por los controles del SP
si codigo = -1 error interno.

respuesta[1] = [row,row,row,...] o [] empty en caso de codigo = 1
respuesta[1] no hace referencia a la consulta en caso de codigo = 0 o -1
*/

exports.query_insert_data = (sp_name, parametros = []) => {
    return new Promise((resolve, reject) => {
        let call_sp = build_query(sp_name, parametros);
        db.query(call_sp, parametros)
            .then(rows => {
                console.log('​exports.nuevo -> rows', rows);
                let respuesta = rows[0][0]
                if (respuesta.codigo < 1) {
                    // hay algun internal error o algun contro propio del SP no se cumplio, por ej. el usuario ya existe.
                    return reject(respuesta)
                }
                return resolve(respuesta);
            })
            .catch(err => {
                console.log('​exports.nuevo -> err', err);
                // Este error se captura cuando mysql no pudo ejecutar bien la consulta de arriba, por ejemplo, por algun parametro faltantea
                respuesta = { 'codigo': -1, 'mensaje': "Error numero: " + err.errno + ". Descripcion: " + err.message }
                return reject(respuesta);
            })
    })
}

exports.query_get_data = (sp_name, parametros = []) => {
    return new Promise((resolve, reject) => {

        let call_sp = build_query(sp_name, parametros);
        db.query(call_sp, parametros)
            .then(res => {
                //en mysql, la primera respuesta es el codigo, y la segunda respuesta es la vista en si
                // siempre hay q devolver en respuesta [0][0] el codigo
                if (res[0][0].codigo < 1) {
                    return reject(res)
                }
                // aqui en [1] estan todas las filas de la vista, por eso no pongo [1][0], porq sino haria referencia a la primera fila de la vista
                return resolve(res);
            })
            .catch(err => {
                // Este error se captura cuando mysql no pudo ejecutar bien la consulta de arriba, por ejemplo, por algun parametro faltantea
                let respuesta = [];
                respuesta[0] = [];
                respuesta[0][0] = { 'codigo': -1, 'mensaje': "Error numero: " + err.errno + ". Descripcion: " + err.message }
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