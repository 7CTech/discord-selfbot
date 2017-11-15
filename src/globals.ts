interface GlobalConfig {
    prefix: string;
    commands: string[];
    logDir: string;
}

let globalConfig: GlobalConfig = require("../config.json");
let tbaToken:string = require("../secrets.json").tba_token;

export function getConfig(): GlobalConfig {
    return globalConfig;
}

export function getTBAToken(): string {
    return tbaToken;
}