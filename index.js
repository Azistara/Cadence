//entry point to the app
const {BrowserWindow} = require("electron-acrylic-window");

const url = require('url');
const path = require('path');
const { setVibrancy } = require('electron-acrylic-window');
const { app } = require('electron');
const os = require ('os');
let fs = require('fs');
const {loadMusicFolders} = require('./load_music.js');
const {extractSongsFromFolder} = require("./extract_songs.js");
const username = os.userInfo().username;



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
    },
    width: 1200,
    height: 1000,
  })
  setVibrancy(win, op); 
  win.loadFile('index.html');
  //win.removeMenu();  TODO: add this back after project is complete
}

app.whenReady().then(() => {
  createWindow(); //creates a renderer process
  extractSongsFromFolder(loadMusicFolders()); //run this command only if the folder "user_music does not already exist in the CADENCE project folder..."

});