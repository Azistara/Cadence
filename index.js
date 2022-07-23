//entry point to the app
const {BrowserWindow} = require("electron-acrylic-window");
const { app } = require('electron');
const createWindow = () => {
  const win = new BrowserWindow({
    frame: false,
    vibrancy: [options], // See below
    width: 800,
    height: 600,
  })
  win.loadFile('index.html')
}
app.whenReady().then(() => {
  createWindow()
})