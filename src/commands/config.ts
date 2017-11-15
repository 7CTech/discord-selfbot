import {Command} from "../command";
import {Client, Message} from "discord.js";
import {getConfig} from "../globals";
import * as util from "../util"

let configGet:Command = new Command("config", (client: Client, message: Message) => {
    message.edit(getConfig()[util.getArgAtPosition(1)])
}, 1);

let configSet:Command = new Command("config", (client: Client, message: Message) => {

}, 2);