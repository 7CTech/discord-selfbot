var getConfig = globals.getConfig;
import * as fs from "fs";
import { Command } from "../command";
export let prefix = new Command("prefix", (client, message) => {
    let newPrefix = message.content.split(" ")[1];
    if (newPrefix !== getConfig().prefix) {
        getConfig().prefix = newPrefix;
        fs.writeFile(__dirname + "/../config.json", JSON.stringify(getConfig(), null, 2), error => {
            if (error)
                console.log(error);
            console.log("writing to config.json");
        });
    }
}, 1);
