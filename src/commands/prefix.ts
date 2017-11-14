import {getConfig} from "../globals";
import * as fs from "fs";

import {Command} from "../command";
import {Client, Message} from "discord.js"

export let prefix:Command = new Command("prefix", (client: Client, message: Message) => {
    let newPrefix = message.content.split(" ")[1];
    if (newPrefix !== getConfig().prefix) {
        console.log("new prefix: " + newPrefix);
        getConfig().prefix = newPrefix;
        fs.writeFile(__dirname + "/../config.json" , JSON.stringify(getConfig(), null, 2), error => {
            if (error) console.log(error);
            console.log("writing to config.json");
        });
    }
    message.delete();
}, 1);
