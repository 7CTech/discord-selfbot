const globals = require("./global.js");
export function strIncludes(str, includes) {
    for (let include in includes) {
        if (str.includes(include))
            return true;
    }
    return false;
}
export function getCommand(messageContent) {
    return messageContent.split(" ")[0].substr(globals.config.prefix.length);
}
export function validateArgs(messageContent, argCount) {
    return messageContent.split(" ").length - 1 === argCount;
}
