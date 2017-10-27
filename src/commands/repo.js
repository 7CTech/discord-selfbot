const Command = require("../command").Command;
const util = require("../util");

const { spawn } = require("child_process");

require("path");

const sshToHttpsGitURL = (url) => {
    if (!url.includes("@")) return url;
    return url.replace(":", "/").substr(url.find("@"));
};

let repo = new Command("repo", (client, message) => {
    let newMsg = message.reply(message.content); //TODO: REMOVE THIS WHEN SELFBOTTING
    util.validateArgs(message.content, argCount);
    const options = {
        cwd: __dirname,
        env: process.env
    };
    let origin;

    sshToHttpsGitURL(spawn("git", ["remote", "get-url", "origin"], options, (error, stdout, stderr) => {
        if (error) throw error;
        origin = stdout;
    })); //TODO: Figure out cwd code
    if (message.content.includes("@")) newMsg.edit(sshToHttpsGitURL());
    else newMsg.edit(origin);
}, 0);