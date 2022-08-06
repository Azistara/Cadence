const {mysqlSettings} = require('./mysql_settings');
var mysql = require('mysql');


const handleLoadAllSongs =  async () => {
     console.log("running handleLoadAllSongs function");
    let response;
    //connect to the mysql server
    mysqlSettings.database = 'cadence';
    connection = mysql.createConnection(mysqlSettings);
    connection.connect(function(err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
      });

       //3. query the database and select all the song rows
      let sql = 'SELECT * FROM allsongs';
      connection.query(sql, (error, result, fields) => {  
        if (error){
            console.log("error occurred querying db from main process"); 
            response =  {};
        }
        else{
            response = result;
            console.log("got all songs result from database!");
            console.log(response);
        }
        
    });
    //close the connection to the database
    connection.end(function(err){ 
        if(err){
            console.log('error closing connection' + err.stack);
            return;
        }
    }); 

    return response;
}

module.exports = {handleLoadAllSongs};