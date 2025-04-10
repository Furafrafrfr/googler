import * as z from 'zod';

export const CustomSearchResponseSchema = z.object({
  kind: z.string(),
  url: z.object({
    type: z.string(),
    template: z.string(),
  }),
  queries: z.object({
    request: z.array(
      z.object({
        title: z.string(),
        totalResults: z.string(),
        searchTerms: z.string(),
        count: z.number(),
        startIndex: z.number(),
        inputEncoding: z.string(),
      })
    ),
  }),
  items: z.array(
    z.object({
      kind: z.string(),
      title: z.string(),
      htmlTitle: z.string(),
      link: z.string(),
      displayLink: z.string(),
      snippet: z.string(),
      htmlSnippet: z.string(),
      formattedUrl: z.string().optional(),
      htmlFormattedUrl: z.string().optional(),
      pagemap: z.record(z.any()).optional(),
    })
  ).optional(),
});

export type CustomSearchResponse = z.infer<typeof CustomSearchResponseSchema>;
