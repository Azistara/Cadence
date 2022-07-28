
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
        default:
            isAudio =  false;
    }
    return isAudio;
}



//loop through the passed in path list and return an array of all absolute paths to all songs found in any of the paths passed in. 

let extractSongs = (pathArray) =>{
    let files = [];
    if(pathArray == null){
        console.log("No songs in music library...");
        return;
    }
    pathArray.forEach((p) => {
        if(fs.statSync(p).isDirectory()){ // if current path  is a directory
            filenames = fs.readdirSync(p); //add all files in the directory that are audio files to the files array. 
            filenames.forEach((file) =>{  //TODO: make this recursive to handle sub directories
                if(isAudioFile(file)){
                    let newFile =  (p+ '\\' + file);
                    files.push(newFile);
                    
                }
            });
        }
        else{ //if the path is a file and is an audio file then push it into the files array.
            if(isAudioFile(p)){ 
                files.push(p);
            }
        }
        files.forEach((file) =>{ //TODO delete this  
            console.log(file);
        })
    });
   
    return files; // return the songs as absolute paths array
}



module.exports = {extractSongs};