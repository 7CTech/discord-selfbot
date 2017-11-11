import { Command } from "../command";
import * as util from "../util";
let purge = new Command("purge", (client, message) => {
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
