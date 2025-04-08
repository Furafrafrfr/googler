import * as puppeteer from 'puppeteer';

/**
 * URLからHTMLを取得する
 * @param url 取得するURL
 * @returns HTMLの文字列
 */
export async function render(url: string): Promise<string> {
  // ブラウザを起動
  const browser = await puppeteer.launch({
    headless: true, // ヘッドレスモードを使用
  });

  try {
    // 新しいページを開く
    const page = await browser.newPage();

    // URLにアクセス
    await page.goto(url, {
      waitUntil: 'networkidle2', // ネットワークがアイドル状態になるまで待機
      timeout: 30000, // タイムアウト: 30秒
    });

    // 動的コンテンツの読み込みのため少し待機
    await new Promise(resolve => setTimeout(resolve, 5000));

    // HTMLを取得
    const html = await page.content();

    return html;
  } finally {
    // ブラウザを閉じる
    await browser.close();
  }
}
