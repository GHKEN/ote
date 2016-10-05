const {ipcMain} = require('electron');
const jwt = require('jsonwebtoken');

class MessageHandler {
    static init() {
        this.setDecodeMessageHandler();
        this.setVerifyMessageHandler();
    }

    static setDecodeMessageHandler() {
        ipcMain.on('decode', ((event, arg) => {
            let decoded = jwt.decode(arg.jwt, {complete: true});
            event.returnValue = decoded;
        }));
    }

    static setVerifyMessageHandler() {
        ipcMain.on('verify', (event, arg) =>{
            jwt.verify(arg.jwt, arg.pubKey, (err, res) => {
                event.returnValue = {err: err ? err.message : null, isValid: err ? false : true};
            });
        });
    }
}

module.exports = MessageHandler;