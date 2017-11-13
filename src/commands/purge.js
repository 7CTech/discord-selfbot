"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("../command");
const util = require("../util");
let purge = new command_1.Command("purge", (client, message) => {
    const channel = message.channel;
    let options = {
        max: parseInt(util.getArgAtPosition(message.content, 1)),
        maxMatches: parseInt(util.getArgAtPosition(message.content, 1))
    };
    const collector = channel.createMessageCollector((m) => m.author.id === client.user.id, options);
    collector.on("end", (collected, reason) => {
        collected.array().forEach((item) => {
            item.delete();
        });
    });
}, 1);
