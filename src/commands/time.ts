import {getTBAToken, getMapsKey} from "../globals";
import {Command} from "../command";
import {Client, Message} from "discord.js"
import * as util from "../util"
import * as request from  "request";
import {team} from "../team";
import * as moment from "moment-timezone";
import * as googleMaps from "@google/maps"

interface GeoCodeClientResponse {
    headers: Object,
    json: {
        geometry: {
            location: {
                lat: number,
                lng: number
            }
        }
    },
    status: number
}

interface TimezoneClientResponse {
    headers: Object
    json: {
        dstOffset: number,
        rawOffset: number,
        status: string,
        timeZoneId: string,
        timeZoneName: string
    },
    status: number
}

export let time:Command = new Command("time", async (client: Client, message: Message) => {
    let team:string = util.getArgAtPosition(message.content, 0);

    let maps = googleMaps.createClient({
        key: getMapsKey(),
        Promise: Promise
    });


    let location: string = "";


    request("https://thebluealliance.com/api/v3/team/frc" + team + "?X-TBA-Auth-Key=" + getTBAToken())
        .on("data",  (async data => {
            let teamData:team = JSON.parse(data.toString());
            location = teamData.country + "/" + teamData.city;
            console.log(location);
        }));
    if (location === "") {
        message.edit("Invalid TBA location data");
        return;
    }

    let lng:number = 1000;
    let lat:number = 1000;

    await Promise.all([maps.geocode({address: location}, (error: any, response: GeoCodeClientResponse) => {
        if (!error) {
            lat = response.json.geometry.location.lat;
            lng = response.json.geometry.location.lng;
        } else {
            message.edit("Failed to geocode");
            return;
        }
    })]);

    if (lng === 1000 || lat === 1000) {
        message.edit("Failed to geocode");
        return;
    }

    let tz:string = "";

    maps.timezone({location: [lng, lat]}, (error: any, response: TimezoneClientResponse) => {
        if (!error) tz = response.json.timeZoneId;
        else {
            message.edit("Failed to timezone");
            return;
        }
    });

    if (tz === "") {
        message.edit("Failed to timezone");
        return;
    }

    let momentTz:moment.Moment = moment().tz(tz);

    message.edit(momentTz.format("HH:mm" + " (" + momentTz.format("z") + ")"));
}, 1);