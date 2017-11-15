import {getTBAToken} from "../globals";
import {Command} from "../command";
import {Client, Message} from "discord.js"
import * as util from "../util"
import * as request from  "request";
import {team} from "../team";
import moment = require("moment");
import {Moment} from "moment";

export let time:Command = new Command("time", (client: Client, message: Message) => {
    let team:string = util.getArgAtPosition(message.content, 0);

    request("https://thebluealliance.com/api/v3/team/frc" + team + "?X-TBA-Auth-Key=" + getTBAToken())
        .on("data", (data => {
            let teamData:team = JSON.parse(data.toString());
            let time: Moment = moment(moment.now()).tz(teamData.country + "/" + teamData.city);
            message.edit(time.format("HH:mm") + " (UTC" + time.format("Z") + ")");
        }));
}, 1);