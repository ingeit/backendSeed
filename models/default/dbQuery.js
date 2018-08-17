var db = require('../../config/database')

exports.query = (sp_name, parametros = []) => {
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