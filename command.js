class Command {
    _name;
    _func;
    constructor(name, func) {
        Command.prototype._name = name;
        Command.prototype._func = func;
    }

    get name() {
        return this.constructor._name;
    }

    run(client, message) {
        return this.constructor._func(client, message);
    }
}

module.exports.Command = Command;