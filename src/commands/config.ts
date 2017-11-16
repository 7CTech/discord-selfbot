import {Command} from "../command";
import {Client, Message} from "discord.js";
import {getConfig} from "../globals";
import * as util from "../util"

export let configGet:Command = new Command("config", (client: Client, message: Message) => {
    let configItem:string = util.getArgAtPosition(message.content, 0);
    if (!getConfig().hasOwnProperty(configItem)) message.edit("invalid config item");
    message.edit(getConfig()[configItem]);
}, 1);

export let configSet:Command = new Command("config", (client: Client, message: Message) => {
    let configItem:string = util.getArgAtPosition(message.content, 0);
    if (!getConfig().hasOwnProperty(configItem)) message.edit("invalid config item");
    else {
        if (util.updateConfig(configItem, util.getArgAtPosition(message.content, 1))) {
            message.edit("Successfully updated")
        } else {
            message.edit("Failed to update config");
        }
    }
}, 2);