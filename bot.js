const Discord = require("discord.js");
const client = new Discord.Client({
    sync: true
});
const fs = require("fs");
const native_module = require("./build/Release/native_module");
let config = require("./config.json");

let mentionStrings = require("./mention-strings.json");
let secrets = require("./secrets.json");

let util = require("./util.js");


let oldGame;

let gameToSongInterval;

client.on("ready", () => {
    console.log("ready");
    client.user.setGame("game");
    oldGame = client.user.presence.game.name;
    gameToSongInterval = setInterval(setGameToSong, 10*1000);
});

client.on("message", (message) => {
    if (message.author.id !== client.user.id) return;
    console.log(message.content);
    if (util.strIncludes(message.content, mentionStrings.strings)) {
        //TODO: PING
    }
    if (message.content === "songGame") {
        setGameToSong();
        message.delete();
    }
});

client.on("disconnect", () => {
    clearInterval(gameToSongInterval);
    oldGame = "";
});

let setGameToSong = () => {
    let song = native_module.getCurrentlyPlaying();
    client.user.setGame(song);
    if (client.user.presence.game.name !== oldGame) {
        console.log("new song: " + song);
    }
    oldGame = song;
};

client.login(secrets.token);
