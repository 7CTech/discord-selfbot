import {Message} from "discord.js";
import {getConfig} from "./globals";

import * as fs from "fs";

export function strIncludes(str: string, includes: string[]) {
    for (let include in includes) {
        if (str.includes(include)) return true;
    }
    return false;
}

export function getCommand(messageContent: string) {
    return messageContent.split(" ")[0].substr(getConfig().prefix.length);
}

export function validateArgs(messageContent: string, argCount: number) {
    return messageContent.split(" ").length - 1 === argCount;
}

export function getArgAtPosition(messageContent: string, argPos: number) {
    const split:Array<string> = messageContent.split(" ");
    return (split.length <= argPos)  ? "" :  split[argPos];
}

export function logCommand(message: Message) {
    let logLine:string = "";

    logLine.concat("[");
    logLine.concat(message.createdAt.toLocaleTimeString());
    logLine.concat("] ");

    logLine.concat(message.content);

    logLine.concat(" | ");
    logLine.concat(message.author.id);
    logLine.concat(" (");
    logLine.concat(message.author.username);
    logLine.concat(")");

    //fs.mkdir("~/.selfbot-logs", 755, (() => {}));

    fs.appendFile(getConfig().logDir + "/" + message.createdAt.toLocaleDateString(), logLine, {mode: 644}, (() => {}))

}