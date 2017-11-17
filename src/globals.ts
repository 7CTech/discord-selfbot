import * as util from "./util"

export interface GlobalConfig {
    prefix: string;
    deletePrefix: string;
    commands: string[];
    logDir: string;
    purgeLimit: number;
    deleteTimeS: number;
    tbaEmbedHex: string;
}

let globalConfig: GlobalConfig = require("../config.json");
let tbaToken:string = require("../secrets.json").tba_token;
let googleMapsKey:string = require("../secrets.json").maps_api_key;

/*if (globalConfig.tbaEmbedHex.startsWith("#")) util.updateConfig("tbaEmbedHex", "#" + globalConfig.tbaEmbedHex);

if (!/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(globalConfig.tbaEmbedHex)) {
    console.warn("Invalid tba hex, please fix. Internally using the default of #3F51B5");
    globalConfig.tbaEmbedHex = "#3F51B5";
}*/

export function getConfig(): GlobalConfig {
    return globalConfig;
}

export function getTBAToken(): string {
    return tbaToken;
}

export function getMapsKey(): string {
    return googleMapsKey;
}