/**
 * 赤ちゃん成長カード テンプレート定義
 * 各テンプレートはCanvasに描画する関数を持つ
 */

export const TEMPLATES = [
  {
    id: "pastel",
    name: "PASTEL",
    emoji: "🌸",
    bgColor: "#fce4ec",
    accentColor: "#e91e63",
    render: (ctx, w, h, img, months, name) => renderPastel(ctx, w, h, img, months, name),
  },
  {
    id: "minimal",
    name: "MINIMAL",
    emoji: "⬜",
    bgColor: "#ffffff",
    accentColor: "#333333",
    render: (ctx, w, h, img, months, name) => renderMinimal(ctx, w, h, img, months, name),
  },
  {
    id: "flower",
    name: "FLOWER",
    emoji: "🌼",
    bgColor: "#e8f5e9",
    accentColor: "#4caf50",
    render: (ctx, w, h, img, months, name) => renderFlower(ctx, w, h, img, months, name),
  },
  {
    id: "star",
    name: "STAR",
    emoji: "⭐",
    bgColor: "#1a237e",
    accentColor: "#ffd700",
    render: (ctx, w, h, img, months, name) => renderStar(ctx, w, h, img, months, name),
  },
  {
    id: "rainbow",
    name: "RAINBOW",
    emoji: "🌈",
    bgColor: "#ffffff",
    accentColor: "#ff5722",
    render: (ctx, w, h, img, months, name) => renderRainbow(ctx, w, h, img, months, name),
  },
  {
    id: "kraft",
    name: "KRAFT",
    emoji: "📦",
    bgColor: "#d7ccc8",
    accentColor: "#5d4037",
    render: (ctx, w, h, img, months, name) => renderKraft(ctx, w, h, img, months, name),
  },
];

// --- 共通ヘルパー ---

function drawBabyCentered(ctx, img, w, h, scale = 0.6, yOffset = 0.2) {
  const aspect = img.width / img.height;
  let dw, dh;
  if (aspect > 1) {
    dw = w * scale;
    dh = dw / aspect;
  } else {
    dh = h * scale;
    dw = dh * aspect;
  }
  const x = (w - dw) / 2;
  const y = h * yOffset + (h * (0.7 - yOffset) - dh) / 2 + h * 0.05;
  ctx.drawImage(img, x, y, dw, dh);
}

function drawText(ctx, text, x, y, font, color, align = "center") {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, y);
}

function monthsLabel(months) {
  const m = Number(months);
  if (isNaN(m) || m < 0) return "";
  return `${m} months`;
}

function drawNameText(ctx, name, x, y, font, color) {
  if (!name) return;
  drawText(ctx, name, x, y, font, color);
}

// --- 花を描くヘルパー ---
function drawFlower(ctx, cx, cy, r, petalColor, centerColor) {
  const petals = 6;
  ctx.fillStyle = petalColor;
  for (let i = 0; i < petals; i++) {
    const angle = (Math.PI * 2 * i) / petals;
    const px = cx + Math.cos(angle) * r * 0.6;
    const py = cy + Math.sin(angle) * r * 0.6;
    ctx.beginPath();
    ctx.arc(px, py, r * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = centerColor;
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.35, 0, Math.PI * 2);
  ctx.fill();
}

// --- 星を描くヘルパー ---
function drawStar5(ctx, cx, cy, outerR, innerR, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (Math.PI * 2 * i) / 10 - Math.PI / 2;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
}

// --- テンプレート描画 ---

function renderPastel(ctx, w, h, img, months, name) {
  // パステルピンクグラデーション
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, "#fce4ec");
  grad.addColorStop(1, "#f8bbd0");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // 赤ちゃん
  drawBabyCentered(ctx, img, w, h, 0.6, 0.15);

  // 月齢（大きく表示）
  const label = monthsLabel(months);
  if (label) {
    drawText(ctx, label, w / 2, h * 0.82, `bold ${w * 0.09}px 'Georgia', serif`, "#c2185b");
  }

  // 名前
  drawNameText(ctx, name, w / 2, h * 0.91, `${w * 0.05}px 'Georgia', serif`, "#ad1457");
}

function renderMinimal(ctx, w, h, img, months, name) {
  // 白背景
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);

  // 赤ちゃん
  drawBabyCentered(ctx, img, w, h, 0.55, 0.18);

  // 月齢（細字）
  const label = monthsLabel(months);
  if (label) {
    drawText(ctx, label, w / 2, h * 0.82, `300 ${w * 0.07}px 'Helvetica Neue', sans-serif`, "#333");
  }

  // 名前
  drawNameText(ctx, name, w / 2, h * 0.90, `300 ${w * 0.04}px 'Helvetica Neue', sans-serif`, "#666");

  // シンプルなライン
  ctx.strokeStyle = "#ddd";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(w * 0.3, h * 0.76);
  ctx.lineTo(w * 0.7, h * 0.76);
  ctx.stroke();
}

