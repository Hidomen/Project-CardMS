const electron = require("electron");
const ipcRenderer = electron.ipcRenderer;

const form = document.querySelector('form');
const exitButton = document.getElementById("exit-form");

const CardFactories = require("./formFactories.js");

let ID = 0;

form.addEventListener('submit', async(e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const baseData = {
        id: ID++,
        color: formData.get("color"),
        name: formData.get("name"),
        mana_cost: parseInt(formData.get("mana-cost")),
        card_type: formData.get("card-type"),

        description: formData.get("description"),
    };

    let factoryData = CardFactories[baseData.card_type];

    let finalData;

    if(factoryData){

        finalData = factoryData(baseData, formData);

    } else {
        finalData = baseData;
    }

    ipcRenderer.send("save-form-data", finalData);
    form.reset();
});

exitButton.addEventListener("click", function(){

    ipcRenderer.send("exit-form");
});

const allExtraFields = document.querySelectorAll(".extra-field");

document.getElementById("card-type").addEventListener("change", function(){

    allExtraFields.forEach(field => {
        field.style.display = "none";
    });

    const targetField = document.getElementById(this.value);

    if(targetField){

        targetField.style.display = "block";
    }
});