import {Message, Client} from "discord.js";
import {getConfig, GlobalConfig} from "./globals";

import * as fs from "fs";
import * as mkdirp from "mkdirp"

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

export function incorrectArgCount(client: Client, message: Message, currentArgCount: number, expectedArgCount: number):Promise<Message> {
    return message.edit("Incorrect arg count. Expected " + expectedArgCount + ", got " + currentArgCount);
}

export function logCommand(message: Message):void {
    /*let logLine:string = "";

    logLine.concat("[");
    logLine.concat(message.createdAt.toLocaleTimeString());
    logLine.concat("] ");

    logLine.concat(message.content);

    logLine.concat(" | ");
    logLine.concat(message.author.id);
    logLine.concat(" (");
    logLine.concat(message.author.username);
    logLine.concat(")");

    mkdirp.sync("~/.selfbot-logs", 755);

    fs.appendFile(getConfig().logDir + "/" + message.createdAt.toLocaleDateString(), logLine, {mode: 644}, (() => {}));*/
}

export function updateConfig(key: string, newValue: any):boolean {
    if (newValue !== <string>getConfig()[key]) {
        getConfig()[key] = newValue;
        fs.writeFile(__dirname + "/../config.json" , JSON.stringify(getConfig(), null, 2), error => {
            if (error) {
                console.log(error);
                return false;
            }
            console.log("writing to config.json");
        });
        return true;
    } else return false;
}