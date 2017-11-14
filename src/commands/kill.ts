import * as util from "../util.js"
import {Command} from "../command"
import {Client, Message} from "discord.js";

export let kill:Command = new Command("kill", (client: Client, message: Message) => {
    message.delete();
    setTimeout(client.destroy, 3*1000);
}, 0);