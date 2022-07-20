// Main process
const {app, BrowserWindow, Notification} = require('electron');
const path = require('path');

function createWindow() {
    // Browser Window <- Renderer Process
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        backgroundColor: "white",
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });

    win.loadFile('index.html')
    win.webContents.openDevTools();
}

app.whenReady()
    .then(() => {
        createWindow();
        // const notification = new Notification({
        //     title: 'Hello World',
        //     body: 'My test message'
        // })
        // notification.show();
        const parsed = path.parse('/home/user/dir/file.txt')
        console.log(parsed.base);
        console.log(parsed.ext);
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