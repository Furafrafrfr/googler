import { Step } from "@mastra/core";
import { queryBuilder } from "../../../mastra/agents/queryBuilder";
import * as z from "zod";

export const buildQuery = new Step({
  id: "queryBuilder",
  outputSchema: z.object({
    query: z.string(),
  }),
  execute: async ({ context }) => {
    const { question } = context.triggerData;
    const result = await queryBuilder.generate(question, {
      output: z.object({
        think: z.string().describe("最終的な検索クエリを得るまでの思考過程"),
        result: z.string().describe("最終的な検索クエリ"),
      }),
    });
    return { query: result.object.result };
  },
});
