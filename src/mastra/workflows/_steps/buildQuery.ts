import { Step } from "@mastra/core";
import { queryBuilder } from "../../../mastra/agents/queryBuilder";
import * as z from "zod";

export const buildQuery = new Step({
    id: "queryBuilder",
    outputSchema: z.object({
      query: z.string(),
    }),
    execute: async ({context}) => {
        const { question } = context.triggerData;
        const query = await queryBuilder.generate(question);
        return { query: query.text };
    }
})
