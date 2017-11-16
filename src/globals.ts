export interface GlobalConfig {
    prefix: string;
    deletePrefix: string;
    commands: string[];
    logDir: string;
    purgeLimit: number;
    deleteTimeS: number;
}

let globalConfig: GlobalConfig = require("../config.json");
let tbaToken:string = require("../secrets.json").tba_token;
let googleMapsKey:string = require("../secrets.json").maps_api_key;

export function getConfig(): GlobalConfig {
    return globalConfig;
}

export function getTBAToken(): string {
    return tbaToken;
}

export function getMapsKey(): string {
    return googleMapsKey;
}