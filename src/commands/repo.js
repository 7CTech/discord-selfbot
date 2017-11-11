import { Command } from "../command";
import { spawn } from "child_process";
function sshToHttpsGitURL(url) {
    if (!url.includes("@") && !url.includes(":"))
        return false;
    return "http://" + url.replace(":", "/").substr(url.indexOf("@"));
}
let repo = new Command("repo", (client, message) => {
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
}, 0);
