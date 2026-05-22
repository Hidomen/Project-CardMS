const electron = require("electron");
const ipcRenderer = electron.ipcRenderer;

const addCardButton = document.getElementById("addCardButton");


addCardButton.addEventListener("click", function(event){

    ipcRenderer.send("add-card-clicked");
});

ipcRenderer.on("add-card-reply",function(event, arg){
    console.log(arg);
});