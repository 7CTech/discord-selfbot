//////////////////////////////////////////////////////////////////////
/*Node*/
import Timer = NodeJS.Timer;

/*Discord*/
import {Client, Message} from "discord.js";

/*Globals*/
import {getConfig} from "./globals";

/*Native*/
import * as NativeModule from "./native_module"

/*Other*/
import {Command} from "./command";
import * as util from "./util";
///////////////////////////////////////////////////////////////////////

const client: Client = new Client({sync: true});


let commands: Map<string, Array<Command>> = new Map<string, Array<Command>>();

import {kill} from "./commands/kill";
//import {prefix} from "./commands/prefix";
import {purge} from "./commands/purge";
import {repo} from "./commands/repo";
import {time, tba} from "./commands/tba";
import {configSet, configGet} from "./commands/config"


let commandsArray:Command[] = [kill, purge, repo, time, tba, configGet, configSet];

commandsArray.forEach((c: Command) => {
    if (getConfig().commands.indexOf(c.name) == -1) return;
    if (commands.has(c.name)) commands.set(c.name, commands.get(c.name).concat([c]));
    else commands.set(c.name, [c]);
});


let oldGame: string;
let gameToSongInterval: Timer;

client.on("ready", () => {
    console.log("logged in as " + client.user.username + "#" + client.user.discriminator);
    client.user.presence.game !== null ? oldGame = client.user.presence.game.name : oldGame = "";
    gameToSongInterval = setInterval(setGameToSong, 10*1000);
    console.log("prefix: " + getConfig().prefix);
});

client.on("message", async (message) => {
    if (message.author.id !== client.user.id) return;
    console.log(message.content);


    if (message.content.startsWith(getConfig().deletePrefix) &&
        commands.has(util.getCommand(message.content, getConfig().deletePrefix))) {
        commands.get(util.getCommand(message.content, getConfig().deletePrefix)).forEach(async (c:Command) => {
            if (c.argCount === util.getArgCount(message.content)) {
                util.logCommand(message);
                await c.run(client, message).then((m:Message) => {
                    setTimeout(m.delete, getConfig().deleteTimeS);
                }).then(() => c.afterRun(client, message));
            }
        })
    }

    if (message.content.startsWith(getConfig().prefix) &&
        commands.has(util.getCommand(message.content, getConfig().prefix))) {
        commands.get(util.getCommand(message.content, getConfig().prefix)).forEach(async (c:Command) => {
            if (c.argCount === util.getArgCount(message.content)) {
                util.logCommand(message);
                await c.run(client, message).then(() => c.afterRun(client, message));
            }
        });
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