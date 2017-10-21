const global = require("../global.js");
const fs = require("fs");
const path = require("path");
const command = require("../command.js");

let prefix = new command.command();

module.exports = {
    prefix: command.command
    name: "prefix",
    run: (client, message) => {
        let newPrefix = message.content.split(" ")[1];
        if (newPrefix !== global.config.prefix) {
            global.config.prefix = newPrefix;
            fs.writeFile(__dirname + "/../config.json" , JSON.stringify(global.config, null, 2), error => {
                if (error) console.log(error);
                console.log("writing to config.json");
            });
        }
    }
};