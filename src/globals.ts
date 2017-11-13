interface GlobalConfig {
    prefix: string;
    commands: string[];
}

let globalConfig: GlobalConfig = require("../config.json");

export function getConfig() {
    return globalConfig;
}