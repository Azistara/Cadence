//populates the mysql db "AllSongs" table with the metadata of every audio file on the system.

var mysql = require('mysql');
const {getMetadata} = require('./get_file_metadata'); 
const {mysqlSettings} = require('./mysql_settings');

let addAudioFileToDB = async (audioPath) =>{ //adds a file's metadata and absolute path to the AllSongs table in the mysql cadence db
  
       //connect to the DB
       mysqlSettings.database = 'cadence';
      const sqlConnection = mysql.createConnection(mysqlSettings);
       sqlConnection.connect(function(err) {
           if (err) {
             console.error('error connecting: ' );
             return;
           }
       });


    //get the metadata from the audioPath
    let metadata = await getMetadata(audioPath);

    if( (metadata?.format?.duration <= 5) ){return;} //this file is less than 5 seconds long and we will not add it to the database

    else{ //insert the song as a row into the AllSongs table
        //get all the metadata out of object 
        let Duration =  metadata?.format?.duration || metadata?.native?.duration || metadata?.common?.duration || -1;
        let SongTitle = metadata?.common?.title  || metadata?.format?.title || metadata?.native?.title || audioPath;
        let Artist =  metadata?.common?.artist || metadata?.format?.artist || metadata?.native?.artist || 'unknown artist';
        let Album = metadata?.common?.album || metadata?.format?.album || metadata?.native?.album ||  'unknown album';
        let AlbumArt  = metadata?.common?.picture || 'default photo'; //TODO get the path to this photo from zuriel
        let AlbumArtist = metadata?.common?.albumartist || 'unknown album artist';
        let Genre = metadata?.common?.genre || 'unknown genre';
        let Year = metadata?.common?.year || -1;
        let MD5 = "MD5 unknown"; //TODO find this value in the metadata object.
        
        //insert metadata and pathname of audio file into the table
        let sql = "INSERT INTO AllSongs (artist, title, album, albumArt, genre, duration, year, MD5, filePath, albumArtist) " +
        `VALUES ( '${Artist}', '${SongTitle}', '${Album}', '${AlbumArt}', '${Genre}', ${Duration}, ${Year}, '${MD5}', ?, '${AlbumArtist}')`;
        sqlConnection.query(sql, [''+audioPath+''], function (error, results, fields) { //launch the prepared mysqli INSERT query
            if (error) {console.log("Error in inserting song." + error.stack); } 
            else{
            console.log("audio successfully uploaded to the db. \n");

             sqlConnection.end(function(err){ //close the connection 
                if(err){
                    console.log('error closing connection' ); //+ err.stack
                    
                }
                });
            }
          });
    }
  
    return;
};


module.exports = {addAudioFileToDB};
