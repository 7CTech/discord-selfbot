import {Command} from "../command"
import {Client, Message, TextChannel, DMChannel, GroupDMChannel, MessageCollectorOptions, Collection, MessageCollector, Snowflake} from "discord.js"
import * as util from "../util";
import {getConfig} from "../globals";
import {isArray} from "util";

export let purge:Command = new Command("purge", async (client: Client, message: Message):Promise<Message> => {
    const channel: TextChannel | DMChannel | GroupDMChannel = message.channel;
    let max:number = parseInt(util.getArgAtPosition(message.content, 0)) + 1;
    if (isNaN(max)) {
        return message.edit("Invalid message count to delete");
    }

    let deletedCount:number = 0;
    let messages:Array<Message> = (await channel.fetchMessages({limit: getConfig().purgeLimit + 1})).array();
    let lastMessage:Message = messages[messages.length];
    for (let i:number = 1; i < messages.length; i++) {
        let m:Message = messages[i];
        if (m.author.id === client.user.id) {
            await m.delete();
            deletedCount += 1;
        } if (deletedCount === max || m === lastMessage) {
            return message.edit("Deleted " + deletedCount + " messages");
        }
    }
}, 1);
