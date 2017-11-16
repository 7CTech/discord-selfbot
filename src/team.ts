export interface Team {
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