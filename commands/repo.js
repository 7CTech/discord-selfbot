const Command = require("../command").Command;
const util = require("../util");
require("path");

const sshToHttpsGitURL = (url) => {
    if (!url.includes("@")) return url;

};

let repo = new Command("repo", (client, message) => {
    util.validateArgs(message.content, this.argCount);
    let origin =
    if (message.content.includes("@")) message.edit(sshToHttpsGitURL());

}, 0);