import {Command} from "../command"
import {Client, Message} from "discord.js";

export let kill:Command = new Command("kill", (client: Client, message: Message):Promise<Message> => {
    setTimeout(client.destroy, 5 * 1000);
    return message.edit("killing bot in 5 seconds...");
}, 0);