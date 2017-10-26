const moment = require("moment-timezone");
let printf = require("printf");

const global = require("../src/global.js");


const args = process.argv.slice(2);
if (args.length > 2) printf("%s\n", "too many args");

if (args[1] === "team") {
    get("http://www.thebluealliance.com/api/v3/team/frc" + args[2] + "?X-TBA-Auth-Key=" + global.secrets.tba_token);
}

