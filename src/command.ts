import {Message, Client} from "discord.js";

export class Command {
    _name: string;
    _func: (client: Client, message: Message) => void;
    _argCount: number;
    constructor(name: string, func: (client: Client, message: Message) => void, argCount: number) {
        this._name = name;
        this._func = func;
        this._argCount = argCount;
    }

    get name():string {
        return this._name;
    }

    get argCount():number {
        return this._argCount;
    }

    async run(client: Client, message: Message) {
        return this._func(client, message);
    }
}