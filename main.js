// main.js
const { app, BrowserWindow } = require('electron');
const { exec } = require('child_process');

function createWindow() {
    const win = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        kiosk: true  // Full-screen kiosk mode
    });

    // Load the local server
    win.loadURL('http://localhost:8081');
}

// Start Express server, then create Electron window
exec('node server.js', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error starting server: ${error}`);
        return;
    }
    console.log(stdout);

    // Start Electron app
    app.whenReady().then(createWindow);

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
});
