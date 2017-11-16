import * as request from "request-promise-native"
import * as googleMaps from "@google/maps"
import * as moment from "moment-timezone"

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

interface team {
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
}
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


run();

async function run() {
    let location:string = await new Promise<string>((resolve, reject) => {
        request("https://thebluealliance.com/api/v3/team/frc" + "2468" + "?X-TBA-Auth-Key=" + "<TBAKEY>")
            .on("data", (async data => {
                let teamData: team = JSON.parse(data.toString());
                resolve(teamData.country + "/" + teamData.city);
            }));
    });
    console.log(location);

    let maps = googleMaps.createClient({
        key: "<APIKEY>",
        Promise: Promise
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

    console.log("lat: " + lat + ", lng: " + lng);

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

    console.log(zoneId);

    let momentTz:moment.Moment = moment().tz(zoneId);

    console.log(momentTz.format("HH:mm") + " (" + momentTz.format('Z') + ")");

}