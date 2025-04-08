import { Step } from "@mastra/core";
import { markdown } from "../../../mastra/agents/markdown";
import * as z from "zod";
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
        const renderedPages = context.getStepResult(renderHtml);

        const markdownContents = await Promise.all(
            renderedPages.map(async (page) => {
                const markdownResult = await markdown.generate(page.html);
                return {
                    link: page.link,
                    markdown: markdownResult.text,
                };
            })
        );

        return markdownContents;
    },
});
