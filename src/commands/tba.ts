import {getTBAToken, getMapsKey, getConfig} from "../globals";
import {Command} from "../command";
import {Client, Message, RichEmbed} from "discord.js"
import * as util from "../util"
import * as request from  "request";
import * as moment from "moment-timezone";
import * as googleMaps from "@google/maps"

interface Team {
    "address": string,
    "city": string,
    "country": string,
    "gmaps_place_id"?: string,
    "gmaps_url"?: string,
    "home_championship"?: {
        "2017": string,
        "2018": string
    },
    "key": string,
    "lat"?: string,
    "lng"?: string,
    "location_name"?: string,
    "motto"?: string,
    "name": string,
    "nickname": string,
    "postal_code": string,
    "rookie_year": number,
    "state_prov": string,
    "team_number": number,
    "website"?: string
    "Errors"?: {
        "team_id"?: string
    }[]
}

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

export let time:Command = new Command("time", async (client: Client, message: Message):Promise<Message> => {
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
        return reason;
    });
    if (teamError) return message.edit(location);

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
    return message.edit(momentTz.format("HH:mm") + " (" + momentTz.format('Z') + ")");
}, 1);

export let tba:Command = new Command("tba", async (client: Client, message: Message):Promise<Message> => {
    let team:string = util.getArgAtPosition(message.content, 0);
    let teamError:boolean = false;

    let teamData:Team = await new Promise<Team>((resolve, reject) => {
        request("https://thebluealliance.com/api/v3/team/frc" + team + "?X-TBA-Auth-Key=" + getTBAToken())
            .on("data", (async data => {
                console.log(data.toString());
                let teamData: Team = JSON.parse(data.toString());
                if (teamData.hasOwnProperty("Errors")) reject(teamData);
                resolve(teamData);
            }));
    }).catch<Team>((reason:Team):Team => {
        teamError = true;
        return reason;
    });
    if (teamError) return message.edit(teamData.Errors[0].team_id);

    return message.edit("",
        new RichEmbed()
            .setColor(getConfig().tbaEmbedHex)
            .setTitle("TBA info for " + team)
            .setURL("https://www.thebluealliance.com/team/" + team)
            .addField("Name", teamData.nickname)
            .addField("country", teamData.country)
            .addField("city", teamData.city)
            .addField("Sponsors", teamData.name)
    );

}, 1);