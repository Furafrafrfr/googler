import { CustomSearchResponse, CustomSearchResponseSchema } from '../schemas/CustomSearchResponseSchema';

/**
 * Google Custom Search APIを使用して検索を実行する
 * @param query 検索クエリ
 * @param options 検索オプション
 * @returns 検索結果
 */
export async function search(
  query: string,
  key: {
    apiKey: string;  // APIキー
    searchEngineId: string;  // 検索エンジンID
  },
  options: {
    num?: number;  // 結果の数（1-10）
    lr?: string;    // 言語制限（例: 'lang_ja'）
  } = {}
): Promise<CustomSearchResponse> {
  const { num = 10, lr } = options;

  // APIリクエストURLを構築
  const url = new URL('https://www.googleapis.com/customsearch/v1');

  url.searchParams.append('key', key.apiKey);
  url.searchParams.append('cx', key.searchEngineId);
  url.searchParams.append('q', query);
  url.searchParams.append('num', num.toString());

  if (lr) {
    url.searchParams.append('lr', lr);
  }

  // APIリクエストを実行
  const response = await fetch(url.toString());

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google Custom Search API error: ${response.status} - ${errorText}`);
  }

  // レスポンスをJSONとして解析
  const data = await response.json();

  // スキーマを使用してレスポンスを検証
  const validatedData = CustomSearchResponseSchema.parse(data);

  return validatedData;
}
