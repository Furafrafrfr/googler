import { Agent } from "@mastra/core";
import { google } from "@ai-sdk/google";

export const markdown = new Agent({
    name: "markdown",
    model: google("gemini-2.0-flash-lite-preview-02-05", {}),
    instructions:
        "WebページのHTMLコンテンツをMarkdown形式に変換してください。変換の際は以下のガイドラインに従ってください：\n\n" +
        "1. ヘッダー、フッター、ナビゲーションメニュー、広告などの余分な要素は除外し、本文コンテンツに集中してください。\n" +
        "2. 見出し、段落、リスト、リンク、画像、テーブルなどの要素を適切なMarkdown構文に置き換えてください。\n" +
        "3. コードブロックやプログラミング例は、適切なMarkdownコードブロック構文で保持してください。\n" +
        "4. 重要なテキストの強調（太字、斜体など）を保持してください。\n" +
        "5. 可能な限り元のコンテンツの構造と意味を保持してください。\n" +
        "6. 出力は整形されたMarkdownテキストのみにしてください。\n\n" +
        "HTMLタグやスクリプト、スタイル定義などの技術的な要素は含めないでください。人間が読みやすい形式のMarkdownを生成することを目指してください。",
});
