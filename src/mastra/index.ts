import { Mastra } from "@mastra/core";
import { googler } from "./workflows/googler";

export const mastra = new Mastra({
    workflows: {
        "googler": googler,
    },
});
