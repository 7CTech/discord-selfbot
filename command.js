class Command {
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
        return this._func(client, message);
    }
}

module.exports.Command = Command;