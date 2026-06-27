#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import * as fs from "fs/promises";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to locate the registry inside the monorepo
const WORKSPACE_ROOT = path.resolve(__dirname, "../../../");
const REGISTRY_DIR = path.join(WORKSPACE_ROOT, "packages/registry/src/registry/components");

const server = new Server(
  {
    name: "gravcn-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "list_components",
        description: "List all available UI components in the GravCN registry",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "get_component_code",
        description: "Fetch the source code for a specific GravCN component",
        inputSchema: {
          type: "object",
          properties: {
            componentName: {
              type: "string",
              description: "The name of the component (e.g., 'button', 'multi-select')",
            },
          },
          required: ["componentName"],
        },
      },
    ],
  };
});

// Implement tool handlers
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "list_components") {
    try {
      const files = await fs.readdir(REGISTRY_DIR);
      // Strip extensions (.tsx, .ts)
      const components = files.map((f) => f.replace(/\.tsx?$/, ""));
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(components, null, 2),
          },
        ],
      };
    } catch (error: any) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Failed to list components: ${error.message}`,
          },
        ],
      };
    }
  }

  if (name === "get_component_code") {
    const { componentName } = args as { componentName: string };
    try {
      const tsxPath = path.join(REGISTRY_DIR, `${componentName}.tsx`);
      const tsPath = path.join(REGISTRY_DIR, `${componentName}.ts`);
      
      let filePath = tsxPath;
      try {
        await fs.access(tsxPath);
      } catch {
        filePath = tsPath;
      }

      const content = await fs.readFile(filePath, "utf-8");
      return {
        content: [
          {
            type: "text",
            text: content,
          },
        ],
      };
    } catch (error: any) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Component '${componentName}' not found or could not be read. Error: ${error.message}`,
          },
        ],
      };
    }
  }

  throw new Error(`Tool not found: ${name}`);
});

// Run the server using stdio transport
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("GravCN MCP Server is running over stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
