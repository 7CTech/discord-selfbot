import {Message} from "discord.js";
const globals = require("./global.js");

function strIncludes(str: string, includes: string[]) {
    for (let include in includes) {
        if (str.indexOf(include) != -1) return true;
    }
    return false;
}

function getCommand(messageContent: string) {
    return messageContent.split(" ")[0].substr(globals.config.prefix.length);
}

function validateArgs(messageContent: string, argCount: number) {
    return messageContent.split(" ").length - 1 === argCount;
}