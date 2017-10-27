const global = require("../global");
import * as fs from "fs";

import {Command} from "../command";
import {Client, Message} from "discord.js"

export let prefix:Command = new Command("prefix", (client: Client, message: Message) => {
    let newPrefix = message.content.split(" ")[1];
    if (newPrefix !== global.config.prefix) {
        global.config.prefix = newPrefix;
        fs.writeFile(__dirname + "/../config.json" , JSON.stringify(global.config, null, 2), error => {
            if (error) console.log(error);
            console.log("writing to config.json");
        });
    }
}, 1);
