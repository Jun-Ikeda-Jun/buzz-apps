/**
 * Pet Cover Maker - メインアプリケーション
 * ペットの写真を雑誌の表紙風に加工する
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

const ctx = canvas.getContext("2d");

// 状態
let selectedTemplate = TEMPLATES[0];
let petImage = null; // 背景除去済み画像
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
      if (petImage) renderCover();
    });
    templateGrid.appendChild(div);
  });
}

// --- メインフロー ---
async function handleFile(file) {
  originalFile = file;

  // テンプレ選択を表示
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

    petImage = await blobToImage(blob);
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

  selectedTemplate.render(ctx, W, H, petImage);
}

function resetUI() {
  petImage = null;
  originalFile = null;
  toggle(uploadSection, true);
  toggle(templateSection, false);
  toggle(progressSection, false);
  toggle(resultSection, false);
  setProgress(progressFill, 0);
}

// --- イベント ---
btnDownload.addEventListener("click", async () => {
  const blob = await canvasToBlob(canvas, "image/png");
  downloadBlob(blob, `pet-cover-${selectedTemplate.id}.png`);
});

btnShare.addEventListener("click", (e) => {
  const url = twitterShareUrl(
    `うちの子が${selectedTemplate.name}の表紙になりました！🐾✨\n#PetCoverMaker #うちの子が表紙`,
  );
  btnShare.href = url;
});

btnRetry.addEventListener("click", resetUI);

// --- 初期化 ---
buildTemplateGrid();
initDropZone(dropZone, handleFile);
