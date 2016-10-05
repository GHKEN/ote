const {app, BrowserWindow} = require('electron');
const MessageHandler = require('./src/main/message_handler');

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({ width: 1000, height: 900 });
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    MessageHandler.init();
});