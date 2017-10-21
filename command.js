module.exports = {
    command: class {
        _name;
        _func;

        constructor(name, func) {
            this._name = name;
            this._func = func;
        }

        get name() {
            return this._name;
        }

        run(args) {
            return _func(args);
        }
    }
};