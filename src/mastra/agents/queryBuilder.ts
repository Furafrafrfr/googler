import { Agent } from "@mastra/core";
import { google } from "@ai-sdk/google";

export const queryBuilder = new Agent({
    name: "queryBuilder",
    model: google("gemini-2.0-flash-exp", {}),
    instructions:
        `入力から重要語や関連語を追加してGoogle検索クエリを生成してください。

<出力>
Google検索で使用できる形である必要があります。

例:
- 明日 天気
- 東京都 桜 時期

<入力に対する出力例>
以下の矢印の後ろが出力です。
- "Azure OpenAIを利用する方法" -> Azure OpenAI ドキュメント チュートリアル
- "No value exists in scope for the shorthand property 'context'. Either declare one or provide an initializer.の原因はなんですか？" -> No value exists in scope for the shorthand property 'context'. Either declare one or provide an initializer
- "Google Custom Search APIに接続できません" -> Google Custom Search API 接続できない`
});
