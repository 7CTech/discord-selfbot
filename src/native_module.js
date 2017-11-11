const native_module = require("../build/Release/native_module");
export function getCurrentlyPlaying() {
    return native_module.getCurrentlyPlaying();
}
