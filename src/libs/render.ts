import * as puppeteer from "puppeteer";

/**
 * URLからHTMLを取得する
 * @param url 取得するURL
 * @returns HTMLのbody
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
      waitUntil: "networkidle2", // ネットワークがアイドル状態になるまで待機
      timeout: 30000, // タイムアウト: 30秒
    });

    // 動的コンテンツの読み込みのため少し待機
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // 不要なタグを除去
    await page.evaluate(() => {
      // scriptタグを除去
      const scripts = document.querySelectorAll("script");
      scripts.forEach((script) => script.remove());
      // styleタグを除去
      const styles = document.querySelectorAll("style");
      styles.forEach((style) => style.remove());
      // iframeタグを除去
      const iframes = document.querySelectorAll("iframe");
      iframes.forEach((iframe) => iframe.remove());
      // svgタグの中身を除去
      const svgs = document.querySelectorAll("svg");
      svgs.forEach((svg) => {
        const children = Array.from(svg.children);
        children.forEach((child) => {
          if (child.tagName !== "title") {
            child.remove();
          }
        });
      });
    });
    const html = await page.content();

    return html;
  } finally {
    // ブラウザを閉じる
    await browser.close();
  }
}
