//populates the mysql db "AllSongs" table with the metadata of every audio file on the system.

var mysql = require('mysql');
const {getMetadata} = require('./get_file_metadata'); 

let addAudioFileToDB = (audioPath, sqlConnection) =>{
    //get the metadata from the audioPath
    let metadata = getMetadata(audioPath);

    if((metadata.format.duration <= 10) || ( typeof metadata.format.duration === 'undefined')){return;} //this file is less than 10 seconds long and we will not add it to the database

    else{ //insert the song as a row into the AllSongs table
        //get all the metadata out of object 
        let Duration = metadata.format.duration;
        let SongTitle = metadata.common.title;
        let Artist =  metadata.common.artist;
        let Album = metadata.common.album;
        let AlbumArt  = metadata.common.picture;
        let AlbumArtist = metadata.common.albumartist;
        let Genre = metadata.common.genre;
        let Year = metadata.common.year;
        let MD5 = ""; //TODO find this value in the metadata object.

        //insert song into the table
        let sql = "INSERT INTO AllSongs (artist, title, album, albumArt, genre, duration, year, MD5, filePath, albumArtist) " +
        `VALUES ( ${Artist}, ${SongTitle}, ${Album}, ${AlbumArt}, ${Genre}, ${Duration}, ${Year}, ${MD5}, ${audioPath}, ${AlbumArtist})`;
        sqlConnection.query(sql, function (error, results, fields) {
            if (error) throw error;
            else{
            console.log("audio successfully uploaded to the db. \n");
            }
          });
    }
}
