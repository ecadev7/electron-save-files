const { contextBridge, ipcRenderer } = require('electron')

document.addEventListener('DOMContentLoaded', () => {

    let saveButton = document.getElementById('myButton')
    saveButton.addEventListener('click', (e) => {
        e.preventDefault()
        let button = document.getElementById('myText')
        let txtValue = button.value

        ipcRenderer.send('SAVE_TEXT', txtValue)
    })
})

contextBridge.exposeInMainWorld('records', {
    save: (fileName, file) => {
        var buffer = Buffer.from(file)
        ipcRenderer.send('SAVE_RECORD', fileName, buffer)
    }
})