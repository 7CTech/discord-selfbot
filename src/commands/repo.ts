import {Command} from "../command"
import {Client, Message} from "discord.js"
import * as util from "../util"

import {ChildProcess, spawn, SpawnOptions} from "child_process"
import * as path from "path";
import {isArray} from "util";

function sshToHttpsGitURL(url: string) {
    if (!url.includes("@") && !url.includes(":")) return false;
    return "http://" + url.replace(":", "/").substr(url.indexOf("@"));
}

let repo:Command = new Command("repo", async (client: Client, message: Message) => {
    let newMsg: Message | Message[] = await message.reply(message.content); //TODO: REMOVE THIS WHEN SELFBOTTING

    if (!newMsg || isArray(newMsg)) return;

    util.validateArgs(message.content, this._argCount);

    const options:SpawnOptions = {
        cwd: __dirname,
        env: process.env
    };
    let origin = "";

    let gitOutput:ChildProcess = spawn("git", ["remote", "get-url", "origin"], options);

    gitOutput.stdout.on("data", (data: string) => {
        console.log("gitOutput (stdout): " + data);
        origin = data;
    });

    gitOutput.stderr.on("data", (data: string) => {
        console.log("gitOutput (stderr): " + data);
    });

    gitOutput.on("close", (code: number) => {
        console.log("gitOutput: closed with code " + code);
    });

    if (origin === "") {
        console.log("no repo");
        newMsg.edit("Unknown repo");
    } else if (origin.includes("@")) newMsg.edit(sshToHttpsGitURL(origin));
    else newMsg.edit(origin);
}, 0);