function renderFlower(ctx, w, h, img, months, name) {
  // 淡い緑背景
  ctx.fillStyle = "#e8f5e9";
  ctx.fillRect(0, 0, w, h);

  // 四隅に花
  const flowerPositions = [
    [w * 0.1, h * 0.08],
    [w * 0.9, h * 0.08],
    [w * 0.1, h * 0.92],
    [w * 0.9, h * 0.92],
  ];
  const petalColors = ["#f48fb1", "#ce93d8", "#90caf9", "#a5d6a7"];
  flowerPositions.forEach(([fx, fy], i) => {
    drawFlower(ctx, fx, fy, w * 0.06, petalColors[i], "#fff9c4");
  });

  // 追加の小花
  const smallFlowers = [
    [w * 0.25, h * 0.04], [w * 0.75, h * 0.04],
    [w * 0.04, h * 0.5], [w * 0.96, h * 0.5],
    [w * 0.25, h * 0.96], [w * 0.75, h * 0.96],
  ];
  smallFlowers.forEach(([fx, fy], i) => {
    drawFlower(ctx, fx, fy, w * 0.03, petalColors[i % petalColors.length], "#fff9c4");
  });

  // 赤ちゃん
  drawBabyCentered(ctx, img, w, h, 0.55, 0.15);

  // 月齢
  const label = monthsLabel(months);
  if (label) {
    drawText(ctx, label, w / 2, h * 0.82, `bold ${w * 0.07}px 'Georgia', serif`, "#2e7d32");
  }

  // 名前
  drawNameText(ctx, name, w / 2, h * 0.90, `${w * 0.045}px 'Georgia', serif`, "#388e3c");
}

function renderStar(ctx, w, h, img, months, name) {
  // ネイビー背景
  ctx.fillStyle = "#1a237e";
  ctx.fillRect(0, 0, w, h);

  // ランダムな星（シード的に固定位置）
  const starPositions = [
    [0.08, 0.05], [0.25, 0.03], [0.42, 0.07], [0.65, 0.04], [0.85, 0.06],
    [0.05, 0.25], [0.92, 0.2], [0.03, 0.5], [0.95, 0.45],
    [0.1, 0.75], [0.88, 0.78], [0.3, 0.95], [0.55, 0.93], [0.78, 0.96],
    [0.15, 0.93], [0.92, 0.9], [0.5, 0.03],
  ];
  starPositions.forEach(([sx, sy]) => {
    const size = w * (0.015 + Math.random() * 0.015);
    drawStar5(ctx, w * sx, h * sy, size, size * 0.4, "rgba(255, 215, 0, 0.7)");
  });

  // 赤ちゃん
  drawBabyCentered(ctx, img, w, h, 0.55, 0.15);

  // 月齢（金文字）
  const label = monthsLabel(months);
  if (label) {
    drawText(ctx, label, w / 2, h * 0.82, `bold ${w * 0.08}px 'Georgia', serif`, "#ffd700");
  }

  // 名前
  drawNameText(ctx, name, w / 2, h * 0.90, `${w * 0.045}px 'Georgia', serif`, "#ffecb3");
}

function renderRainbow(ctx, w, h, img, months, name) {
  // 白背景
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);

  // 上部に虹のアーチ
  const rainbowColors = ["#f44336", "#ff9800", "#ffeb3b", "#4caf50", "#2196f3", "#9c27b0"];
  const centerX = w / 2;
  const centerY = h * 0.25;
  const baseRadius = w * 0.45;

  rainbowColors.forEach((color, i) => {
    const r = baseRadius - i * (w * 0.025);
    ctx.beginPath();
    ctx.arc(centerX, centerY, r, Math.PI, 0);
    ctx.strokeStyle = color;
    ctx.lineWidth = w * 0.02;
    ctx.stroke();
  });

  // 赤ちゃん
  drawBabyCentered(ctx, img, w, h, 0.5, 0.22);

  // 月齢
  const label = monthsLabel(months);
  if (label) {
    drawText(ctx, label, w / 2, h * 0.83, `bold ${w * 0.07}px 'Georgia', serif`, "#ff5722");
  }

  // 名前
  drawNameText(ctx, name, w / 2, h * 0.91, `${w * 0.045}px 'Georgia', serif`, "#e64a19");
}

function renderKraft(ctx, w, h, img, months, name) {
  // ベージュ背景
  ctx.fillStyle = "#d7ccc8";
  ctx.fillRect(0, 0, w, h);

  // ステッチ風の点線枠
  ctx.setLineDash([8, 6]);
  ctx.strokeStyle = "#5d4037";
  ctx.lineWidth = 3;
  const margin = w * 0.06;
  ctx.strokeRect(margin, margin, w - margin * 2, h - margin * 2);
  ctx.setLineDash([]);

  // 赤ちゃん
  drawBabyCentered(ctx, img, w, h, 0.55, 0.15);

  // 月齢
  const label = monthsLabel(months);
  if (label) {
    drawText(ctx, label, w / 2, h * 0.82, `bold ${w * 0.07}px 'Georgia', serif`, "#4e342e");
  }

  // 名前
  drawNameText(ctx, name, w / 2, h * 0.90, `${w * 0.045}px 'Georgia', serif`, "#5d4037");
}
