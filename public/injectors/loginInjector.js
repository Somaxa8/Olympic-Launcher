const {ipcRenderer} = require('electron')

window.addEventListener("load", () => {
    ipcRenderer.send("set-session", document.getElementsByTagName("pre")[0].innerHTML)
})
