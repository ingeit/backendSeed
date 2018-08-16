var mysql = require('promise-mysql');

var db = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    password: 'soporteit',
    database: 'test',
    timezone: 'utc'
});

module.exports = db;