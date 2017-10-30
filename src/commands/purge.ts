import {Command} from "../command"
import {Client, Message, TextChannel, DMChannel, GroupDMChannel, MessageCollectorOptions, Collection, MessageCollector, Snowflake} from "discord.js"
import * as util from "../util";

let purge:Command = new Command("purge", (client: Client, message: Message) => {
    const channel: TextChannel | DMChannel | GroupDMChannel = message.channel;

    let options: MessageCollectorOptions = {
        max: parseInt(util.getArgAtPosition(message.content, 1)),
        maxMatches: parseInt(util.getArgAtPosition(message.content, 1))
    };

    const collector = channel.createMessageCollector((m: Message) => m.author.id === client.user.id, options);

    collector.on("end", (collected: Collection<Snowflake, Message>, reason: string) => {
        collected.array().forEach((item: Message) => {
            item.delete();
        })
    })
}, 1);
