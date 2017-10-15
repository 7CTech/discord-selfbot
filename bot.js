/*jshint esversion: 6*/

const Discord = require("discord.js");
const client = new Discord.Client();

var mentionStrings = require("./mention-strings.json");
var secrets = require("./secrets.json");

var util = require("./util.js");

client.on("ready", () => {
    console.log("ready");
});

client.on("messsage", message => {
    if (util.strIncludes(message, mentionStrings.strings)) {
        //TODO: PING
    }
});

client.login(secrets.token);
