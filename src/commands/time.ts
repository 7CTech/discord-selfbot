import {getTBAToken, getMapsKey} from "../globals";
import {Command} from "../command";
import {Client, Message} from "discord.js"
import * as util from "../util"
import * as request from  "request";
import {Team} from "../team";
import * as moment from "moment-timezone";
import * as googleMaps from "@google/maps"

interface GeoCodeClientResponse {
    headers: Object,
    json: {
        results: {
            geometry: {
                location: {
                    lat: number,
                    lng: number
                }
            }
        }[]
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

    let teamError:boolean = false;

    let location:string = await new Promise<string>((resolve, reject) => {
        request("https://thebluealliance.com/api/v3/team/frc" + team + "?X-TBA-Auth-Key=" + getTBAToken())
            .on("data", (async data => {
                let teamData: Team = JSON.parse(data.toString());
                if (teamData.hasOwnProperty("Errors")) reject("Error: " + teamData.Errors[0].team_id);
                resolve(teamData.country + "/" + teamData.city);
            }));
    }).catch<string>((reason:string):string => {
        teamError = true;
        message.edit(reason);
        return reason;
    });
    if (teamError) return;

    let latLng:number[] = await new Promise<number[]>((resolve, reject) => {
        maps.geocode({address: location}, (error: any, response: GeoCodeClientResponse) => {
            if (!error) {
                resolve([response.json.results[0].geometry.location.lat, response.json.results[0].geometry.location.lng]);
            } else {
                console.log("failed to geocode");
                reject();
            }
        });
    });

    let zoneId: string = await new Promise<string>(((resolve, reject) => {
        maps.timezone({location: [latLng[0], latLng[1]]}, (error: any, response: TimezoneClientResponse) => {
            if (error) reject();
            else resolve(response.json.timeZoneId);
        });
    }));

    let momentTz:moment.Moment = moment().tz(zoneId);
    message.edit(momentTz.format("HH:mm") + " (" + momentTz.format('Z') + ")");
}, 1);
