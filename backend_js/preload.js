const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    loadAllSongs: () =>  ipcRenderer.invoke('load-all-songs'),
    searchAllSongs: (searchTerm) =>  ipcRenderer.invoke('search-all-songs', searchTerm),
    loadArt: (path) => ipcRenderer.invoke('load-art', path)
});