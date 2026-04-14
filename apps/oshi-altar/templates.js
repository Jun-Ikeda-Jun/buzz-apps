/**
 * 推し祭壇/痛バ風テンプレート定義
 * 各テンプレートはCanvasに描画する関数を持つ
 */

export const TEMPLATES = [
  {
    id: "shrine",
    name: "祭壇",
    emoji: "🙏",
    bgColor: "#2d0a3e",
    accentColor: "#c084fc",
    render: (ctx, w, h, img) => renderShrine(ctx, w, h, img),
  },
  {
    id: "itabag",
    name: "痛バ風",
    emoji: "💖",
    bgColor: "#ff69b4",
    accentColor: "#fff",
    render: (ctx, w, h, img) => renderItaBag(ctx, w, h, img),
  },
  {
    id: "stage",
    name: "STAGE",
    emoji: "🎤",
    bgColor: "#0a0a1a",
    accentColor: "#fbbf24",
    render: (ctx, w, h, img) => renderStage(ctx, w, h, img),
  },
  {
    id: "galaxy",
    name: "GALAXY",
    emoji: "🌌",
    bgColor: "#0f0035",
    accentColor: "#818cf8",
    render: (ctx, w, h, img) => renderGalaxy(ctx, w, h, img),
  },
  {
    id: "neon",
    name: "NEON",
    emoji: "💜",
    bgColor: "#0a0a0a",
    accentColor: "#f472b6",
    render: (ctx, w, h, img) => renderNeon(ctx, w, h, img),
  },
  {
    id: "gold",
    name: "殿堂",
    emoji: "👑",
    bgColor: "#1a1000",
    accentColor: "#d4af37",
    render: (ctx, w, h, img) => renderGold(ctx, w, h, img),
  },
];

// --- 共通ヘルパー ---

function drawOshiCentered(ctx, img, w, h, scale = 0.65, yOffset = 0.2) {
  const aspect = img.width / img.height;
  let dw, dh;
  if (aspect > w / h) {
    dw = w * scale;
    dh = dw / aspect;
  } else {
    dh = h * scale;
    dw = dh * aspect;
  }
  const x = (w - dw) / 2;
  const y = h * yOffset + (h * (1 - yOffset) - dh) / 2;
  ctx.drawImage(img, x, y, dw, dh);
}

function drawText(ctx, text, x, y, font, color, align = "center") {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.fillText(text, x, y);
}

