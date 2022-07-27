const os = require ('os');
let fs = require('fs');

const username = os.userInfo().username;
let musicFolderPaths = [];
let filename = `C:/Users/${username}/AppData/Roaming/Microsoft/Windows/Libraries/Music.library-ms`;


function loadMusicFolders() {  
   
    //Check if file exists
    if(fs.existsSync(filename)) {
       let data = fs.readFileSync(filename, 'utf8').split('\n') //splits the xml file into lines
       
       data.forEach((line) => {
        console.log(line + '\n');
         if((line.substring(0,5) === '<url>') && line.substring(line.length-6, line.length) === '</url>'){ //if the line is a path to a music folder
            let currentFolder = line.substring(5, line.length-6);
            if(currentFolder.substring(0, 11 ) !== "knownfolder"){
            musicFolderPaths.push(currentFolder); //add the folder path to the musicFoldersPaths
            }
         }
       })
    
    } else {
       console.log("File Doesn\'t Exist.");
    }
 }
 
 loadMusicFolders();