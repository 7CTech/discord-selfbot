const global = require("../src/global.js");

module.exports = {
    strIncludes: (str, includes) => {
        for (let include in includes) {
            if (str.includes(include)) return true;
        }
        return false;
    },

    getCommand: (messageContent) => {
        return messageContent.split(" ")[0].substr(global.config.prefix.length);
    },

    validateArgs: (message, argCount) => {
        let splitMessage = message.split(" ");
        return splitMessage.length - 1 === argCount;
    }
};
