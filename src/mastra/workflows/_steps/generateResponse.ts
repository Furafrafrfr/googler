import { Step } from "@mastra/core";
import { responder } from "../../../mastra/agents/responder";
import * as z from "zod";
import { convertToMarkdown } from "./convertToMarkdown";

export const generateResponse = new Step({
    id: "generateResponse",
    outputSchema: z.object({
        response: z.string(),
        sources: z.array(z.string()),
    }),
    execute: async ({ context }) => {
        const markdownContents = context.getStepResult(convertToMarkdown);
        const { question } = context.triggerData;

        // マークダウンコンテンツと元の質問を組み合わせて入力を作成
        const promptContent = `
質問: ${question}

検索結果:
${
            markdownContents.map((content, index) => `
ソース ${index + 1}: ${content.link}

${content.markdown}
---
`).join("\n")
        }

上記の検索結果に基づいて、質問に回答してください。
`;

        const responseResult = await responder.generate(promptContent);

        // 使用したソースのリンクを抽出
        const sources = markdownContents.map((content) => content.link);

        return {
            response: responseResult.text,
            sources: sources,
        };
    },
});
