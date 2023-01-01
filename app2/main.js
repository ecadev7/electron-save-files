const { app, ipcMain, BrowserWindow } = require('electron')
const path = require('path')
const fs = require('fs')

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        widht: 800,
        height: 600,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        },
    })

    mainWindow.loadFile(path.join(__dirname, '/index.html'))
}

app.on('ready', () => {
    createWindow();
});

ipcMain.on('SAVE_TEXT', (event, txtval) => {
    console.log('saving text...')

    fs.writeFile(__dirname + '/file2.txt', txtval, (error) => {
        if (error)
            console.log(error)

        console.log('file written')
    })
})

ipcMain.on('SAVE_RECORD', (event, filename, buffer) => {
    let location = path.join(__dirname, filename)
    fs.writeFile(location, buffer, () => console.log('file saved'));
})

