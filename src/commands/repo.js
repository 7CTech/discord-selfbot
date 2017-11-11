var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Command } from "../command";
import { spawn } from "child_process";
function sshToHttpsGitURL(url) {
    if (!url.includes("@") && !url.includes(":"))
        return false;
    return "http://" + url.replace(":", "/").substr(url.indexOf("@"));
}
let repo = new Command("repo", (client, message) => __awaiter(this, void 0, void 0, function* () {
    const options = {
        cwd: __dirname,
        env: process.env
    };
    let origin = "";
    let gitOutput = spawn("git", ["remote", "get-url", "origin"], options);
    gitOutput.stdout.on("data", (data) => {
        console.log("gitOutput (stdout): " + data);
        origin = data;
    });
    gitOutput.stderr.on("data", (data) => {
        console.log("gitOutput (stderr): " + data);
    });
    gitOutput.on("close", (code) => {
        console.log("gitOutput: closed with code " + code);
    });
    if (origin === "") {
        console.log("no repo");
        message.edit("Unknown repo");
    }
    else if (origin.includes("@"))
        message.edit(sshToHttpsGitURL(origin));
    else
        message.edit(origin);
}), 0);
