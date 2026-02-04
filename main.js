const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        icon: path.join(__dirname, 'build/icons/icon.png'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        show: false
    });

    // Charger votre index.html
    mainWindow.loadFile('index.html');

    // Afficher quand prêt
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    // Menu personnalisé
    const template = [
        {
            label: 'Fichier',
            submenu: [
                {
                    label: 'Nouveau membre',
                    accelerator: 'Ctrl+N',
                    click: () => mainWindow.webContents.send('menu-action', 'new-member')
                },
                { type: 'separator' },
                { label: 'Quitter', role: 'quit' }
            ]
        },
        {
            label: 'Aide',
            submenu: [
                {
                    label: 'À propos',
                    click: () => {
                        dialog.showMessageBox({
                            type: 'info',
                            title: 'OLIYMPIUS FITNESS',
                            message: 'Logiciel de gestion de salle de sport',
                            detail: 'Développeur: RAKOTONIRINA Rado\nContact: 034 60 761 00',
                            buttons: ['OK']
                        });
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
