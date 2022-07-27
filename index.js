//entry point to the app
const {BrowserWindow} = require("electron-acrylic-window");

const url = require('url');
const path = require('path');
const { setVibrancy } = require('electron-acrylic-window');
const { app } = require('electron');
const os = require ('os');
let fs = require('fs');

const username = os.userInfo().username;
let musicFolderPaths = [];
let filename = `C:/Users/${username}/AppData/Roaming/Microsoft/Windows/Libraries/Music.library-ms`;


function loadMusicFolders() {  //TODO: should create new file called users_music_folders_paths.txt and populate it with music folder paths
   
    //Check if file exists
    if(fs.existsSync(filename)) {
       let data = fs.readFileSync(filename, 'utf8').split('\n') //splits the xml file into lines
       
       data.forEach((line) => {
        console.log(line + '\n');
         if(line.includes('<url>') && line.includes('</url>')){ //if the line is a path to a music folder   && line.substring(line.length-6, line.length === '</url>'
            let currentFolder = line.trim().substring(5, line.length-15);
            if(currentFolder.substring(0, 11 ) !== "knownfolder"){
            musicFolderPaths.push(currentFolder); //add the folder path to the musicFoldersPaths
            }
         }
       });
       musicFolderPaths.forEach((el) =>{
          console.log(el + '\n');
       });
    
    } else {
       console.log("File Doesn\'t Exist.");
    }
 }
 
 





//create the wondow acrylic options object
op = {
  theme: '#43171455', //change back to greyish 
  effect:  'acrylic',
  useCustomWindowRefreshMethod: true,
  maximumRefreshRate: 60,
  disableOnBlur: true
};



const createWindow = () => {
  const win = new BrowserWindow({
    frame: true,
  
    width: 1000,
    height: 1000,
  })
  setVibrancy(win, op); 
  win.loadFile('index.html');
  //win.removeMenu();
}
app.whenReady().then(() => {
  createWindow();
  loadMusicFolders(); //run this command only if the folder "user_music does not already exist in the CADENCE project folder..."
});