import { Step, Workflow } from "@mastra/core";
import * as z from "zod";
import { buildQuery } from "./_steps/buildQuery";
import { convertToMarkdown } from "./_steps/convertToMarkdown";
import { extractContent } from "./_steps/extractContent";
import { generateResponse } from "./_steps/generateResponse";
import { renderHtml } from "./_steps/renderHtml";
import { search } from "./_steps/search";

const googler = new Workflow({
  name: "googler",
  triggerSchema: z.object({
    question: z.string(),
    searchApiKey: z.object({
      apiKey: z.string(),
      searchEngineId: z.string(),
    }),
  }),
});

googler.step(buildQuery)
  .then(search)
  .then(renderHtml)
  .then(extractContent)
  .then(convertToMarkdown)
  .then(generateResponse);


  const step = new Step({
    id: "demo",
    outputSchema: z.object({
        result: z.string(),
    }),
    execute: async ({ context }) => {
        const { question } = context.triggerData;
        const result = `return: ${question}`;
        return { result };
    },
});

const workflow = new Workflow({
    name: "work",
    steps: [step],
    triggerSchema: z.object({
        question: z.string(),
    }),
});

workflow
    .step(step);

export { googler, workflow };
