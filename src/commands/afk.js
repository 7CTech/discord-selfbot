const Command = require("../../old-js/command.js").Command;
const util = require("../../old-js/util.js");

const argCount = 1;

let afk = new Command("afk", (client, message) => {
    util.validateArgs(message.content, argCount);
}, argCount);