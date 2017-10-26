const global = require("../src/global.js");
const fs = require("fs");
require("path"); //for __dirname

const Command = require("../src/command").Command;

let prefix = new Command("prefix", (client, message) => {
    let newPrefix = message.content.split(" ")[1];
    if (newPrefix !== global.config.prefix) {
        global.config.prefix = newPrefix;
        fs.writeFile(__dirname + "/../config.json" , JSON.stringify(global.config, null, 2), error => {
            if (error) console.log(error);
            console.log("writing to config.json");
        });
    }
}, 1);

module.exports = prefix;