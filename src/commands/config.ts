import {Command} from "../command";
import {Client, Message} from "discord.js";
import {getConfig, GlobalConfig} from "../globals";
import * as util from "../util"

export let configGet:Command = new Command("config", (client: Client, message: Message):Promise<Message> => {
    let configItem:string = util.getArgAtPosition(message.content, 0);
    if (!getConfig().hasOwnProperty(configItem)) return message.edit("invalid config item");
    return message.edit(getConfig()[configItem]);
}, 1);

export let configSet:Command = new Command("config", (client: Client, message: Message):Promise<Message> => {
    let configItem:string = util.getArgAtPosition(message.content, 0);
    let newValueString:string = util.getArgAtPosition(message.content, 1);

    let item = getConfig()[configItem];

    let typed:typeof item = <typeof item> newValueString;

    if (!getConfig().hasOwnProperty(configItem)) return message.edit("invalid config item");
    else {
        if (util.updateConfig(configItem, typed)) {
            return message.edit("Successfully updated")
        }
        return message.edit("Failed to update config");
    }
}, 2);