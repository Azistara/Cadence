const os = require ('os');
let fs = require('fs');




 function loadMusicFolders() { //returns an array of all the files that have music in them.
   const username = os.userInfo().username;
   let musicFolderPaths = [];
   let filename = `C:/Users/${username}/AppData/Roaming/Microsoft/Windows/Libraries/Music.library-ms`;
    //Check if file exists
    if(fs.existsSync(filename)) {
       let data = fs.readFileSync(filename, 'utf8').split('\n') //splits the xml file into lines
       
       data.forEach((line) => {//perform on every line:
         if(line.includes('<url>') && line.includes('</url>')){ //if the line is a path to a music folder       better to check like this:  && line.substring(line.length-6, line.length === '</url>'
            let currentFolder = line.trim().substring(5, line.length-15); //strip off the xml leaving just a path string
            if(currentFolder.substring(0, 11 ) !== "knownfolder"){//don't grab knownfolders as they have weird content as their path
            musicFolderPaths.push(currentFolder); //add the folder path to the musicFoldersPaths
            }
         }
       });
       musicFolderPaths.forEach((el) =>{ //print all the added folder paths to the console.
          console.log(el + '\n');
            return musicFolderPaths;
       });
    
    } else {
       console.log(`File: ${filename}  Doesn\'t Exist.`);
       return null;
    }
    return null;
 }

 module.exports = {loadMusicFolders};