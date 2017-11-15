import {getTBAToken, getMapsKey} from "../globals";
import {Command} from "../command";
import {Client, Message} from "discord.js"
import * as util from "../util"
import * as request from  "request";
import {team} from "../team";
import * as moment from "moment-timezone";
import * as googleMaps from "@google/maps"

interface ClientResponse {
    headers: Object,
    json: Object,
    status: number
}

export let time:Command = new Command("time", async (client: Client, message: Message) => {
    let team:string = util.getArgAtPosition(message.content, 0);

    let maps = googleMaps.createClient({
        key: getMapsKey(),
        Promise: Promise
    });


    let location: string = "";


    await request("https://thebluealliance.com/api/v3/team/frc" + team + "?X-TBA-Auth-Key=" + getTBAToken())
        .on("data", (data => {
            let teamData:team = JSON.parse(data.toString());
            location = teamData.country + "/" + teamData.city;
        }));
    if (location === "") {
        message.edit("Invalid TBA location data");
        return;
    }
    maps.geocode({address: location}, (error: any, response: ClientResponse) => {

    });
}, 1);