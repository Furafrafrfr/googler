import { Step } from "@mastra/core";
import { render } from "../../../libs/render";
import * as z from "zod";
import { search } from "./search";

export const renderHtml = new Step({
    id: "renderHtml",
    outputSchema: z.array(
        z.object({
            link: z.string(),
            html: z.string(),
        }),
    ),
    execute: async ({ context }) => {
        const { results } = context.getStepResult(search);
        const response = await Promise.all(results.map(async (r) => ({
            link: r.link,
            html: await render(r.link),
        })));
        return response;
    },
});