function drawSparkles(ctx, w, h, count, color) {
  ctx.fillStyle = color;
  const seed = 42;
  for (let i = 0; i < count; i++) {
    const px = ((seed * (i + 1) * 7919) % 10000) / 10000;
    const py = ((seed * (i + 1) * 6271) % 10000) / 10000;
    const r = ((seed * (i + 1) * 3571) % 10000) / 10000;
    ctx.globalAlpha = 0.3 + r * 0.7;
    ctx.beginPath();
    ctx.arc(px * w, py * h, 1 + r * 3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

// --- テンプレートごとの描画 ---

function renderShrine(ctx, w, h, img) {
  // 紫グラデ背景
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, "#2d0a3e");
  grad.addColorStop(0.5, "#4c1d95");
  grad.addColorStop(1, "#1e0533");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // キラキラ星
  drawSparkles(ctx, w, h, 80, "#e9d5ff");

  // 推し配置
  drawOshiCentered(ctx, img, w, h, 0.65, 0.18);

  // タイトル
  drawText(ctx, "永遠の推し", w / 2, h * 0.08, `bold ${w * 0.09}px sans-serif`, "#e9d5ff");

  // フッター
  drawText(ctx, "✨ 尊い ✨", w / 2, h * 0.94, `${w * 0.045}px sans-serif`, "#c084fc");
}

function renderItaBag(ctx, w, h, img) {
  // ピンク背景
  ctx.fillStyle = "#fce7f3";
  ctx.fillRect(0, 0, w, h);

  // ハートの散らし
  ctx.fillStyle = "#f9a8d4";
  const seed = 77;
  for (let i = 0; i < 60; i++) {
    const px = ((seed * (i + 1) * 4919) % 10000) / 10000;
    const py = ((seed * (i + 1) * 7333) % 10000) / 10000;
    const size = 10 + (((seed * (i + 1) * 2311) % 10000) / 10000) * 20;
    ctx.globalAlpha = 0.2 + (((seed * (i + 1) * 1723) % 10000) / 10000) * 0.3;
    ctx.font = `${size}px sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText("♥", px * w, py * h);
  }
  ctx.globalAlpha = 1;

  // 推し配置
  drawOshiCentered(ctx, img, w, h, 0.6, 0.2);

  // タイトル
  drawText(ctx, "♥ OSHI ♥", w / 2, h * 0.09, `bold ${w * 0.1}px sans-serif`, "#ec4899");

  // フッター
  drawText(ctx, "♥ LOVE FOREVER ♥", w / 2, h * 0.94, `bold ${w * 0.04}px sans-serif`, "#ec4899");
}

function renderStage(ctx, w, h, img) {
  // 暗い背景
  ctx.fillStyle = "#0a0a1a";
  ctx.fillRect(0, 0, w, h);

  // スポットライト風 radialGradient
  const spot = ctx.createRadialGradient(w / 2, h * 0.45, 0, w / 2, h * 0.45, w * 0.6);
  spot.addColorStop(0, "rgba(251, 191, 36, 0.25)");
  spot.addColorStop(0.6, "rgba(251, 191, 36, 0.05)");
  spot.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = spot;
  ctx.fillRect(0, 0, w, h);

  // 推し配置
  drawOshiCentered(ctx, img, w, h, 0.65, 0.18);

  // タイトル
  drawText(ctx, "CENTER STAGE", w / 2, h * 0.08, `bold ${w * 0.08}px sans-serif`, "#fbbf24");

  // フッター
  drawText(ctx, "★ MAIN ACT ★", w / 2, h * 0.94, `${w * 0.04}px sans-serif`, "#fbbf24");
}

function renderGalaxy(ctx, w, h, img) {
  // 深い紫〜青グラデ
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, "#0f0035");
  grad.addColorStop(0.5, "#1e1b4b");
  grad.addColorStop(1, "#020617");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // ランダムな星点
  drawSparkles(ctx, w, h, 120, "#c7d2fe");

  // 推し配置
  drawOshiCentered(ctx, img, w, h, 0.65, 0.18);

  // タイトル
  drawText(ctx, "GALAXY IDOL", w / 2, h * 0.08, `bold ${w * 0.09}px sans-serif`, "#818cf8");

  // フッター
  drawText(ctx, "☆ BEYOND THE STARS ☆", w / 2, h * 0.94, `${w * 0.035}px sans-serif`, "#a5b4fc");
}

function renderNeon(ctx, w, h, img) {
  // 黒背景
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(0, 0, w, h);

  // ネオンピンクの枠線
  const m = w * 0.05;
  ctx.shadowColor = "#f472b6";
  ctx.shadowBlur = 20;
  ctx.strokeStyle = "#f472b6";
  ctx.lineWidth = 3;
  ctx.strokeRect(m, m, w - m * 2, h - m * 2);

  // 内側の二重枠
  ctx.shadowBlur = 10;
  ctx.lineWidth = 1;
  ctx.strokeRect(m + 10, m + 10, w - (m + 10) * 2, h - (m + 10) * 2);
  ctx.shadowBlur = 0;

  // 推し配置
  drawOshiCentered(ctx, img, w, h, 0.6, 0.2);

  // タイトル（ネオン風グロー）
  ctx.shadowColor = "#f472b6";
  ctx.shadowBlur = 15;
  drawText(ctx, "✦ NEON DREAM ✦", w / 2, h * 0.08, `bold ${w * 0.07}px sans-serif`, "#f472b6");
  ctx.shadowBlur = 0;

  // フッター
  ctx.shadowColor = "#f472b6";
  ctx.shadowBlur = 10;
  drawText(ctx, "✦ GLOW UP ✦", w / 2, h * 0.94, `${w * 0.04}px sans-serif`, "#f472b6");
  ctx.shadowBlur = 0;
}

function renderGold(ctx, w, h, img) {
  // 黒金グラデ背景
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, "#1a1000");
  grad.addColorStop(0.3, "#2a1a00");
  grad.addColorStop(0.7, "#1a1000");
  grad.addColorStop(1, "#0a0800");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // 金の枠
  const m = w * 0.04;
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 4;
  ctx.strokeRect(m, m, w - m * 2, h - m * 2);

  // 内側の装飾枠
  ctx.lineWidth = 1;
  ctx.strokeRect(m + 8, m + 8, w - (m + 8) * 2, h - (m + 8) * 2);

  // 推し配置
  drawOshiCentered(ctx, img, w, h, 0.6, 0.2);

  // タイトル
  drawText(ctx, "HALL OF FAME", w / 2, h * 0.08, `bold ${w * 0.08}px Georgia`, "#d4af37");

  // フッター
  drawText(ctx, "👑 LEGENDARY 👑", w / 2, h * 0.94, `${w * 0.04}px sans-serif`, "#d4af37");
}
