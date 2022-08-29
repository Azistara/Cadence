const connection = require("./db_connection");

const musicIsLoaded = async () =>{
    let isLoaded = false;
    //create sql query
    let sql = "SELECT * FROM allsongs";
    //do the query
    return new Promise((resolve, reject) => {
        connection.query(sql, function (error, results, fields) {
            if (error) {
                return reject(error);
            }
            else{
                if(results.length !== 0){
                    console.log("already filled db... If you wish to purge and reload the db then click the 'refresh library' button.");
                    isLoaded = true;
                }
                return resolve(isLoaded);
            }
          });
    });
     
}



module.exports = {musicIsLoaded};