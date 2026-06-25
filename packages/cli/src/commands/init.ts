import { Command } from "commander";
import * as p from "@clack/prompts";
import color from "picocolors";
import { getConfig, writeConfig } from "../utils/config.js";

export const initCommand = new Command()
  .name("init")
  .description("Initialize project configuration for ui-library")
  .action(async () => {
    p.intro(color.bgCyan(color.black(" ui-library init ")));

    const existingConfig = await getConfig();
    if (existingConfig) {
      p.note(
        JSON.stringify(existingConfig, null, 2),
        "Existing configuration detected in components.json"
      );
      p.outro(color.green("You are already initialized! Ready to add components."));
      return;
    }

    const tsx = await p.confirm({
      message: "Are you using TypeScript?",
      initialValue: true,
    });

    if (p.isCancel(tsx)) {
      p.cancel("Operation cancelled.");
      process.exit(0);
    }

    const componentsAlias = await p.text({
      message: "Configure the import alias for components:",
      placeholder: "@/components",
      defaultValue: "@/components",
      validate: (value) => {
        if (!value.trim()) return "Alias cannot be empty";
      },
    });

    if (p.isCancel(componentsAlias)) {
      p.cancel("Operation cancelled.");
      process.exit(0);
    }

    const utilsAlias = await p.text({
      message: "Configure the import alias for utils:",
      placeholder: "@/lib/utils",
      defaultValue: "@/lib/utils",
      validate: (value) => {
        if (!value.trim()) return "Alias cannot be empty";
      },
    });

    if (p.isCancel(utilsAlias)) {
      p.cancel("Operation cancelled.");
      process.exit(0);
    }

    const config = {
      tsx: !!tsx,
      aliases: {
        components: componentsAlias,
        utils: utilsAlias,
        ui: `${componentsAlias}/ui`,
      },
    };

    await writeConfig(config);

    p.outro(color.green("✓ Configuration initialized and written to components.json"));
  });
