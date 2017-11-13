"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const native_module = require("../build/Release/native_module");
function getCurrentlyPlaying() {
    return native_module.getCurrentlyPlaying();
}
exports.getCurrentlyPlaying = getCurrentlyPlaying;
