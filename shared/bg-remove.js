/**
 * 共通: 背景除去ユーティリティ
 * @imgly/background-removal をCDN経由で使用
 * 全処理ブラウザローカル、サーバー送信なし
 */

let removeBackgroundFn = null;

/**
 * 背景除去ライブラリを遅延ロード
 */
async function loadBgRemoval() {
  if (removeBackgroundFn) return removeBackgroundFn;

  const module = await import(
    "https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.5.5/dist/index.js"
  );
  removeBackgroundFn = module.removeBackground;
  return removeBackgroundFn;
}

/**
 * 画像の背景を除去して透過PNGのBlobを返す
 * @param {File|Blob|string} imageSource - 画像ファイル、Blob、またはURL
 * @param {Function} onProgress - 進捗コールバック (0-1)
 * @returns {Promise<Blob>} 背景除去済み画像のBlob
 */
export async function removeBg(imageSource, onProgress) {
  const remove = await loadBgRemoval();
  const blob = await remove(imageSource, {
    progress: (key, current, total) => {
      if (onProgress && total > 0) {
        onProgress(current / total);
      }
    },
  });
  return blob;
}

/**
 * BlobをImageElementに変換
 * @param {Blob} blob
 * @returns {Promise<HTMLImageElement>}
 */
export function blobToImage(blob) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(blob);
  });
}

/**
 * CanvasをBlobに変換
 * @param {HTMLCanvasElement} canvas
 * @param {string} type
 * @param {number} quality
 * @returns {Promise<Blob>}
 */
export function canvasToBlob(canvas, type = "image/png", quality = 0.95) {
  return new Promise((resolve) => {
    canvas.toBlob(resolve, type, quality);
  });
}

/**
 * Blobをダウンロード
 * @param {Blob} blob
 * @param {string} filename
 */
export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * X(Twitter)シェアURLを生成
 * @param {string} text
 * @param {string} url
 * @returns {string}
 */
export function twitterShareUrl(text, url = "") {
  const params = new URLSearchParams({ text });
  if (url) params.set("url", url);
  return `https://x.com/intent/tweet?${params}`;
}
