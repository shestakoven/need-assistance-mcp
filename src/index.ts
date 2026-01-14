#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const server = new McpServer({
  name: "need-assistance-mcp",
  version: "1.0.0",
});

server.tool(
  "need_assistance",
  "Use this tool when you need help with a task, are stuck, or want to consult another AI assistant. Describe your problem or question and get assistance from codex.",
  {
    message: z
      .string()
      .describe(
        "Your question or description of what you need help with. Be specific about the context and what you're trying to achieve."
      ),
  },
  async ({ message }) => {
    try {
      // Escape single quotes in the message for safe shell execution
      const escapedMessage = message.replace(/'/g, "'\\''");

      const { stdout, stderr } = await execAsync(
        `npx -y @openai/codex exec '${escapedMessage}'`,
        {
          maxBuffer: 10 * 1024 * 1024, // 10MB buffer for large responses
          timeout: 300000, // 5 minute timeout
          shell: "/bin/bash",
        }
      );

      const output = stdout || stderr;

      if (!output.trim()) {
        return {
          content: [
            {
              type: "text" as const,
              text: "No response received from codex. The command may have completed silently.",
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text" as const,
            text: output,
          },
        ],
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      return {
        content: [
          {
            type: "text" as const,
            text: `Error getting assistance: ${errorMessage}`,
          },
        ],
        isError: true,
      };
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Need Assistance MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
