"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("../globals");
const fs = require("fs");
const command_1 = require("../command");
exports.prefix = new command_1.Command("prefix", (client, message) => {
    let newPrefix = message.content.split(" ")[1];
    if (newPrefix !== globals_1.getConfig().prefix) {
        globals_1.getConfig().prefix = newPrefix;
        fs.writeFile(__dirname + "/../config.json", JSON.stringify(globals_1.getConfig(), null, 2), error => {
            if (error)
                console.log(error);
            console.log("writing to config.json");
        });
    }
}, 1);
