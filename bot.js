const Discord = require("discord.js");
const client = new Discord.Client();

let mentionStrings = require("./mention-strings.json");
let secrets = require("./secrets.json");

let util = require("./util.js");

client.on("ready", () => {
    console.log("ready");
});

client.on("messsage", message => {
    if (util.strIncludes(message, mentionStrings.strings)) {
        //TODO: PING
    }
});

client.login(secrets.token);
