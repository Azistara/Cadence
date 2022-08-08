const {mysqlSettings} = require('./mysql_settings');
var mysql = require('mysql');


const handleLoadAllSongs =  () => { 
    var response;
    //connect to the mysql server
    mysqlSettings.database = 'cadence';
    connection = mysql.createConnection(mysqlSettings);
    connection.connect(function(err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
        else{
        //3. query the database and select all the song rows
            let sql = 'SELECT * FROM allsongs';
            connection.query(sql, (error, result, fields) => {  
                if (error){
                    console.log("error occurred querying db from main process"); 
                    return;
                }
                else{
                    response = result.map(v => Object.assign({}, v)); //convert each row in result to a js object and put them in an array called response
                    console.log(response[1]);
                    // close the connection to the database
                    connection.end(function(err){ 
                        if(err){
                            console.log('error closing connection' + err.stack);
                            return;
                        }
                        else{
                            console.log("returning response:" + response[1]);
                            console.log("returning response:");
                            return response; 
                        }
                       
                    });
                }
            }); 
        }
    });
}

module.exports = {handleLoadAllSongs};