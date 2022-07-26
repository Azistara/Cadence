//entry point to the app
const {BrowserWindow} = require("electron-acrylic-window");
const { setVibrancy } = require('electron-acrylic-window');
const { app } = require('electron');


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
  win.removeMenu();
}
app.whenReady().then(() => {
  createWindow()
})