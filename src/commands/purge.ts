import {Command} from "../command"
import {Client, Message, TextChannel, DMChannel, GroupDMChannel, MessageCollectorOptions, Collection, MessageCollector, Snowflake} from "discord.js"
import * as util from "../util";
import {getConfig} from "../globals";

export let purge:Command = new Command("purge", async (client: Client, message: Message) => {
    const channel: TextChannel | DMChannel | GroupDMChannel = message.channel;

    let max:number = parseInt(util.getArgAtPosition(message.content, 0)) + 1;

    if (isNaN(max)) {
        message.edit("Invalid message count to delete");
        return;
    }

    let deletedCount:number = -1;

    let messages:Array<Message> = (await channel.fetchMessages({limit: getConfig().purgeLimit})).array();
    let lastMessage:Message = messages[messages.length];
    for (let i:number = 0; i < messages.length; i++) {
        let m:Message = messages[i];
        if (m.author.id === client.user.id) {
            await m.delete();
            deletedCount += 1;
        } if (deletedCount === max || m === lastMessage) {
            channel.send("Deleted " + deletedCount + " messages");
            return;
        }
    }
}, 1);
