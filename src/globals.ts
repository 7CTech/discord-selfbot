export interface Secrets {
    token: string;
    id: string;
}

export interface Config {
    prefix: string;
    commands: string[];
}

export let config: Config;