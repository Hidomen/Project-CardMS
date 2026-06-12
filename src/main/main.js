console.log("main.js is working...");

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

const fs = require("fs");

const ipcMain = electron.ipcMain;

const {setMainMenu, setAddCardMenu} = require("./menuTemplate.js");

let mainWindow, addCardWindow;

function createWindow(){
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "../renderer/main-menu.html"),
        protocol: "file",
        slashes: true
    }));
    
    setMainMenu(mainWindow);

    mainWindow.on("closed", () => {
        mainWindow = null;
        console.log("main.js is closed");
    });

}


app.on("ready", function(){
    createWindow();
});

//    IPC
//======================================================
ipcMain.on("add-card-clicked", function(event){

    addCardWindow = new BrowserWindow({
        parent: mainWindow,
        modal: true,

        show: false,

        title: "Add Card Form",
        width: 800,
        height: 850,

        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    setAddCardMenu(addCardWindow);

    addCardWindow.once("ready-to-show", ()=> {
        addCardWindow.show();
    });

    addCardWindow.loadURL(url.format({
        pathname: path.join(__dirname, "../renderer/add-card.html"),
        protocol: "file",
        slashes:true
    }));

    event.sender.send("add-card-reply", "form is opened by main.js");
})

ipcMain.on("save-form-data", function(event, data){

    const folderPath = path.join(__dirname, "../../data");
    const filePath = path.join(folderPath, "cards.json");

    let jsonList = [];

    if(!fs.existsSync(folderPath)){

        fs.mkdirSync(folderPath, { recursive: true});
    }


    if(fs.existsSync(filePath)){
        try{
            
            const fileData = fs.readFileSync(filePath, "utf8");
            
            if(fileData.trim().length > 0){
                jsonList = JSON.parse(fileData);
            }
            
        } catch(error){
            console.error("Error occured as reading or parse:", error);
            jsonList = [];
        }
    }
        
    jsonList.push(data);
    
    jsonData = JSON.stringify(jsonList, null, 4);
    
    try{
        
        fs.writeFileSync(filePath, jsonData, "utf8");
    } catch(writeErr){
        console.error("Error occured as writting", writeErr);
        return;
    }

    mainWindow.webContents.send("card-saved", jsonList.length);
});

ipcMain.on("exit-form", function(){

    console.log("form is closing by main.js");

    addCardWindow.close();
    addCardWindow = null;
});