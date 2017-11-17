import {Command} from "../command"
import {Client, Message} from "discord.js";

export let kill:Command = new Command("kill", async (client: Client, message: Message):Promise<Message> => {
    return message.edit("killing bot in 5 seconds...");
}, 0, (client: Client, message: Message) => client.destroy());