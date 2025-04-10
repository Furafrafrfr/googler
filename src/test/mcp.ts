/// ....元のコード

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { server } from "../main";
import { Step, Workflow } from "@mastra/core";
import { z } from "zod";



async function main() {
    server.close();
    const client = new Client(
        {
            name: "test client",
            version: "1.0",
        },
        {
            capabilities: {},
        },
    );
    const [clientTransport, serverTransport] = InMemoryTransport
        .createLinkedPair();
    await Promise.all([
        client.connect(clientTransport),
        server.connect(serverTransport),
    ]);
    const result = await client.callTool(
        {
            name: "search-web",
            arguments: {
                question: "今日の天気は？",
            },
        },
        undefined,
        {
            timeout: 1000 * 60 * 60,
        },
    );

    console.log(result);
}

main().catch((error) => {
    console.error("Error:", error);
});
