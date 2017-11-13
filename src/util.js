"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("./globals");
function strIncludes(str, includes) {
    for (let include in includes) {
        if (str.includes(include))
            return true;
    }
    return false;
}
exports.strIncludes = strIncludes;
function getCommand(messageContent) {
    return messageContent.split(" ")[0].substr(globals_1.getConfig().prefix.length);
}
exports.getCommand = getCommand;
function validateArgs(messageContent, argCount) {
    return messageContent.split(" ").length - 1 === argCount;
}
exports.validateArgs = validateArgs;
function getArgAtPosition(messageContent, argPos) {
    const split = messageContent.split(" ");
    return (split.length <= argPos) ? "" : split[argPos];
}
exports.getArgAtPosition = getArgAtPosition;
