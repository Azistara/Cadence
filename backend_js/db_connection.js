var mysql = require('mysql');
const { mysqlSettings } = require('./mysql_settings');

mysqlSettings.database='cadence';
var connection = mysql.createConnection(mysqlSettings);

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;