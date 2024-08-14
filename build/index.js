#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("./cli/commands");
const welcomeMessage_1 = require("./cli/welcomeMessage");
(0, welcomeMessage_1.welcomeMessage)();
const program = (0, commands_1.setupCommands)();
if (process.argv.length > 2) {
    program.parse(process.argv);
}
else {
    program.outputHelp();
}
