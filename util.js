const global = require("./global.js");

module.exports = {
    strIncludes: (str, includes) => {
        for (let include in includes) {
            if (str.includes(include)) return true;
        }
        return false;
    },

    isCommandValid: (command) => {
        if (command.name === null || command.name === "") return false;
    },

    getCommand: (messageContent) => {
        return messageContent.split(" ")[0].substr(global.config.prefix.length);
    }
};
