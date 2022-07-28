
fs = require('fs');


let  extractSongsFromFolder = async (dir) =>{  //gets all song files (m4a, mp3, wav ) and stores them in the all_songs folder in the CADENCE project folder
//get the local all__songs folder
let allSongsFolder;


//loop through the passed in folder creating a song file for every song and push files to  all_songs folder
    try {
      const files = await fs.promises.readdir(dir);
  
      for (const file of files) {
        const p = path.join(moveFrom, file);
        const stat = await fs.promises.stat(p);
  
        if (stat.isFile()) {
          console.log("'%s'  file.", fromPath);
          //move this file into the allSongsFolder
          allSongsFolder.push(file);
        } else if (stat.isDirectory()) {
          console.log("'%s' directory.", fromPath);
          //move into the subdirectory and repeat the process
          extractSongsFromFolder(file);
        }
      }
    } catch (e) {
      console.error(e);
    }

}



module.exports = {extractSongsFromFolder};