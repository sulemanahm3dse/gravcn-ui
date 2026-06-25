import { Command } from "commander";
import * as p from "@clack/prompts";
import color from "picocolors";
import path from "path";
import fs from "fs-extra";
import { execa } from "execa";
import { getConfig } from "../utils/config.js";
import { transformImports } from "../utils/transformers.js";
import { detectPackageManager, getInstallCommand } from "../utils/pm.js";

// Define the RegistryItem schema matching our registry
interface RegistryItem {
  name: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: {
    path: string;
    content: string;
    type: string;
  }[];
}

// Helper to resolve import aliases to physical folder paths
async function resolveAliasPath(alias: string, cwd: string = process.cwd()): Promise<string> {
  if (alias.startsWith("@/")) {
    const hasSrc = await fs.pathExists(path.resolve(cwd, "src"));
    const relativePart = alias.slice(2);
    return path.resolve(cwd, hasSrc ? "src" : "", relativePart);
  }
  return path.resolve(cwd, alias);
}

export const addCommand = new Command()
  .name("add")
  .description("Add components to your project")
  .argument("<components...>", "The components to add")
  .option("-r, --registry <url>", "Custom registry URL")
  .action(async (components: string[], options) => {
    p.intro(color.bgCyan(color.black(" ui-library add ")));

    // 1. Get or create project configuration
    let config = await getConfig();
    if (!config) {
      p.note("No configuration file detected. Please run the init command first.");
      p.outro(color.yellow("Usage: npx ui-library init"));
      return;
    }

    const registryUrl = options.registry || process.env.REGISTRY_URL || "http://localhost:3000/registry";
    
    const resolvedComponents: Map<string, RegistryItem> = new Map();
    const npmDependencies: Set<string> = new Set();
    const queue = [...components];
    
    const fetchSpinner = p.spinner();
    fetchSpinner.start("Fetching component metadata...");

    // 2. Recursively fetch components and resolve all registry dependencies
    while (queue.length > 0) {
      const name = queue.shift()!;
      if (resolvedComponents.has(name)) continue;

      let fetchedItem: RegistryItem | null = null;

      // Try local extension registry first
      try {
        const res = await fetch(`${registryUrl}/${name}.json`);
        if (res.ok) {
          fetchedItem = (await res.json()) as RegistryItem;
        }
      } catch (e) {
        // Continue to fallback registry
      }

      // Try official shadcn/ui registry next (for core dependencies like button, dialog)
      if (!fetchedItem) {
        try {
          const res = await fetch(`https://ui.shadcn.com/r/styles/default/${name}.json`);
          if (res.ok) {
            fetchedItem = (await res.json()) as RegistryItem;
          }
        } catch (e) {
          // Continue to error check
        }
      }

      if (!fetchedItem) {
        fetchSpinner.stop(color.red(`Failed to fetch component "${name}"`));
        p.outro(color.red(`Error: Component "${name}" not found in extension library or shadcn/ui.`));
        return;
      }

      resolvedComponents.set(name, fetchedItem);

      // Collect npm dependencies
      if (fetchedItem.dependencies) {
        for (const dep of fetchedItem.dependencies) {
          npmDependencies.add(dep);
        }
      }

      // Queue registry dependencies
      if (fetchedItem.registryDependencies) {
        for (const regDep of fetchedItem.registryDependencies) {
          if (!resolvedComponents.has(regDep)) {
            queue.push(regDep);
          }
        }
      }
    }

    fetchSpinner.stop(color.green("Metadata fetched successfully!"));

    p.note(
      Array.from(resolvedComponents.keys()).join(", "),
      "Components to install (including dependencies)"
    );

    // 3. Install npm dependencies
    const depsArray = Array.from(npmDependencies);
    if (depsArray.length > 0) {
      const pm = await detectPackageManager();
      const installSpinner = p.spinner();
      installSpinner.start(`Installing npm dependencies using ${pm}: ${depsArray.join(", ")}...`);

      try {
        const installCommand = getInstallCommand(pm, depsArray);
        // Execute the command in the shell
        const [cmd, ...args] = installCommand.split(" ");
        await execa(cmd, args, { shell: true });
        installSpinner.stop(color.green("Dependencies installed!"));
      } catch (error) {
        installSpinner.stop(color.red("Failed to install npm dependencies."));
        p.outro(color.yellow("Please install them manually: " + depsArray.join(" ")));
        return;
      }
    }

    // 4. Write component files to user project
    const writeSpinner = p.spinner();
    writeSpinner.start("Writing files to project...");

    for (const [compName, item] of resolvedComponents.entries()) {
      for (const file of item.files) {
        // Rewrite import aliases in file content
        const transformedContent = transformImports(file.content, config);

        // Determine destination folder
        let relativeDir = "";
        
        // Match path structure: e.g. components/ui/button.tsx or ui/button.tsx
        if (file.path.startsWith("components/ui/") || file.path.startsWith("ui/")) {
          const uiPath = config.aliases.ui || `${config.aliases.components}/ui`;
          const resolvedUiDir = await resolveAliasPath(uiPath);
          const fileName = path.basename(file.path);
          const destFile = path.join(resolvedUiDir, fileName);
          
          await fs.ensureDir(resolvedUiDir);
          await fs.writeFile(destFile, transformedContent);
        } else if (file.path.startsWith("components/")) {
          // Extension components: e.g., components/data-table/data-table.tsx
          // Put them directly inside the user's components folder
          const compPath = config.aliases.components;
          const resolvedCompDir = await resolveAliasPath(compPath);
          
          // Keep the relative subfolder if present
          const subPath = file.path.replace("components/", ""); // e.g., "data-table/data-table.tsx"
          const destFile = path.join(resolvedCompDir, subPath);
          
          await fs.ensureDir(path.dirname(destFile));
          await fs.writeFile(destFile, transformedContent);
        } else {
          // General fallback (libs, hooks, utils, etc.)
          // We can write to components/../[path]
          const compPath = config.aliases.components;
          const resolvedCompDir = await resolveAliasPath(compPath);
          const destFile = path.resolve(resolvedCompDir, "..", file.path);

          await fs.ensureDir(path.dirname(destFile));
          await fs.writeFile(destFile, transformedContent);
        }
      }
    }

    writeSpinner.stop(color.green("Files written successfully!"));
    p.outro(color.green("✓ Components added successfully!"));
  });
