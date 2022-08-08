const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    loadAllSongs: () =>  ipcRenderer.invoke('load-all-songs') 
});