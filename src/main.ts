import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { mastra } from "./mastra";
import { z } from "zod";
import dotenv from "dotenv";

// .envファイルから環境変数を読み込む
dotenv.config();

// Create an MCP server
const server = new McpServer({
  name: "googler",
  description: "A tool to search the web and generate responses",
  version: "1.0.0",
});

server.tool("search-web", {
  question: z.string().describe(
    "The question to search for in natural language",
  ),
}, ({ question }) => {
  const { start } = mastra.getWorkflow("googler").createRun();

  const searchApiKey = {
    apiKey: process.env.GOOGLE_CUSTOM_SEARCH_API_KEY || "",
    searchEngineId: process.env.GOOGLE_CUSTOM_SEARCH_ENGINE_ID || "",
  };

  return start({
    triggerData: {
      question,
      searchApiKey,
    },
  }).then((result) => {
    const r = result.results;
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            r["generateResponse"],
          ),
        },
      ],
    };
  });
});

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
server.connect(transport).then(() => {
}).catch((error) => {
  console.error("Error connecting MCP server:", error);
});

export { server };
