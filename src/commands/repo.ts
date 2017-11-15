import {Command} from "../command"
import {Client, Message} from "discord.js"

import {ChildProcess, spawn, SpawnOptions} from "child_process"

function sshToHttpsGitURL(url: string) {
    if (!url.includes("@") && !url.includes(":")) return false;
    return "http://" + url.replace(":", "/").substr(url.indexOf("@"));
}

export let repo:Command = new Command("repo", (client: Client, message: Message) => {
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
        message.edit("Unknown repo").then(m => setTimeout(m.delete, 3 * 1000));
    } else if (origin.includes("@")) message.edit(sshToHttpsGitURL(origin));
    else message.edit(origin);
}, 0);