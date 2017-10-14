/*jshint esversion: 6 */

const Discord = require("discord.js");
const client = new Discord.Client();

var login = require("./login.js");

client.on("ready", () => {
    console.log("ready");
});

login.login(client);
