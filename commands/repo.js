const Command = require("../command").Command;
const util = require("../util");

const { spawn } = require("child_process");

require("path");

const sshToHttpsGitURL = (url) => {
    if (!url.includes("@")) return url;

};

let repo = new Command("repo", (client, message) => {
    util.validateArgs(message.content, this.argCount);
    const defaults = {
        cwd: __dirname,
        env: process.env
    };
    let origin = sshToHttpsGitURL(spawn("git", ["remote", "get-url", "origin"], )); //TODO: Figure out cwd code
    if (message.content.includes("@")) message.edit(sshToHttpsGitURL());
}, 0);