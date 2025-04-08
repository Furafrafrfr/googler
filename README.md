# googler

Google検索を行い、geminiで結果をまとめるMCPサーバー。

## 技術スタック

- Google Cusom Search API
- Gemini 2.0
- Vercel AI SDK
- @modelcontextprotocol/sdk

## ディレクトリ構成

```
.
├── .env                  # 環境変数設定ファイル
├── main.ts               # メインエントリーポイント。MCPの設定はここに書く
├── package-lock.json     # パッケージ依存関係ロックファイル
├── package.json          # プロジェクト設定・依存関係
├── README.md             # プロジェクト説明書（本ファイル）
├── tsconfig.json         # TypeScript設定
├── docs/                 # ドキュメント用ディレクトリ
└── googler/              # メインソースコード
    ├── summarizer/       # 検索結果をLLMで要約・まとめるモジュール
    └── search/           # 検索機能関連モジュール
        ├── search.ts     # 検索機能実装
        └── schemas/      # データスキーマ定義
            └── CustomSearchResponseSchema.ts  # Google検索結果スキーマ
```
