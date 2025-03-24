const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  runPlaywright: (data) => ipcRenderer.send('run-playwright', data),
  onPlaywrightResponse: (callback) => ipcRenderer.on('playwright-response', (event, message) => callback(message)),
});
