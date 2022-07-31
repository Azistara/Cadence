var mysql = require('mysql');
const { mysqlSettings } = require('./mysql_settings');


let setupDatabase = () =>{

var connection = mysql.createConnection(mysqlSettings);
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
    mysqlSettings.database = 'cadence';
    connection = mysql.createConnection(mysqlSettings);
       //reconnect to the server
      connection.connect(function(err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
       
        console.log('connected as id ' + connection.threadId);
      });
      
      //create the tables if they don't exist

      //create AllSongs table
      var sql = 'CREATE TABLE IF NOT EXISTS AllSongs ( SongID int NOT NULL AUTO_INCREMENT, '
      + 'artist varchar(255), title varchar(255), album varchar(255), albumArt varchar(255), '
      + 'genre varchar(255), duration float, year int, MD5 varchar(255), filePath varchar(255), PRIMARY KEY (SongID))'; 

      connection.query(sql, function (error, results, fields) { //add the AllSongs table to the cadence db. 
        if (error) throw error;
        else{
        console.log("Successfully created AllSongs TABLE \n");
        }
      });

      //create PlayLists table
      var sql = 'CREATE TABLE IF NOT EXISTS Playlists ( PlaylistID int, SongIDs JSON, '
      + 'PlaylistTitle varchar(255), Author varchar(255), PlaylistMood varchar(255) ) ';
      console.log(sql);
      connection.query(sql, function (error, results, fields) { //add the AllSongs table to the cadence db. 
        if (error) throw error;
        else{
        console.log("Successfully created Playlists TABLE \n");
        }
      });
      

};

module.exports = {setupDatabase};


