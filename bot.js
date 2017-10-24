/*Discord JS*/
const Discord = require("discord.js");
const client = new Discord.Client({
    sync: true
});

/*Native*/
const native_module = require("./build/Release/native_module");

/*Local files*/
let config = require("./config.json");
const global = require("./global.js");
const mentionStrings = require("./mention-strings.json");
const secrets = require("./secrets.json");
global.config = config;

let commands = new Map();

config.commands.forEach(c => {
    let command = require("./commands/" + c + ".js");
    commands.set(command.name, command.run);
});

/*Local files with code*/
let util = require("./util.js");

/*Globals*/
let oldGame;
let gameToSongInterval;

client.on("ready", () => {
    console.log("ready");
    client.user.presence.game !== null ? oldGame = client.user.presence.game.name : oldGame = "";
    gameToSongInterval = setInterval(setGameToSong, 10*1000);
});

client.on("message", (message) => {
    if (message.author.id !== client.user.id && message.author.id !== secrets.id) return;
    console.log(message.content);
    if (util.strIncludes(message.content, mentionStrings.strings)) {
        //TODO: PING
    }
    if (message.content.startsWith(config.prefix) && commands.has(util.getCommand(message.content))) {
        commands.get(util.getCommand(message.content))(client, message);
    }
});

client.on("disconnect", () => {
    clearInterval(gameToSongInterval);
    process.exit(0);
});

let setGameToSong = () => {
    let song = native_module.getCurrentlyPlaying();
    if (song !== oldGame) {
        console.log("new song: " + song);
        client.user.setGame(song);
        oldGame = song;
    }
};

client.login(secrets.token);