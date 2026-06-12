const electron = require("electron");
const ipcRenderer = electron.ipcRenderer;

const addCardButton = document.getElementById("addCardButton");
const syncButton = document.getElementById("syncButton");

const terminal = document.getElementById("terminal");
const terminalContent = document.getElementById("terminalContent");

const color = document.getElementById("colorSelect");

function logToTerminal(message){

    //instead of adding just display in the screen for a while, get full log from somewhere else.
    const time = new Date();
    const hour = time.toTimeString().split(' ')[0];

    terminalContent.innerHTML += `<div>[${hour}] : ${message}</div>`;

    // terminal.scrollTop = terminal.scrollHeight;
}

addCardButton.addEventListener("click", function(event){

    ipcRenderer.send("add-card-clicked");
});

ipcRenderer.on("add-card-reply",function(event, arg){
    logToTerminal(arg);
});

syncButton.addEventListener("click", function(event){

    
    logToTerminal("Synchronizing & Verifying integrity...");
    logToTerminal("Successfully synced.");
});

ipcRenderer.on("card-saved", function(event, totalLength){

    logToTerminal(`Card added. Total Library Size: ${totalLength}`);
});

color.addEventListener("change", function(){

    document.body.className = "";
    document.body.classList.add(this.value);

});