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
  .then(convertToMarkdown)
  .then(generateResponse)
  .commit();

export { googler };
