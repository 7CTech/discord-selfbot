import {Command} from "../command"
import {Client, Message, TextChannel, DMChannel, GroupDMChannel, MessageCollectorOptions, Collection, MessageCollector, Snowflake} from "discord.js"
import * as util from "../util";

export let purge:Command = new Command("purge", (client: Client, message: Message) => {
    console.log("max: " + parseInt(util.getArgAtPosition(message.content, 1)));
    const channel: TextChannel | DMChannel | GroupDMChannel = message.channel;

    let options: MessageCollectorOptions = {
        maxMatches: parseInt(util.getArgAtPosition(message.content, 1))
    };


    const collector = channel.createMessageCollector((m: Message) => {
        console.log(m.author.id);
        console.log(client.user.id);
        return m.author.id === client.user.id
    }, options);

    //console.log(collector.collected);

    /*collector.on("collect", (collect: Message) => {
        console.log("collectd: " + collect.content);
    });*/

    collector.on("end", (collected: Collection<Snowflake, Message>, reason: string) => {
        console.log("end: " + reason);
        collected.array().forEach((item: Message) => {
            console.log("deleting: " + item.content);
            item.delete();
        })
    });

    client.setTimeout(message.delete, 5);
}, 1);
