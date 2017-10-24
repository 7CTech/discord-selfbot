const Command = require("../command.js").Command;
const util = require("../util.js");

const argCount = 1;

let afk = new Command("afk", (client, message) => {
    util.validateArgs(message.content, argCount);
}, argCount);