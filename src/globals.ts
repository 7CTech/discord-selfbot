interface GlobalConfig {
    prefix: string;
    commands: string[];
    logDir: string;
}

let globalConfig: GlobalConfig = require("../config.json");

export function getConfig() {
    return globalConfig;
}