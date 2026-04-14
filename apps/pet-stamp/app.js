/**
 * Pet Stamp Maker - メインアプリケーション
 * ペットの写真からLINEスタンプ風の画像を作成
 */
import { removeBg, blobToImage, canvasToBlob, downloadBlob, twitterShareUrl } from "../../shared/bg-remove.js";
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
const inputText = document.getElementById("input-text");

const ctx = canvas.getContext("2d");

// 状態
let selectedTemplate = TEMPLATES[0];
let petImage = null;
let originalFile = null;

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
      if (petImage) renderStamp();
    });
    templateGrid.appendChild(div);
  });
}

// --- メインフロー ---
async function handleFile(file) {
  originalFile = file;

  toggle(templateSection, true);
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

    petImage = await blobToImage(blob);
    renderStamp();

    toggle(progressSection, false);
    toggle(resultSection, true);
  } catch (err) {
    console.error(err);
    statusText.textContent = "エラーが発生しました。別の画像で試してください。";
    setTimeout(() => resetUI(), 3000);
  }
}

function renderStamp() {
  const W = 370;
  const H = 320;
  canvas.width = W;
  canvas.height = H;

  const text = inputText.value.trim();
  selectedTemplate.render(ctx, W, H, petImage, text);
}

function resetUI() {
  petImage = null;
  originalFile = null;
  inputText.value = "";
  toggle(uploadSection, true);
  toggle(templateSection, false);
  toggle(progressSection, false);
  toggle(resultSection, false);
  setProgress(progressFill, 0);
}

// --- イベント ---
btnDownload.addEventListener("click", async () => {
  const blob = await canvasToBlob(canvas, "image/png");
  downloadBlob(blob, "pet-stamp.png");
});

btnShare.addEventListener("click", () => {
  const url = twitterShareUrl(
    "うちの子スタンプできました！🐾💬\n#PetStampMaker #うちの子スタンプ",
  );
  btnShare.href = url;
});

btnRetry.addEventListener("click", resetUI);

// テキスト変更時にリアルタイム更新
inputText.addEventListener("input", () => {
  if (petImage) renderStamp();
});

// --- 初期化 ---
buildTemplateGrid();
initDropZone(dropZone, handleFile);
