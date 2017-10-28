import {Command} from "../command"
import {Client, Message, TextChannel, DMChannel, GroupDMChannel} from "discord.js"
import * as util from "../util";

let purge:Command = new Command("purge", (client: Client, message: Message) => {
    util.validateArgs(message.content, 1);

    const channel:TextChannel | DMChannel | GroupDMChannel = message.channel;

    const collector = channel.createMessageCollector((m: Message) => m.author.id === client.user.id, {max: })
}, 1);
