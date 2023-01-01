const { ipcRenderer } = require('electron')

document.addEventListener('DOMContentLoaded', () => {

    let saveButton = document.getElementById('myButton')
    saveButton.addEventListener('click', (e) => {
        e.preventDefault()
        let button = document.getElementById('myText')
        let txtValue = button.value

        ipcRenderer.send('SAVE_TEXT', txtValue)
    })
})

document.addEventListener('DOMContentLoaded', () => {
    let saveButton = document.getElementById('myButtonRecord')
    saveButton.addEventListener('click', () => saveRecord())
})

function saveRecord() {
    const blob = new Blob(['blob'], {
        'type': 'video/webm'
    })

    let reader = new FileReader()
    reader.onload = function () {
        if (reader.readyState == 2) {
            let fileName = 'video2.webm'
            var buffer = Buffer.from(reader.result)
            ipcRenderer.send('SAVE_RECORD', fileName, buffer)
            console.log(`Saving ${JSON.stringify({ fileName, size: blob.size })}`)
        }
    }
    reader.readAsArrayBuffer(blob)
}

$(function () {
    $("#dialog").dialog({
        autoOpen: false,
        show: {
            effect: "blind",
            duration: 1000
        },
        hide: {
            effect: "explode",
            duration: 1000
        }
    });

    $("#opener").on("click", function () {
        $("#dialog").dialog("open");
    });
});