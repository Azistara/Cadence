const connection = require("./db_connection.js");

const query = async () => {
    let sql = 'SELECT * FROM allsongs ORDER BY title';
return new Promise((resolve, reject)=>{
    connection.query(sql,  (error, results)=>{
        if(error){
            return reject(error);
        }
        return resolve(results);
    });
});

};

const handleLoadAllSongs = async () => { 
          
    // query the database and select all the song rows
    let response = null;
    try{
        response = await query(); 
        response = response.map(v => Object.assign({}, v)); //convert each row in result to a js object and put them in an array called response
        return response;
    }
    catch (error){
        console.log( error); 
        return;
    }
}        


module.exports = {handleLoadAllSongs};