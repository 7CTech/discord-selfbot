const Command = require("../command").Command;

let kill = new Command("kill", (client, message) => {
    message.delete();
    client.destroy();
}, 0);

module.exports = kill;