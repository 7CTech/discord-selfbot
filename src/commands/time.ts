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


    let location:string = await new Promise<string>((resolve, reject) => {
        request("https://thebluealliance.com/api/v3/team/frc" + team + "?X-TBA-Auth-Key=" + getTBAToken())
            .on("data", (async data => {
                let teamData: team = JSON.parse(data.toString());
                resolve(teamData.country + "/" + teamData.city);
            }));
    });

    let latLng:number[] = await new Promise<number[]>((resolve, reject) => {
        maps.geocode({address: location}, async (error: any, response: GeoCodeClientResponse) => {
            if (!error) {
                resolve([response.json.results[0].geometry.location.lat, response.json.results[0].geometry.location.lng]);
            } else {
                console.log("failed to geocode");
                reject();
            }
        });
    });

    let lat:number = latLng[0];
    let lng:number = latLng[1];

    let zoneId: string = await new Promise<string>(((resolve, reject) => {
        maps.timezone({location: [lat, lng]}, (error: any, response: TimezoneClientResponse) => {
            if (error) {
                reject("");
            }
            else {
                resolve(response.json.timeZoneId);
            }
        });
    }));

    let momentTz:moment.Moment = moment().tz(zoneId);

    message.edit(momentTz.format("HH:mm") + " (" + momentTz.format('Z') + ")");
}, 1);