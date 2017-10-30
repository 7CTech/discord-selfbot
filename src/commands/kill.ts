import * as util from "../util.js"
import {Command} from "../command"
import {Client, Message} from "discord.js"

export let kill:Command = new Command("kill", (client: Client, message: Message) => {
    message.delete();
    client.destroy();
}, 0);