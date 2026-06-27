import { Command } from "commander";
import * as p from "@clack/prompts";
import color from "picocolors";
import fs from "fs-extra";
import path from "path";
import os from "os";

export const mcpCommand = new Command("mcp")
  .description("Manage and configure the GravCN MCP Server");

mcpCommand
  .command("init")
  .description("Initialize MCP configuration for Claude Code, Cursor, or VS Code")
  .option("-c, --client <client>", "The MCP client to configure (claude, cursor, vscode)")
  .action(async (options) => {
    p.intro(color.bgCyan(color.black(" gravcn mcp init ")));

    let client = options.client;
    if (!client) {
      client = await p.select({
        message: "Which MCP client would you like to configure?",
        options: [
          { value: "cursor", label: "Cursor" },
          { value: "claude", label: "Claude Code" },
          { value: "vscode", label: "VS Code (GitHub Copilot)" },
        ],
      });

      if (p.isCancel(client)) {
        p.cancel("Operation cancelled.");
        process.exit(0);
      }
    }

    const mcpConfig = {
      command: "npx",
      args: ["@gravcn/ui@latest", "mcp"],
    };

    try {
      if (client === "cursor") {
        const cursorDir = path.join(process.cwd(), ".cursor");
        const cursorMcpFile = path.join(cursorDir, "mcp.json");
        await fs.ensureDir(cursorDir);
        
        let config = { mcpServers: {} };
        if (await fs.pathExists(cursorMcpFile)) {
          config = await fs.readJson(cursorMcpFile);
        }
        
        config.mcpServers = {
          ...config.mcpServers,
          gravcn: mcpConfig
        };
        
        await fs.writeJson(cursorMcpFile, config, { spaces: 2 });
        p.note("Added GravCN to .cursor/mcp.json", "Success");
      } 
      else if (client === "claude") {
        const claudeMcpFile = path.join(process.cwd(), ".mcp.json");
        
        let config = { mcpServers: {} };
        if (await fs.pathExists(claudeMcpFile)) {
          config = await fs.readJson(claudeMcpFile);
        }
        
        config.mcpServers = {
          ...config.mcpServers,
          gravcn: mcpConfig
        };
        
        await fs.writeJson(claudeMcpFile, config, { spaces: 2 });
        p.note("Added GravCN to .mcp.json", "Success");
      }
      else if (client === "vscode") {
        const vscodeDir = path.join(process.cwd(), ".vscode");
        const vscodeMcpFile = path.join(vscodeDir, "mcp.json");
        await fs.ensureDir(vscodeDir);
        
        let config = { servers: {} };
        if (await fs.pathExists(vscodeMcpFile)) {
          config = await fs.readJson(vscodeMcpFile);
        }
        
        config.servers = {
          ...config.servers,
          gravcn: mcpConfig
        };
        
        await fs.writeJson(vscodeMcpFile, config, { spaces: 2 });
        p.note("Added GravCN to .vscode/mcp.json", "Success");
      } else {
        p.cancel(`Unsupported client: ${client}`);
        process.exit(1);
      }

      p.outro(color.green(`Successfully configured MCP for ${client}!`));
    } catch (error: any) {
      p.cancel(`Failed to configure MCP: ${error.message}`);
      process.exit(1);
    }
  });

mcpCommand
  .command("start", { isDefault: true })
  .description("Start the MCP server (internal use by IDEs)")
  .action(async () => {
    // In the future, we will bundle the MCP server directly into this CLI.
    // For now, if someone runs `npx @gravcn/ui mcp`, we tell them it's coming.
    console.error("The GravCN MCP Server logic is currently running locally via packages/mcp-server.");
    console.error("In the next release, it will be bundled natively into this CLI!");
    process.exit(1);
  });
