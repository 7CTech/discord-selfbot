var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as util from "./util";
export class Command {
    constructor(name, func, argCount) {
        this._name = name;
        this._func = func;
        this._argCount = argCount;
    }
    get name() {
        return this._name;
    }
    get argCount() {
        return this._argCount;
    }
    run(client, message) {
        return __awaiter(this, void 0, void 0, function* () {
            util.validateArgs(message.content, this.argCount);
            return this._func(client, message);
        });
    }
}
