import { Command } from "commander";
import { initCommand } from "./commands/init.js";
import { addCommand } from "./commands/add.js";
import { mcpCommand } from "./commands/mcp.js";

const program = new Command();

program
  .name("ui-library")
  .description("CLI to add extension components to your React project")
  .version("0.1.0");

program.addCommand(initCommand);
program.addCommand(addCommand);
program.addCommand(mcpCommand);

program.parse();
