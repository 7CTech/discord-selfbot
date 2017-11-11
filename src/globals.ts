interface Config {
    prefix: string;
    commands: string[];
}

let config: Config;

namespace globals {
    config = require("../config.json");
    export function getConfig() {
        return config;
    }
}