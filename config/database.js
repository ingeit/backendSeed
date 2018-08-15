var mysql = require('promise-mysql');

exports.conexion = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    password: 'soporteit',
    database: 'test',
    timezone: 'utc'
});

exports.consulta = (cantidad, sp) => {
    let consulta = `call ${sp}(?`;
    for (let i = 1; i < cantidad; i++) {
        consulta = consulta.concat(',?')
    }
    consulta = consulta.concat(')')
    return consulta;
}
