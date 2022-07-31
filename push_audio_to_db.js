//populates the mysql db "AllSongs" table with the metadata of every audio file on the system.

var mysql = require('mysql');
const {getMetadata} = require('./get_file_metadata'); 

let addAudioFileToDB = (audioPath, sqlConnection) =>{
    //get the metadata from the audioPath
    let metadata = getMetadata(audioPath);

    if((metadata.format.duration <= 10) || ( typeof metadata.format.duration === 'undefined')){return;} //this file is less than 10 seconds long and we will not add it to the database

    else{
        //get all the metadata out of object 
        let duration = metadata.format.duration;
        let SongTitle;
        let Artist;
        let Album;
        let AlbumArt;
        let AlbumArtist;
        let Genre;
        let Year;
        let MD5;

        //insert it into the table

        let sql = 'INSERT into AllSongs ';
        sqlConnection.query(sql, function (error, results, fields) {
            if (error) throw error;
            else{
            console.log("audio successfully uploaded to the db. \n");
            }
          });
    }
}
