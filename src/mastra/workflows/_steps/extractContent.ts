import { Step } from "@mastra/core";
import { extractor } from "../../../mastra/agents/extractor";
import * as z from "zod";
import { renderHtml } from "./renderHtml";

export const extractContent = new Step({
    id: "extractContent",
    outputSchema: z.array(
        z.object({
            link: z.string(),
            content: z.string(),
        }),
    ),
    execute: async ({ context }) => {
        const renderedPages = context.getStepResult(renderHtml);

        const extractedContents = await Promise.all(
            renderedPages.map(async (page) => {
                const extractionResult = await extractor.generate(page.html);
                return {
                    link: page.link,
                    content: extractionResult.text,
                };
            })
        );

        return extractedContents;
    },
});
