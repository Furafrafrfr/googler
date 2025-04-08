import { Agent } from "@mastra/core";
import { google } from "@ai-sdk/google";

export const queryBuilder = new Agent({
    name: "queryBuilder",
    model: google("gemini-2.0-flash-exp", {}),
    instructions:
        `入力から重要語や関連語を追加してGoogle検索クエリを生成してください。

<出力>
Google検索で使用できる形式である必要があります。

<例>
- "AIの歴史について教えてください"
  - "AI 歴史"
- "Azure OpenAIの使い方を教えてください"
  - "Azure OpenAI ドキュメント"
- "`,
});
