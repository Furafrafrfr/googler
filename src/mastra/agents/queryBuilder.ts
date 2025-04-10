import { Agent } from "@mastra/core";
import { google } from "@ai-sdk/google";

export const queryBuilder = new Agent({
    name: "queryBuilder",
    model: google("gemini-2.0-flash-001", {}),
    instructions:
        `<命令>
以下の順番に沿って信頼性の高い情報を取得できるGoogleの検索クエリを考えてください。

1. ユーザーの入力から、ユーザーが何を知りたいのかを考えてください。
2. ユーザーが知りたい情報が含まれるWebサイトについて考える。
  - 例: サイト種別（公式サイト、ブログ、SNS、フォーラムなど）
3. ユーザーが知りたいことに対して、2で考えた参照先や重要語、関連語を単語として洗い出します。
4. 3で考えた出したクエリ候補から、ユーザーが知りたい情報を含む信頼性の高いWebサイトがヒットしそうな検索クエリを考えます。

<制約>
- クエリは端的で最低限の単語を含むようにしてください。
`,
});
