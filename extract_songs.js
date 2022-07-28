const { TrackType } = require('music-metadata/lib/type');

fs = require('fs');






let isAudioFile = (file) =>{
    let isAudio = false;
    switch(file.type){
        
        case 'audio/mpeg' : //.mp3
            isAudio = true;
            break;
        case 'audio/wav' : //.wav
            isAudio = true;
            break;
        case 'audio/ogg' : //.ogg
            isAudio =  true;
            break;
        case 'audio/aac' : //.aac
            isAudio =  true;
            break;
        case 'audio/m4a' : //.m4a 
            isAudio =  true;
            break;
        default:
            isAudio =  false;
    }
    return isAudio;
}



//loop through the passed in folder creating a song file for every song and push files to  all_songs folder

let extractSongs = (pathArray) =>{
    let files;
    if(pathArray == null){
        console.log("No songs in music library...");
        return;
    }
    pathArray.forEach(p => {
        
    });
    if(fs.statSync(p).isDirectory()){ // if current path  is a directory
        filenames = fs.readdirSync(directory_name); //add all files in the directory that are audio files to the files array. 
        filenames.forEach(file, () =>{
            if(isAudioFile(file)){
                files.push(file);
                console.log(file);
            }
        });
    }
    else{ //if the path is a file and is an audio file then push it into the files array.
        if(isAudioFile(p)){ 
            files.push(p);
            console.log(file);
        }
    }
    return files;
}



module.exports = {extractSongsFromPaths};