import {Command} from "../command"
import {Client, Message} from "discord.js";

export let kill:Command = new Command("kill", (client: Client, message: Message) => {
    message.delete().then(m => client.destroy());
}, 0);