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
        const response = await searchGoogle(
            context.triggerData.query,
            context.triggerData.searchApiKey,
            {
                num: 5,
            }
        );

        const results = response.items?.map((item) => ({
            link: item.link,
        }));
        return { results: results || [] };
    },
});
