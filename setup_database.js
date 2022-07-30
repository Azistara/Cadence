var mysql = require('mysql');


let setupDatabase = () =>{

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'CleveM3bby!'
});
 //connect to the server
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});

//create a database if one does not exist for the client yet
 connection.query('CREATE DATABASE IF NOT EXISTS Cadence', function (error, results, fields) {
    if (error) throw error;
    else{
    console.log("database created successfully! Or it already existed.");
    }
  });

connection.end(function(err){ //close the connection so that we can reopen it with a database
    if(err){
        console.log('error closing connection' + err.stack);
        return;
    }
    });

    //reconnect to the server with the database

    connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'CleveM3bby!',
        database : 'Cadence'
      });
       //reconnect to the server
      connection.connect(function(err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
       
        console.log('connected as id ' + connection.threadId);
      });
      
      //create the tables if they don't exist
      var sql = 'CREATE TABLE AllSongs ( SongID PRIMARY KEY AUTO_INCREMENT int, LastName varchar(255), FirstName varchar(255), Address varchar(255), City varchar(255) )';





};

module.exports = {setupDatabase};

