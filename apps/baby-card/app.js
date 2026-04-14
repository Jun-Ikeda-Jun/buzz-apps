/**
 * Baby Card Maker - メインアプリケーション
 * 赤ちゃんの写真から月齢入り成長記録カードを作成する
 */
import { removeBg, blobToImage, canvasToBlob, downloadBlob, twitterShareUrl } from "../../shared/bg-remove.js";
import { initDropZone, setProgress, toggle } from "../../shared/ui.js";
import { TEMPLATES } from "./templates.js";

// DOM要素
const dropZone = document.getElementById("drop-zone");
const uploadSection = document.getElementById("upload-section");
const inputSection = document.getElementById("input-section");
const templateSection = document.getElementById("template-section");
const templateGrid = document.getElementById("template-grid");
const progressSection = document.getElementById("progress-section");
const progressFill = document.getElementById("progress-fill");
const statusText = document.getElementById("status");
const resultSection = document.getElementById("result-section");
const canvas = document.getElementById("canvas");
const btnDownload = document.getElementById("btn-download");
const btnShare = document.getElementById("btn-share");
const btnRetry = document.getElementById("btn-retry");
const inputMonths = document.getElementById("input-months");
const inputName = document.getElementById("input-name");

const ctx = canvas.getContext("2d");

// 状態
let selectedTemplate = TEMPLATES[0];
let babyImage = null;

// --- テンプレート選択UI ---
function buildTemplateGrid() {
  TEMPLATES.forEach((tmpl, i) => {
    const div = document.createElement("div");
    div.className = `template-option${i === 0 ? " selected" : ""}`;
    div.innerHTML = `
      <div class="preview-thumb" style="background:${tmpl.bgColor}">${tmpl.emoji}</div>
      <div>${tmpl.name}</div>
    `;
    div.addEventListener("click", () => {
      document.querySelectorAll(".template-option").forEach((el) => el.classList.remove("selected"));
      div.classList.add("selected");
      selectedTemplate = tmpl;
      if (babyImage) renderCard();
    });
    templateGrid.appendChild(div);
  });
}

// --- メインフロー ---
async function handleFile(file) {
  // 入力欄・テンプレ選択を表示
  toggle(inputSection, true);
  toggle(templateSection, true);

  // プログレス表示
  toggle(uploadSection, false);
  toggle(resultSection, false);
  toggle(progressSection, true);
  setProgress(progressFill, 0);
  statusText.textContent = "モデルを読み込み中（初回のみ時間がかかります）...";

  try {
    const blob = await removeBg(file, (ratio) => {
      setProgress(progressFill, ratio);
      if (ratio < 0.3) {
        statusText.textContent = "モデルを読み込み中...";
      } else if (ratio < 0.8) {
        statusText.textContent = "背景を除去中...";
      } else {
        statusText.textContent = "仕上げ中...";
      }
    });

    babyImage = await blobToImage(blob);
    renderCard();

    toggle(progressSection, false);
    toggle(resultSection, true);
  } catch (err) {
    console.error(err);
    statusText.textContent = "エラーが発生しました。別の画像で試してください。";
    setTimeout(() => resetUI(), 3000);
  }
}

function renderCard() {
  const W = 1200;
  const H = 1200;
  canvas.width = W;
  canvas.height = H;

  const months = Number(inputMonths.value) || 0;
  const name = inputName.value.trim();

  selectedTemplate.render(ctx, W, H, babyImage, months, name);
}

function resetUI() {
  babyImage = null;
  toggle(uploadSection, true);
  toggle(inputSection, false);
  toggle(templateSection, false);
  toggle(progressSection, false);
  toggle(resultSection, false);
  setProgress(progressFill, 0);
}

// --- イベント ---
btnDownload.addEventListener("click", async () => {
  const months = Number(inputMonths.value) || 0;
  const blob = await canvasToBlob(canvas, "image/png");
  downloadBlob(blob, `baby-card-${months}m.png`);
});

btnShare.addEventListener("click", () => {
  const months = Number(inputMonths.value) || 0;
  const url = twitterShareUrl(
    `${months}ヶ月になりました！👶✨\n#BabyCardMaker #成長記録`,
  );
  btnShare.href = url;
});

btnRetry.addEventListener("click", resetUI);

// 月齢・名前変更時にリアルタイム再描画
inputMonths.addEventListener("input", () => {
  if (babyImage) renderCard();
});
inputName.addEventListener("input", () => {
  if (babyImage) renderCard();
});

// --- 初期化 ---
buildTemplateGrid();
initDropZone(dropZone, handleFile);
