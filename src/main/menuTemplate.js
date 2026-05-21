const Menu = require("electron").Menu;


const commonTemplate = [
    {
            label: "View",

            submenu: [
                {label: "Color Preferences (Theme)..."},
                {type: "separator"},
                {label: "Reload", role:"reload"},
                {label: "Force Reload", role:"forcereload"}
            ]
        },
        {
            label: "Help",

            submenu: [
                {label: "Documentation"},
                {type: "separator"},
                {label: "About", role:"about"}
            ]
        },
        {
            label: "Dev Tools",
    
            submenu: [
                {
                    label:"Toggle Development Tools",
                    click: function(item, focusedWindow){
                        if(focusedWindow){focusedWindow.webContents.toggleDevTools();}
                    },
                    accelerator: "CmdOrCtrl+Shift+D"
                }
            ]
        }
]

function setMainMenu(mainWindow){
    
    const mainWindowTemplate = [
        {
            label: "Library",

            submenu: [
                {
                    label:"New Library...",
                    accelerator:"CmdOrCtrl+N"
                },
                {
                    label:"Open Library...",
                    accelerator:"CmdOrCtrl+O"
                },
                {type:"separator"},
                {
                    label:"Library Settings..."
                },
                {
                    label:"Open Library Folder in Explorer..."
                },
                {type:"separator"},
                {label:"Exit", role:"quit"}
            ]
        },
        {
            label: "Cards",

            submenu: [
                {
                    label:"Add Card",
                    accelerator:"CmdOrCtrl+A"
                },
                {
                    label:"View Card...",
                    accelerator:"CmdOrCtrl+V"
                },
                {
                    label:"Edit Card...",
                    accelerator:"CmdOrCtrl+E"
                },
                {
                    label:"Update Library",
                    accelerator:"CmdOrCtrl+U"
                },
                {type:"separator"},
                {label: "Export Options..."}
            ]
        },
        
        ...commonTemplate
    ]

    const menu = Menu.buildFromTemplate(mainWindowTemplate);
    mainWindow.setMenu(menu);
}

function setAddCardMenu(addCardWindow){

    const addCardWindowTemplate = [
        {
            label:"Card",
            submenu: [
                {
                    label:"Upload from Existing Card..."
                },
                {
                    label:"Upload from Draft..."
                },
                {type:"separator"},
                {
                    label:"Save",
                    accelerator: "CmdOrCtrl+S"
                },
                {
                    label:"Save as...",
                },
                {
                    label:"Save as Draft...",
                    accelerator:"CmdOrCtrl+Shift+S"
                },
                {type:"separator"},
                {
                    label:"Close", role:"close"
                }
            ]
        },

        ...commonTemplate
    ]

    const menu = Menu.buildFromTemplate(addCardWindowTemplate);
    addCardWindow.setMenu(menu);
}

module.exports = {setMainMenu, setAddCardMenu};