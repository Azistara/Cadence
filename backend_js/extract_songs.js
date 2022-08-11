
const fs = require('fs');
const path = require('path');
const {addAudioFileToDB} = require('./push_audio_to_db');
var mysql = require('mysql');
const {mysqlSettings} = require('./mysql_settings');
let isAudioFile = (file) =>{ //returns true if the file arg is an audio file
    let isAudio = false;
    switch(path.extname(file)){
        
        case '.mpeg' : //.mp3
        
        case '.mp3' : //.mp3
        
        case '.wav' : //.wav
           
        case '.ogg' : //.ogg
          
        case '.aac' : //.aac
     
        case '.m4a' : //.m4a 
            
        case '.flac' : //.flac 
          
        case '.m4r' : //.m4r 
            isAudio =  true;
            break;
        default:
            isAudio =  false;
    }
    return isAudio;
}


const getAllFiles = function(dirPath, arrayOfFiles) {

     

    let files = fs.readdirSync(dirPath);
  
    arrayOfFiles = arrayOfFiles || [];
  
    files.forEach(function(file) {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) { 
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles); //recursively call the function on the current directory path
      } else { //base case... a file was found
        if(isAudioFile(file)){ //if found file is a audio file TODO: check if it is a duplicate and ignore if dubplicate
        arrayOfFiles.push(path.join( dirPath, "/", file)); //then append the absolute path and add this path to the array
        addAudioFileToDB(path.join( dirPath, "/", file));//add the file as a song row to the AllSongs table in the mysql cadence db
       }
      }
    });

    
    return arrayOfFiles; //return the array of audio files
  }





//loop through the passed in path list and return an array of all absolute paths to all songs found in any of the paths passed in. 

let extractSongs = (pathArray) =>{
    let audioFiles = [];
    if(pathArray.length === 0 || pathArray === null){
        console.log("No songs in music library...");
        return files;
    }
    pathArray.forEach((p) => {
        audioFiles = audioFiles.concat(getAllFiles(p)); //add every audio file to the files array.
        });
    console.log("number of added audioFiles: " + audioFiles.length);
    return audioFiles; // return the songs as absolute paths array
}



module.exports = {extractSongs};

