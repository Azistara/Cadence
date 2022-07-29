
fs = require('fs');
path = require('path');

let isAudioFile = (file) =>{ //returns true if the file arg is an audio file
    let isAudio = false;
    switch(path.extname(file)){
        
        case '.mpeg' : //.mp3
            isAudio = true;
            break;
        case '.mp3' : //.mp3
            isAudio = true;
            break;
        case '.wav' : //.wav
            isAudio = true;
            break;
        case '.ogg' : //.ogg
            isAudio =  true;
            break;
        case '.aac' : //.aac
            isAudio =  true;
            break;
        case '.m4a' : //.m4a 
            isAudio =  true;
            break;
        case '.flac' : //.flac 
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
      if (fs.statSync(dirPath + "/" + file).isDirectory()) { //recursively call the function 
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
      } else { //base case... a file was found
        if(isAudioFile(file)){ //if found file is a audio file 
        arrayOfFiles.push(path.join(__dirname, dirPath, "/", file)); //then add it to the array
       }
      }
    });
    // files.forEach((file) =>{ //TODO delete this  
    //     console.log(file); //print every added file
    //     });
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
        audioFiles.forEach((file) =>{ //TODO delete this  
        console.log(file); //print every added file
        });
        console.log(audioFiles.length);
    return audioFiles; // return the songs as absolute paths array
}



module.exports = {extractSongs};




// if(fs.statSync(p).isDirectory()){ // if current path  is a directory
//     filenames = fs.readdirSync(p); //add all files in the directory that are audio files to the files array. 
//     filenames.forEach((file) =>{  //TODO: make this recursive to handle sub directories
//         if(isAudioFile(file)){
//             let newFile =  (p+ '\\' + file);
//             files.push(newFile);
            
//         }
//     });