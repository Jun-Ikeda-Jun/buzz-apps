/**
 * Food Magazine Maker - メインアプリケーション
 * 料理の写真を雑誌の表紙風に加工する
 * 背景除去なし: 料理は背景込みの方が映える
 */
import { canvasToBlob, downloadBlob, twitterShareUrl } from "../../shared/bg-remove.js";
import { initDropZone, setProgress, toggle } from "../../shared/ui.js";
import { TEMPLATES } from "./templates.js";

// DOM要素
const dropZone = document.getElementById("drop-zone");
const uploadSection = document.getElementById("upload-section");
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

const ctx = canvas.getContext("2d");

// 状態
let selectedTemplate = TEMPLATES[0];
let foodImage = null;

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
      if (foodImage) renderCover();
    });
    templateGrid.appendChild(div);
  });
}

// --- メインフロー ---
async function handleFile(file) {
  // テンプレ選択を表示
  toggle(templateSection, true);

  // プログレス表示（背景除去なしなので一瞬）
  toggle(uploadSection, false);
  toggle(resultSection, false);
  toggle(progressSection, true);
  setProgress(progressFill, 0.3);
  statusText.textContent = "画像を読み込み中...";

  try {
    // 背景除去なし: 元画像をそのまま使う
    const img = new Image();
    img.src = URL.createObjectURL(file);
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    setProgress(progressFill, 1);
    statusText.textContent = "完了!";

    foodImage = img;
    renderCover();

    toggle(progressSection, false);
    toggle(resultSection, true);
  } catch (err) {
    console.error(err);
    statusText.textContent = "エラーが発生しました。別の画像で試してください。";
    setTimeout(() => resetUI(), 3000);
  }
}

function renderCover() {
  const W = 900;
  const H = 1200;
  canvas.width = W;
  canvas.height = H;

  selectedTemplate.render(ctx, W, H, foodImage);
}

function resetUI() {
  foodImage = null;
  toggle(uploadSection, true);
  toggle(templateSection, false);
  toggle(progressSection, false);
  toggle(resultSection, false);
  setProgress(progressFill, 0);
}

// --- イベント ---
btnDownload.addEventListener("click", async () => {
  const blob = await canvasToBlob(canvas, "image/png");
  downloadBlob(blob, `food-magazine-${selectedTemplate.id}.png`);
});

btnShare.addEventListener("click", () => {
  const url = twitterShareUrl(
    "今日の料理が雑誌の表紙になりました!\uD83C\uDF7D\uFE0F\u2728\n#FoodMagazineMaker #料理雑誌",
  );
  btnShare.href = url;
});

btnRetry.addEventListener("click", resetUI);

// --- 初期化 ---
buildTemplateGrid();
initDropZone(dropZone, handleFile);
