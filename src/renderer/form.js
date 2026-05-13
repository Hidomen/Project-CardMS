const electron = require("electron");
const ipcRenderer = electron.ipcRenderer;


const form = document.querySelector('form');
const exitButton = document.getElementById("exit-form");


form.addEventListener('submit', async(e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        mana_cost: formData.get('mana-cost'),
        card_type: formData.get('card-type'),
        speed: formData.get('speed'),
        description: formData.get('description')
    };

    ipcRenderer.send("save-form-data", data);
});

exitButton.addEventListener("click", function(){

    ipcRenderer.send("exit-form");
});
