const Command = require("../command").Command;
const util = require("../util");
require("path");

const sshToHttpsGitURL = (url) => {
    if (!url.includes("@")) return url;

};

let repo = new Command("repo", (client, message) => {
    util.validateArgs(message.content, this.argCount);
    if (message.content.includes("@"))
}, 0);