const Discord = require("discord.js");
const client = new Discord.Client();
const native_module = require("./build/Release/native_module");
const spawn = require("threads").spawn;
const sleep = require("sleep");

let mentionStrings = require("./mention-strings.json");
let secrets = require("./secrets.json");

let util = require("./util.js");

let checkSong = true;


client.on("ready", () => {
    console.log("ready");
    setInterval(setGameToSong, 5*1000);
});

client.on("messsage", message => {
    if (util.strIncludes(message, mentionStrings.strings)) {
        //TODO: PING
    }
    if (message.user.id === secrets.id && message === "songGame") {
        setGameToSong();
        message.delete();
    }
});

client.on("disconnect", () => {
    checkSong = false;
});

let setGameToSong = () => {
    console.log("checking song");
    let song = native_module.getCurrentlyPlaying();
    client.user.setGame(song);
};

client.login(secrets.token);
