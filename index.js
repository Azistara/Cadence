//entry point to the app
//creates application window. Connects to mysql server. Sets up the db. Loads all audio into the db.

//import modules
const {BrowserWindow} = require("electron-acrylic-window");
const { setVibrancy } = require('electron-acrylic-window');
const { app, ipcMain } = require('electron');
const os = require ('os');
const {setupDatabase} = require("./backend_js/setup_database.js");
const {loadMusicFolders} = require('./backend_js/load_music.js');
const {extractSongs} = require("./backend_js/extract_songs.js");
const {getMetadata} = require("./backend_js/get_file_metadata");
const {handleLoadAllSongs} = require('./backend_js/handleLoadAllSongs.js');
const {handleSearch} = require("./backend_js/handle_search");
const path = require('path');

// window acrylic options object
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
    webPreferences: { 
      nodeIntegration: true, //provide the js that is running in the window access to the node.js APIs
      preload:  path.join(__dirname, 'backend_js', 'preload.js') //expose the ipcRenderer.invoke method to the renderer process via  window.electronAPI
    },

    width: 1200, 
    height: 1000,
    minHeight: 500,
    minWidth: 500,
  })
  setVibrancy(win, op); 
  win.loadFile('index.html');
  //win.removeMenu();  TODO: add this back after project is complete
}

app.whenReady().then(() => {
  setupDatabase();  //setup the mysql database
  ipcMain.handle('load-all-songs', handleLoadAllSongs); //listen for user switching to the all songs page
  ipcMain.handle('search-all-songs', async (event, searchTerm) => { const result = await handleSearch(searchTerm); return result;}); //listen for user searching all songs
  createWindow(); //creates a renderer process
 
  
  if(os.platform() ==='win32'){ 
    extractSongs(loadMusicFolders()); //load all the file paths to every audio file on the user's system.
    console.log(getMetadata("")); //HAVE ZURIEL PUT AN ITUNES FILE PATH IN THAT FUNCTION CALL as a test
  }
  else if(os.platform() === 'linux'){ }//TODO: get all music from system files for user on linux
  else if(os.platform() === 'darwin'){ }//TODO: get all music from system files for user on mac OS
  else{
    console.log("This app does not support OS other than Windows, Linux, and Mac OS. Sorry!");
    alert("This app does not support OS other than Windows, Linux, and Mac OS. Sorry!");
  }
});