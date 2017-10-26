class Command {
    constructor(name, func, argCount) {
        this.name = name;
        this.func = func;
        this.argCount = argCount;
    }

    get name() {
        return this.name;
    }

    get argCount() {
        return this.argCount;
    }

    run(client, message) {
        return this.func(client, message);
    }
}

module.exports.Command = Command;