var mysql = require('promise-mysql');

var db = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    // password: 'soporteit',
    password: '',
    database: 'test',
    timezone: 'utc'
});

module.exports = db;