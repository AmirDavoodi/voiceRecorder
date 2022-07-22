// Main process
const {app, BrowserWindow, ipcMain, Notification} = require('electron');
const path = require('path')
const isDev = !app.isPackaged;

function createWindow() {
    // Browser Window <- Renderer Process
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        backgroundColor: "white",
        webPreferences:{
            nodeIntegration: true,
            // nodeIntegration: false,
            // // is a feature that ensure that both, your preload scripts and Electrons 
            // // internal logic run in separate context
            contextIsolation: false,
            // enableRemoteModule: true,
        }
    });

    win.loadFile('index.html')
    isDev && win.webContents.openDevTools();
}

if (isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    })
}

app.whenReady().then(createWindow);

ipcMain.on('notify', (_, message) => {
    new Notification({
        title: 'Notification',
        body: message
    }).show();
});

// Do not close the application on MAC OS by closing the window
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Open new window if there is no open window
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});