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
            let fileName = 'video1.webm'
            window.records.save(fileName, reader.result)
            console.log(`Saving ${JSON.stringify({ fileName, size: blob.size })}`)
        }
    }
    reader.readAsArrayBuffer(blob)
}



