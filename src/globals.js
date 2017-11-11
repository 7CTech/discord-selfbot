let config;
var globals;
(function (globals) {
    config = require("../config.json");
    function getConfig() {
        return config;
    }
    globals.getConfig = getConfig;
})(globals || (globals = {}));
