import {Command} from "../command";
import {Client, Message} from "discord.js";
import {getConfig, GlobalConfig} from "../globals";
import * as util from "../util"

/*export let configList:Command = new Command("config", async (client: Client, message: Message):Promise<Message> => {

}, 0);*/

export let configGet:Command = new Command("config", async (client: Client, message: Message):Promise<Message> => {
    let configItem:string = util.getArgAtPosition(message.content, 0);
    if (!getConfig().hasOwnProperty(configItem)) return message.edit("invalid config item");
    return message.edit(getConfig()[configItem]);
}, 1);

export let configSet:Command = new Command("config", async (client: Client, message: Message):Promise<Message> => {
    let configItem:string = util.getArgAtPosition(message.content, 0);
    if (!getConfig().hasOwnProperty(configItem)) return message.edit("invalid config item");
    let newValue:string = util.getArgAtPosition(message.content, 1);
    let typedNewValue:any;
    try {
        typedNewValue = JSON.parse(newValue);
    } catch (parseError) {
        typedNewValue = newValue; //Now its a gonna be a string
    }

    if (typeof typedNewValue !== typeof getConfig()[configItem]) return message.edit(
        "Type of new value differs from expected. Expected '" +
        typeof getConfig()[configItem] + "' got '" +
        typeof typedNewValue + "'"
    );

    if (util.updateConfig(configItem, typedNewValue)) return message.edit(
        "Successfully updated '" + configItem + "' to '" + newValue + "'"
    );
    return message.edit("Failed to update config");
}, 2);