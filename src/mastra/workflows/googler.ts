import { Workflow } from "@mastra/core";
import * as z from "zod";
import { buildQuery } from "./_steps/buildQuery";
import { convertToMarkdown } from "./_steps/convertToMarkdown";
import { generateResponse } from "./_steps/generateResponse";
import { renderHtml } from "./_steps/renderHtml";
import { search } from "./_steps/search";

const googler = new Workflow({
  name: "googler",
  triggerSchema: z.object({
    query: z.string(),
    searchApiKey: z.object({
      apiKey: z.string(),
      searchEngineId: z.string(),
    }),
  }),
});

googler.step(search).then(renderHtml).then(convertToMarkdown);

export { googler };
