import {Message} from "discord.js";
import {globals} from "./globals";

export function strIncludes(str: string, includes: string[]) {
    for (let include in includes) {
        if (str.includes(include)) return true;
    }
    return false;
}

export function getCommand(messageContent: string) {
    return messageContent.split(" ")[0].substr(globals.config.prefix.length);
}

export function validateArgs(messageContent: string, argCount: number) {
    return messageContent.split(" ").length - 1 === argCount;
}