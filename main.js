const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
const path = require('path');

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'public', 'index.html'));
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('run-playwright', (event, formData) => {
  const scriptPath = path.join(__dirname, 'playwright', 'script.js');
  const command = `node ${scriptPath} "${formData.zipCode}" "${formData.effectiveDate}" "${formData.expirationDate}" "${formData.state}" "${formData.environment}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      event.reply('playwright-response', `Error: ${stderr}`);
    } else {
      event.reply('playwright-response', `Success: ${stdout}`);
    }
  });
});
