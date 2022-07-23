//entry point to the app
const {BrowserWindow} = require("electron-acrylic-window");
const { app, BrowserWindow } = require('electron');
const createWindow = () => {
  const win = new BrowserWindow({
    frame: false;
    width: 800,
    height: 600,
  })
  win.loadFile('index.html')
}
app.whenReady().then(() => {
  createWindow()
})