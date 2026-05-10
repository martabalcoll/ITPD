const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1536,
        height: 864,
        x: 0,
        y: 0,
        frame: false, // Frameless window (no top bar, no controls)
        autoHideMenuBar: true, // Hide menu bar
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    // Hide menu completely
    Menu.setApplicationMenu(null);

    // Load presentacion.html
    win.loadFile(path.join(__dirname, 'presentacion.html'));

    // Scale down content to 80% to simulate fullscreen proportions in a larger window
    win.webContents.on('did-finish-load', () => {
        win.webContents.setZoomFactor(0.8);
        
        // Inject background image only for Electron
        win.webContents.insertCSS(`
            #game-stage {
                background: url('Madera.png') no-repeat center center / cover, #d4b58e !important;
            }
        `);
    });

    // Handle Escape key to close the app (since there is no close button)
    win.webContents.on('before-input-event', (event, input) => {
        if (input.key === 'Escape') {
            app.quit();
        }
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
