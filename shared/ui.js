/**
 * 共通: UIユーティリティ
 * ドラッグ&ドロップ、プログレス表示、シェアボタン
 */

/**
 * ドラッグ&ドロップ対応のアップロードエリアを初期化
 * @param {HTMLElement} dropZone
 * @param {Function} onFile - (file: File) => void
 */
export function initDropZone(dropZone, onFile) {
  // クリックでファイル選択（スマホ: カメラ起動対応）
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.capture = "environment"; // スマホでカメラ直撮りも可能に
  input.style.display = "none";
  dropZone.appendChild(input);

  dropZone.addEventListener("click", () => input.click());
  input.addEventListener("change", () => {
    if (input.files[0]) onFile(input.files[0]);
    input.value = "";
  });

  // ドラッグ&ドロップ（PC用、スマホでは発火しない）
  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("drag-over");
  });
  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("drag-over");
  });
  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("drag-over");
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) onFile(file);
  });
}

/**
 * プログレスバーの値を更新
 * @param {HTMLElement} bar - .progress-fill 要素
 * @param {number} ratio - 0〜1
 */
export function setProgress(bar, ratio) {
  bar.style.width = `${Math.round(ratio * 100)}%`;
}

/**
 * 要素の表示/非表示切り替え
 * @param {HTMLElement} el
 * @param {boolean} show
 */
export function toggle(el, show) {
  el.style.display = show ? "" : "none";
}
