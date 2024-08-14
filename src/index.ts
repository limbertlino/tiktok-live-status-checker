#!/usr/bin/env node
import { setupCommands } from "./cli/commands";
import { welcomeMessage } from "./cli/welcomeMessage";

welcomeMessage();
const program = setupCommands();

if (process.argv.length > 2) {
  program.parse(process.argv);
} else {
  program.outputHelp();
}
