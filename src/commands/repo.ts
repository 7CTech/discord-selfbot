import {Command} from "../command"
import {Client, Message} from "discord.js"

import {ChildProcess, spawn, SpawnOptions} from "child_process"

function sshToHttpsGitURL(url: string) {
    if (!url.includes("@") && !url.includes(":")) return false;
    return "https://".concat(url.toString().replace(":", "/").substr(url.toString().indexOf("@")));
}

export let repo:Command = new Command("repo", async (client: Client, message: Message) => {
    const options:SpawnOptions = {
        cwd: __dirname,
        env: process.env
    };

    let gitOutput:string = await new Promise<string>(((resolve, reject) => {
        spawn("git", ["remote", "get-url", "origin"], options).stdout.on("data", (data: string) => {
            resolve(data);
        }).on("error", (err:Error) => {
            reject(err.message);
        });
    }));

    if (gitOutput.includes("@") && gitOutput.includes(":")) message.edit(sshToHttpsGitURL(gitOutput));
    else message.edit(gitOutput);
}, 0);