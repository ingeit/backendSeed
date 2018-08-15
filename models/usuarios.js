var db = require('../config/database');

//ejemplo de un POST (insertar de alguna forma algo en la DB)
exports.nuevo = (params) => {
    return new Promise((resolve, reject) => {
        let parametros = [
            params.apellido,
            params.nombre
        ];
        let sp = 'usuario_nuevo';
        consulta = db.consulta(parametros.length, sp)
        console.log('​exports.nuevo -> consulta', consulta);
        db.conexion.query(consulta, parametros)
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

exports.listar = () => {
    return new Promise((resolve, reject) => {
        db.query('call usuario_listar()')
            .then(respuesta => {
                //en mysql, la primera respuesta es el codigo, y la segunda respuesta es la vista en si
                if (respuesta[0][0].codigo < 1) {
                    return reject(respuesta[0][0])
                }
                // aqui en [1] estan todas las filas de la vista, por eso no pongo [1][0], porq sino haria referencia a la primera fila de la vista
                return resolve(respuesta[1]);
            })
            .catch(err => {
                // Este error se captura cuando mysql no pudo ejecutar bien la consulta de arriba, por ejemplo, por algun parametro faltantea
                respuesta = { 'codigo': -1, 'mensaje': "Error numero: " + err.errno + ". Descripcion: " + err.message }
                return reject(respuesta);
            })
    })
}