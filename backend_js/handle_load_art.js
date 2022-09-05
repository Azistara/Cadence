const connection = require("./db_connection.js");
const {Blob} = require( "node:buffer");
const albumArt = require( 'album-art' );
const query = async (path) => {
  path  = path.replace(/\\/g, "\\\\"); //format the path so that it is the same as how it appears in the database.
  
  //return album art from database given a song path
  let sql = "SELECT artist, album, title FROM allsongs WHERE filePath = '" +  path + "'";
  
   return new Promise((resolve, reject) => {
    connection.query(sql, (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

const getCoverArtURL = async (path) => {
  // query the database and select the albumArt
  let response = null;
  try {
    let pictureURL = undefined;
    response = await query(path);
    response = response.map((v) => Object.assign({}, v)); //convert each row in result to a js object and put them in an array called response
    
   if(response[0].album == "unknown artist"){
    pictureURL = await albumArt( response[0].artist);
   }
   else{
   pictureURL = await albumArt( response[0].artist, {album: response[0].album} );
   }
   return {picture: pictureURL, songTitle: response[0].title};

  } catch (error) {
    console.log(error);
    return;
  }
};

//Add the contents of the getCoverArt right here and change the import statement
// to a require and return the URL to the renderer process.










module.exports = { getCoverArtURL };
