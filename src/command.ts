import {Message, Client} from "discord.js";
import * as util from "./util";

export class Command {
    _name: string;
    _func: (client: Client, message: Message) => Promise<Message>;
    _argCount: number;
    _afterRun: (client: Client, message: Message) => void;
    constructor(name: string, func: (client: Client, message: Message) => Promise<Message>, argCount: number, afterRun?: (client: Client, message: Message) => void = () => {}) {
        this._name = name;
        this._func = func;
        this._argCount = argCount;
        if (afterRun) this._afterRun = afterRun;
    }

    get name(): string {
        return this._name;
    }

    get argCount(): number {
        return this._argCount;
    }

    /**
     * Used to execute the function of the bot
     * @param {} client the discord.js client
     * @param {} message the message with the executed command
     * @returns {Promise<>} the FINAL message that is left. The command should leave a message somewhere and return this
     */
    run(client: Client, message: Message):Promise<Message> {
        if (!util.validateArgs(message.content, this._argCount)) return util.incorrectArgCount(client, message, message.content.split(" ").length - 1, this._argCount);
        return this._func(client, message);
    }

    afterRun(client: Client, message: Message):void {
        return this._afterRun(client, message);
    }
}