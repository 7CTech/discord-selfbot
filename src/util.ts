import {Message, Client} from "discord.js";
import {getConfig} from "./globals";

import * as fs from "fs";

export function strIncludes(str: string, includes: string[]):boolean {
    for (let include in includes) {
        if (str.includes(include)) return true;
    }
    return false;
}

export function getArgCount(messageContent: string): number {
    return messageContent.split(" ").length - 1;
}

export function getCommand(messageContent: string):string {
    return messageContent.split(" ")[0].substr(getConfig().prefix.length);
}

export function validateArgs(messageContent: string, argCount: number):boolean {
    return messageContent.split(" ").length - 1 === argCount;
}

export function getArgAtPosition(messageContent: string, argPos: number):string {
    const split:Array<string> = messageContent.split(" ");
    return (split.length <= argPos)  ? "" :  split[argPos + 1];
}

export function incorrectArgCount(client: Client, message: Message, currentArgCount: number, expectedArgCount: number):void {
    message.edit("Incorrect arg count. Expected " + expectedArgCount + ", got " + currentArgCount).then(m => setTimeout(m.delete, 3 * 1000));
}

export function logCommand(message: Message):void {
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

    if (!fs.existsSync("~/.selfbot-logs")) fs.mkdirSync("~/.selfbot-logs", 755);

    fs.appendFile(getConfig().logDir + "/" + message.createdAt.toLocaleDateString(), logLine, {mode: 644}, (() => {}));
}