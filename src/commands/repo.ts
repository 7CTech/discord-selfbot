import {Command} from "../command"
import {Client, Message} from "discord.js"
import * as util from "../util"

import {ChildProcess, spawn, SpawnOptions} from "child_process"
import * as path from "path";

function sshToHttpsGitURL(url: string) {
    if (!url.includes("@") && !url.includes(":")) return false;
    return "http://" + url.replace(":", "/").substr(url.indexOf("@"));
}

let repo:Command = new Command("repo", async (client: Client, message: Message) => {
    let newMsg: Message = await message.reply(message.content).then((value: Message) => {
        newMsg = value
    }); //TODO: REMOVE THIS WHEN SELFBOTTING
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
        console.log("gitOuput: closed with code " + code);
    });

    if (origin === "") {
        console.log("no repo");
        newMsg.edit("Unknown repo");
    } else if (origin.includes("@")) newMsg.edit(sshToHttpsGitURL(origin));
    else newMsg.edit(origin);
}, 0);