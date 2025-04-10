import { Mastra } from "@mastra/core";
import { googler, workflow } from "./workflows/googler";

export const mastra = new Mastra({
    workflows: {
        "googler": googler,
    },
});
