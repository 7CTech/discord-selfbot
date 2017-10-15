/*jshint esversion: 6*/

const Discord = require("discord.js");
const client = new Discord.Client();

var login = require("./login.js");
var util = require("./util.js");

client.on("ready", () => {
    console.log("ready");
});

client.on("messsage", message => {
    if (util.strIncludes(message, null/*TODO: FIND HOW TO JSON*/)) {
        
    }
});

login.login(client);
