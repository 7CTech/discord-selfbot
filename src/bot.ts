import {Client} from "discord.js"
const client: Client = new Discord.Client({sync: true});

import * as native_module from "../build/Release/native_module"

let c