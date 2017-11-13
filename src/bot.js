"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Discord
const discord_js_1 = require("discord.js");
const globals_1 = require("./globals");
//Globals
//import getConfig = globals.getConfig;
//globals.config = require("../config.json");
//Native
const NativeModule = require("./native_module");
const util = require("./util");
///////////////////////////////////////////////////////////////////////
const client = new discord_js_1.Client({ sync: true });
let commands = new Map();
globals_1.getConfig().commands.forEach((c) => {
    let command = require("./commands/" + c);
    commands.set(command.name, command.run);
});
let oldGame;
let gameToSongInterval;
client.on("ready", () => {
    console.log("logged in as " + client.user.username + "#" + client.user.discriminator);
    client.user.presence.game !== null ? oldGame = client.user.presence.game.name : oldGame = "";
    gameToSongInterval = setInterval(setGameToSong, 10 * 1000);
});
client.on("message", (message) => {
    if (message.author.id !== client.user.id)
        return;
    console.log(message.content);
    if (message.content.startsWith(globals_1.getConfig().prefix) && commands.has(util.getCommand(message.content))) {
        commands.get(util.getCommand(message.content))(client, message);
    }
});
client.on("disconnect", () => {
    clearInterval(gameToSongInterval);
    process.exit(0);
});
let setGameToSong = () => {
    let song = NativeModule.getCurrentlyPlaying();
    if (song !== oldGame) {
        console.log("new song: " + song);
        client.user.setGame(song);
        oldGame = song;
    }
};
client.login(require("../secrets.json").token);
