


const cardTypeFactory = {

    minion: (baseData, formData) => {

        console.log("minion")
        return {
            ...baseData,

            stats: {

                speed: Number(formData.get("speed")),
                attack: Number(formData.get("attack")),
                health: Number(formData.get("health")),
            }
            
        };
    },

    spell: (baseData, formData) => {
        const isTargetable = formData.get("targetable") == "on";

        return {
            ...baseData,

            target: isTargetable ? {target_group: formData.get("target-group")} : false
        };
    },

    item: (baseData, formData) => {

        return {
            ...baseData,
        }
    },

    mana: (baseData, formData) => {

        return {
            ...baseData,
        }
    }
}

module.exports = cardTypeFactory;