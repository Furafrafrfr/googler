import { google } from "@ai-sdk/google";
import { Agent } from "@mastra/core";

export const extractor = new Agent({
    name: "extractor",
    model: google("gemini-2.0-flash-lite-preview-02-05", {}),
    instructions:
        "WebサイトのHTMLが渡されます。ヘッダーやフッターのような余計な部分やスクリプトタグのような人間には読めない部分を取り除き、本文にあたる部分だけを抽出してください。出力は断片的なhtmlです。",
});
