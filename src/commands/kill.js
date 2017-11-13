"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("../command");
exports.kill = new command_1.Command("kill", (client, message) => {
    message.delete();
    client.destroy();
}, 0);
