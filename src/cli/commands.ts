import { Command } from "commander";
import { isLive } from "./checker";
import ora from "ora";
import chalk from "chalk";

export const setupCommands = () => {
  const program = new Command();

  program
    .name("TikTok live notifier")
    .description("A tool to verify if a user is live on TikTok")
    .version("1.0.0");

  program
    .option("-s, --status <user>", "Check if a TikTok user is currently live")
    .action(async (options, command) => {
      if (!options.status && command.args.length === 0) {
        program.outputHelp();
        return;
      }

      if (options.status) {
        console.log(
          chalk.blue(`Checking live status for TikTok user: ${options.status}`)
        );

        try {
          const spinner = ora({
            text: "Checking live status... Please wait",
            color: "yellow",
          }).start();

          const result = await isLive(options.status as string);

          spinner.stop();
          console.log(
            result.success === true
              ? `User ${options.status} is currently ${chalk.bold.yellow(
                  "LIVE"
                )} on TikTok`
              : `User ${options.status} is currently ${chalk.bold.red(
                  "OFFLINE"
                )} on Tiktok`
          );
        } catch (error) {
          console.error("Live status check failed: ", error);
        }
      }
    });

  return program;
};
