import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { mastra } from "./mastra";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
  name: "googler",
  description: "A tool to search the web and generate responses",
  version: "1.0.0",
});

server.tool("search-web", {
  query: z.string(),
  searchApiKey: z.object({
    apiKey: z.string(),
    searchEngineId: z.string(),
  }),
}, ({ query, searchApiKey }, extra) => {
  const {start} = mastra.getWorkflow("googler").createRun();

  return start({
    triggerData: {
      query,
      searchApiKey,
    },
  }).then(result => {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result),
        }
      ]
    };
  });
});

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
server.connect(transport).then(() => {
}).catch(error => {
  console.error("Error connecting MCP server:", error);
});
