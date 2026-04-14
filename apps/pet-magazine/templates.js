/**
 * 雑誌表紙テンプレート定義
 * 各テンプレートはCanvasに描画する関数を持つ
 */

export const TEMPLATES = [
  {
    id: "vogue",
    name: "VOGUE PET",
    emoji: "✨",
    bgColor: "#1a0a0a",
    accentColor: "#d4af37",
    render: (ctx, w, h, petImg) => renderVogue(ctx, w, h, petImg),
  },
  {
    id: "time",
    name: "TIME",
    emoji: "🏆",
    bgColor: "#8b0000",
    accentColor: "#ffffff",
    render: (ctx, w, h, petImg) => renderTime(ctx, w, h, petImg),
  },
  {
    id: "national",
    name: "NATURE",
    emoji: "🌿",
    bgColor: "#0a1a0a",
    accentColor: "#ffd700",
    render: (ctx, w, h, petImg) => renderNature(ctx, w, h, petImg),
  },
  {
    id: "cosmo",
    name: "COSMO PET",
    emoji: "💖",
    bgColor: "#2d0a3e",
    accentColor: "#ff69b4",
    render: (ctx, w, h, petImg) => renderCosmo(ctx, w, h, petImg),
  },
  {
    id: "gq",
    name: "GQ PETS",
    emoji: "🎩",
    bgColor: "#0a0a1a",
    accentColor: "#c0c0c0",
    render: (ctx, w, h, petImg) => renderGQ(ctx, w, h, petImg),
  },
  {
    id: "pop",
    name: "POP!",
    emoji: "🎉",
    bgColor: "#ff6b35",
    accentColor: "#ffffff",
    render: (ctx, w, h, petImg) => renderPop(ctx, w, h, petImg),
  },
];

// --- 共通ヘルパー ---

function drawPetCentered(ctx, petImg, w, h, scale = 0.75, yOffset = 0.15) {
  const aspect = petImg.width / petImg.height;
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
  ctx.drawImage(petImg, x, y, dw, dh);
}

function drawText(ctx, text, x, y, font, color, align = "center") {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.fillText(text, x, y);
}

function drawMagazineBar(ctx, w, color) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, w, 4);
}

// --- テンプレートごとの描画 ---

function renderVogue(ctx, w, h, petImg) {
  // 背景
  ctx.fillStyle = "#1a0a0a";
  ctx.fillRect(0, 0, w, h);

  // ペット
  drawPetCentered(ctx, petImg, w, h, 0.8, 0.18);

  // ロゴ
  drawText(ctx, "VOGUE", w / 2, h * 0.1, `bold ${w * 0.12}px Georgia`, "#d4af37");
  drawText(ctx, "PET", w / 2, h * 0.15, `${w * 0.04}px Georgia`, "#d4af37");

  // フッター
  drawText(ctx, "Pet of the Year 2026", w / 2, h * 0.94, `${w * 0.035}px sans-serif`, "#888");
  drawMagazineBar(ctx, w, "#d4af37");
}

function renderTime(ctx, w, h, petImg) {
  ctx.fillStyle = "#8b0000";
  ctx.fillRect(0, 0, w, h);

  // 白枠
  const m = w * 0.04;
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 3;
  ctx.strokeRect(m, m, w - m * 2, h - m * 2);

  drawPetCentered(ctx, petImg, w, h, 0.7, 0.2);

  drawText(ctx, "TIME", w / 2, h * 0.12, `bold ${w * 0.14}px Georgia`, "#fff");
  drawText(ctx, "Pet of the Year", w / 2, h * 0.9, `italic ${w * 0.045}px Georgia`, "#fff");
  drawMagazineBar(ctx, w, "#fff");
}

function renderNature(ctx, w, h, petImg) {
  ctx.fillStyle = "#0a1a0a";
  ctx.fillRect(0, 0, w, h);

  drawPetCentered(ctx, petImg, w, h, 0.8, 0.2);

  // ロゴ（黄色枠付き）
  ctx.strokeStyle = "#ffd700";
  ctx.lineWidth = 3;
  ctx.strokeRect(w * 0.15, h * 0.03, w * 0.7, h * 0.1);
  drawText(ctx, "NATURE", w / 2, h * 0.1, `bold ${w * 0.09}px sans-serif`, "#ffd700");

  drawText(ctx, "The Most Beautiful Creature", w / 2, h * 0.93, `${w * 0.035}px sans-serif`, "#aaa");
  drawMagazineBar(ctx, w, "#ffd700");
}

function renderCosmo(ctx, w, h, petImg) {
  // グラデーション背景
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, "#2d0a3e");
  grad.addColorStop(1, "#1a0a2e");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  drawPetCentered(ctx, petImg, w, h, 0.8, 0.18);

  drawText(ctx, "COSMO", w / 2, h * 0.09, `bold ${w * 0.11}px sans-serif`, "#ff69b4");
  drawText(ctx, "PET", w / 2, h * 0.14, `${w * 0.05}px sans-serif`, "#ff69b4");

  drawText(ctx, "♥ 100 Reasons We Love You ♥", w / 2, h * 0.93, `${w * 0.032}px sans-serif`, "#ff69b4");
  drawMagazineBar(ctx, w, "#ff69b4");
}

function renderGQ(ctx, w, h, petImg) {
  ctx.fillStyle = "#0a0a1a";
  ctx.fillRect(0, 0, w, h);

  drawPetCentered(ctx, petImg, w, h, 0.8, 0.18);

  drawText(ctx, "GQ", w / 2, h * 0.11, `bold ${w * 0.16}px Georgia`, "#c0c0c0");
  drawText(ctx, "PETS", w / 2, h * 0.16, `${w * 0.06}px Georgia`, "#c0c0c0");

  drawText(ctx, "Style Icon of the Year", w / 2, h * 0.93, `italic ${w * 0.035}px Georgia`, "#888");
  drawMagazineBar(ctx, w, "#c0c0c0");
}

function renderPop(ctx, w, h, petImg) {
  ctx.fillStyle = "#ff6b35";
  ctx.fillRect(0, 0, w, h);

  // ドット柄
  ctx.fillStyle = "rgba(255,255,255,0.08)";
  for (let i = 0; i < w; i += 20) {
    for (let j = 0; j < h; j += 20) {
      ctx.beginPath();
      ctx.arc(i, j, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  drawPetCentered(ctx, petImg, w, h, 0.8, 0.18);

  drawText(ctx, "POP!", w / 2, h * 0.11, `bold ${w * 0.14}px sans-serif`, "#fff");

  // 吹き出し風テキスト
  drawText(ctx, "★ SUPERSTAR ★", w / 2, h * 0.93, `bold ${w * 0.045}px sans-serif`, "#fff");
  drawMagazineBar(ctx, w, "#fff");
}
