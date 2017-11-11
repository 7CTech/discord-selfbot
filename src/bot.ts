///<reference path="globals.ts"/>
//////////////////////////////////////////////////////////////////////
//Node
import Timer = NodeJS.Timer;

//Discord
import {Client, Message} from "discord.js";

//Globals
import getConfig = globals.getConfig;

//Native
import * as NativeModule from "./native_module"

//Other
import {Command} from "./command";
import * as util from "./util";

///////////////////////////////////////////////////////////////////////

const client: Client = new Client({sync: true});


let commands: Map<string, (Client, Message) => void> = new Map<string, (Client, Message) => void>();

getConfig().commands.forEach((c) => {
    let command: Command = require("./commands/" + c);
    commands.set(command.name, command.run);
});

let oldGame: string;
let gameToSongInterval: Timer;

client.on("ready", () => {
    console.log("logged in as " + client.user.username + "#" + client.user.discriminator);
    client.user.presence.game !== null ? oldGame = client.user.presence.game.name : oldGame = "";
    gameToSongInterval = setInterval(setGameToSong, 10*1000);
});

client.on("message", (message) => {
    if (message.author.id !== client.user.id) return;
    console.log(message.content);
    if (message.content.startsWith(getConfig().prefix) && commands.has(util.getCommand(message.content))) {
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