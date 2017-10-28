import * as util from "../util.js";
import { Command } from "../command";
export let kill = new Command("kill", (client, message) => {
    util.validateArgs(message.content, this._argCount);
    message.delete();
    client.destroy();
}, 0);
