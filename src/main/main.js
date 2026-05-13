console.log("main.js is working...");

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const Menu = electron.Menu;

const fs = require("fs");

const ipcMain = electron.ipcMain;


let win, formWindow;

function createWindow(){
    win = new BrowserWindow({
        width: 800,
        height: 600,
        backgroundColor: "#4734f1", //maxWidth and maxHeight is also exists
        //frame: false,
        
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadURL(url.format({
        pathname: path.join(__dirname, "../renderer/index.html"),
        protocol: "file",
        slashes: true
    }));

    win.on("closed", () => {
        win = null;
        console.log("main.js is closed");
    });

    win.webContents.openDevTools();
}

const menuTemplate = [{
    label: "demo",
 
    submenu: [
        {
            label:"help",
            click: console.log("clicked")
        }
    ]

}]

app.on("ready", function(){
    createWindow();

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
    
});

//    IPC
//======================================================

//opens a form window, that is a child window of win
ipcMain.on("add-card-clicked", function(event){

    formWindow = new BrowserWindow({
        parent: win,
        modal: true,

        show: false,

        title: "Add Card Form",
        width: 400,
        height: 800,

        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    formWindow.once("ready-to-show", ()=> {
        formWindow.show();
    });

    // formWindow.webContents.openDevTools();

    formWindow.loadURL(url.format({
        pathname: path.join(__dirname, "../renderer/form.html"),
        protocol: "file",
        slashes:true
    }));

    event.sender.send("add-card-reply", "form is opened by main.js");
})

ipcMain.on("save-form-data", function(event, data){

    const filePath = path.join(__dirname, "../../data/cards.json");

    let jsonList = [];

    //if exists control
    try{

        const fileData = fs.readFileSync(filePath, "utf8");
    
        if(fileData.trim().length > 0){
            jsonList = JSON.parse(fileData);
        }

    } catch(error){
        console.error("Error occured as reading or parse:", error);
        jsonList = [];
    }

    jsonList.push(data);

    jsonData = JSON.stringify(jsonList, null, 4);

    try{

        fs.writeFileSync(filePath, jsonData, "utf8");
    } catch(writeErr){
        console.error("Error occured as writting", writeErr);
        return;
    }
    console.log("Data succesfully added to: cards.json, total length:", jsonList.length); 
});

ipcMain.on("exit-form", function(){

    console.log("form is closing by main.js");

    formWindow.close();
    formWindow = null;
});