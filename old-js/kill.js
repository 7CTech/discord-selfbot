const Command = require("./command.js").Command;

let kill = new Command("kill", (client, message) => {
    message.delete();
    client.destroy();
}, 0);

module.exports = kill;