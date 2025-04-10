import { Step } from "@mastra/core";
import { markdown } from "../../../mastra/agents/markdown";
import * as z from "zod";
import { extractContent } from "./extractContent";
import { renderHtml } from "./renderHtml";

export const convertToMarkdown = new Step({
    id: "convertToMarkdown",
    outputSchema: z.array(
        z.object({
            link: z.string(),
            markdown: z.string(),
        }),
    ),
    execute: async ({ context }) => {
        const html = context.getStepResult(renderHtml);

        const markdownContents = await Promise.all(
            html.map(async (content) => {
                const markdownResult = await markdown.generate(content.html);
                return {
                    link: content.link,
                    markdown: markdownResult.text,
                };
            })
        );

        return markdownContents;
    },
});
