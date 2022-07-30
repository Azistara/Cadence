//entry point to the app
const {BrowserWindow} = require("electron-acrylic-window");

const url = require('url');
const path = require('path');
const { setVibrancy } = require('electron-acrylic-window');
const { app } = require('electron');
const os = require ('os');
const fs = require('fs');
const {setupDatabase} = require("./setup_database.js");
const {loadMusicFolders} = require('./load_music.js');
const {extractSongs} = require("./extract_songs.js");
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
    minHeight: 500,
    minWidth: 500,
  })
  setVibrancy(win, op); 
  win.loadFile('index.html');
  //win.removeMenu();  TODO: add this back after project is complete
}

app.whenReady().then(() => {
  createWindow(); //creates a renderer process
  setupDatabase();  //setup the mysql database

  if(os.platform() ==='win32'){ 
    extractSongs(loadMusicFolders()); //load all the file paths to every audio file on the user's system. 
  }
  else if(os.platform() === 'linux'){ }//TODO: get all music from system files for user on linux
  else if(os.platform() === 'darwin'){ }//TODO: get all music from system files for user on mac OS
  else{
    console.log("This app does not support OS other than Windows, Linux, and Mac OS. Sorry!");
    alert("This app does not support OS other than Windows, Linux, and Mac OS. Sorry!");
  }
});