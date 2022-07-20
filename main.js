// Main process
const {app, BrowserWindow} = require('electron');

function createWindow() {
    // Browser Window <- Renderer Process
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        backgroundColor: "white",
        webPreferences:{
            nodeIntegration: true
        }
    });

    win.loadFile('index.html')
    win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

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