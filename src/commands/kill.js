import { Command } from "../command";
export let kill = new Command("kill", (client, message) => {
    message.delete();
    client.destroy();
}, 0);
