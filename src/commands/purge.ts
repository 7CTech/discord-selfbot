import {Command} from "../command"
import {Client, Message, TextChannel, DMChannel, GroupDMChannel, MessageCollectorOptions, Collection, MessageCollector, Snowflake} from "discord.js"
import * as util from "../util";

export let purge:Command = new Command("purge", async (client: Client, message: Message) => {
    const channel: TextChannel | DMChannel | GroupDMChannel = message.channel;

    let options: MessageCollectorOptions = {
        maxMatches: parseInt(util.getArgAtPosition(message.content, 0))
    };

    const collector = channel.createMessageCollector((m: Message) => {
        console.log(m.author.id);
        console.log(client.user.id);
        return m.author.id === client.user.id
    }, options);

    await Promise.all([collector.on("end", (collected: Collection<Snowflake, Message>, reason: string) => {
        console.log("end: " + reason);
        collected.array().forEach((item: Message) => {
            console.log("deleting: " + item.content);
            item.delete();
        })
    })]);
}, 1);
