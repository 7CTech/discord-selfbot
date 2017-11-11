const native_module = require("../build/Release/native_module");

export function getCurrentlyPlaying(): string {
    return native_module.getCurrentlyPlaying();
}