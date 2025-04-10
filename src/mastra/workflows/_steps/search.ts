import { Step } from "@mastra/core";
import { search as searchGoogle } from "../../../libs/search";
import * as z from "zod";
import { buildQuery } from "./buildQuery";

export const search = new Step({
    id: "search",
    outputSchema: z.object({
        results: z.array(z.object({
            link: z.string(),
        })),
    }),
    execute: async ({ context }) => {
        const { query } = context.getStepResult(buildQuery);

        const response = await searchGoogle(
            query,
            context.triggerData.searchApiKey,
            {
                num: 3,
            },
        );

        const results = response.items?.map((item) => ({
            link: item.link,
        }));
        return { results: results || [] };
    },
});
