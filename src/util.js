var getConfig = globals.getConfig;
export function strIncludes(str, includes) {
    for (let include in includes) {
        if (str.includes(include))
            return true;
    }
    return false;
}
export function getCommand(messageContent) {
    return messageContent.split(" ")[0].substr(getConfig().prefix.length);
}
export function validateArgs(messageContent, argCount) {
    return messageContent.split(" ").length - 1 === argCount;
}
export function getArgAtPosition(messageContent, argPos) {
    const split = messageContent.split(" ");
    return (split.length <= argPos) ? "" : split[argPos];
}
