/**
 * LINEスタンプ風テンプレート定義
 * Canvas 370x320 に描画する
 */

export const TEMPLATES = [
  {
    id: "bubble",
    name: "BUBBLE",
    emoji: "💬",
    bgColor: "#ffffff",
    render: (ctx, w, h, petImg, text) => renderBubble(ctx, w, h, petImg, text),
  },
  {
    id: "shout",
    name: "SHOUT",
    emoji: "💥",
    bgColor: "#ffe033",
    render: (ctx, w, h, petImg, text) => renderShout(ctx, w, h, petImg, text),
  },
  {
    id: "heart",
    name: "HEART",
    emoji: "💖",
    bgColor: "#ffe0ec",
    render: (ctx, w, h, petImg, text) => renderHeart(ctx, w, h, petImg, text),
  },
  {
    id: "simple",
    name: "SIMPLE",
    emoji: "📝",
    bgColor: "#f0f0f0",
    render: (ctx, w, h, petImg, text) => renderSimple(ctx, w, h, petImg, text),
  },
  {
    id: "popart",
    name: "POP ART",
    emoji: "🎨",
    bgColor: "#ff6b35",
    render: (ctx, w, h, petImg, text) => renderPopArt(ctx, w, h, petImg, text),
  },
  {
    id: "cute",
    name: "CUTE",
    emoji: "⭐",
    bgColor: "#e8d5f5",
    render: (ctx, w, h, petImg, text) => renderCute(ctx, w, h, petImg, text),
  },
];

// --- 共通ヘルパー ---

function drawPetCentered(ctx, petImg, w, h, scale = 0.65, yOffset = 0.25) {
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

function drawStampText(ctx, text, x, y, fontSize, color, bold = false) {
  const weight = bold ? "bold " : "";
  ctx.font = `${weight}${fontSize}px "Hiragino Kaku Gothic ProN", "Noto Sans JP", sans-serif`;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, y);
}

// --- BUBBLE: 丸い吹き出し ---

function renderBubble(ctx, w, h, petImg, text) {
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);

  drawPetCentered(ctx, petImg, w, h, 0.65, 0.3);

  if (text) {
    const cx = w / 2;
    const cy = h * 0.12;
    const rx = Math.max(60, text.length * 16 + 30);
    const ry = 28;

    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2.5;

    // 楕円
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // 三角の尾
    ctx.beginPath();
    ctx.moveTo(cx - 10, cy + ry - 2);
    ctx.lineTo(cx, cy + ry + 18);
    ctx.lineTo(cx + 10, cy + ry - 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(cx - 10, cy + ry - 2);
    ctx.lineTo(cx, cy + ry + 18);
    ctx.lineTo(cx + 10, cy + ry - 2);
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // 尾の付け根を白で塗りつぶして線を消す
    ctx.fillStyle = "#fff";
    ctx.fillRect(cx - 12, cy + ry - 4, 24, 5);

    drawStampText(ctx, text, cx, cy, 20, "#333", true);
  }
}

// --- SHOUT: ギザギザ吹き出し ---

function renderShout(ctx, w, h, petImg, text) {
  ctx.fillStyle = "#ffe033";
  ctx.fillRect(0, 0, w, h);

  drawPetCentered(ctx, petImg, w, h, 0.6, 0.3);

  if (text) {
    const cx = w / 2;
    const cy = h * 0.13;
    const outerR = Math.max(50, text.length * 14 + 24);
    const innerR = outerR * 0.7;
    const spikes = 12;

    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#d32f2f";
    ctx.lineWidth = 3;

    ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
      const angle = (Math.PI * 2 * i) / (spikes * 2) - Math.PI / 2;
      const r = i % 2 === 0 ? outerR : innerR;
      const px = cx + Math.cos(angle) * r;
      const py = cy + Math.sin(angle) * (r * 0.7);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    drawStampText(ctx, text, cx, cy, 22, "#d32f2f", true);
  }
}

// --- HEART: ハート型吹き出し ---

function renderHeart(ctx, w, h, petImg, text) {
  ctx.fillStyle = "#ffe0ec";
  ctx.fillRect(0, 0, w, h);

  drawPetCentered(ctx, petImg, w, h, 0.6, 0.32);

  if (text) {
    const cx = w / 2;
    const cy = h * 0.13;
    const size = Math.max(36, text.length * 10 + 20);

    ctx.fillStyle = "#ff4081";
    ctx.beginPath();
    const topY = cy - size * 0.4;
    ctx.moveTo(cx, topY + size * 0.85);
    ctx.bezierCurveTo(cx - size, topY + size * 0.3, cx - size * 0.6, topY - size * 0.4, cx, topY + size * 0.1);
    ctx.bezierCurveTo(cx + size * 0.6, topY - size * 0.4, cx + size, topY + size * 0.3, cx, topY + size * 0.85);
    ctx.closePath();
    ctx.fill();

    drawStampText(ctx, text, cx, cy, 16, "#fff", true);
  }
}

// --- SIMPLE: LINEスタンプ風シンプル ---

function renderSimple(ctx, w, h, petImg, text) {
  ctx.clearRect(0, 0, w, h);

  drawPetCentered(ctx, petImg, w, h, 0.7, 0.05);

  if (text) {
    const bandH = 48;
    const bandY = h - bandH - 10;

    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.beginPath();
    ctx.roundRect(20, bandY, w - 40, bandH, 12);
    ctx.fill();

    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(20, bandY, w - 40, bandH, 12);
    ctx.stroke();

    drawStampText(ctx, text, w / 2, bandY + bandH / 2, 22, "#333", true);
  }
}

// --- POP ART: コミック風 ---

function renderPopArt(ctx, w, h, petImg, text) {
  ctx.fillStyle = "#ff6b35";
  ctx.fillRect(0, 0, w, h);

  // ドット柄背景
  ctx.fillStyle = "rgba(255,255,255,0.1)";
  for (let i = 0; i < w; i += 16) {
    for (let j = 0; j < h; j += 16) {
      ctx.beginPath();
      ctx.arc(i, j, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  drawPetCentered(ctx, petImg, w, h, 0.6, 0.3);

  if (text) {
    const cx = w / 2;
    const cy = h * 0.12;
    const bw = Math.max(100, text.length * 22 + 50);
    const bh = 44;

    // コミック吹き出し
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#222";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(cx - bw / 2, cy - bh / 2, bw, bh, 10);
    ctx.fill();
    ctx.stroke();

    // 尾
    ctx.beginPath();
    ctx.moveTo(cx - 8, cy + bh / 2 - 1);
    ctx.lineTo(cx + 5, cy + bh / 2 + 14);
    ctx.lineTo(cx + 12, cy + bh / 2 - 1);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.strokeStyle = "#222";
    ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.fillRect(cx - 10, cy + bh / 2 - 3, 24, 5);

    drawStampText(ctx, text + "!!", cx, cy, 22, "#d32f2f", true);
  }
}

// --- CUTE: パステルレインボー + 星 ---

function renderCute(ctx, w, h, petImg, text) {
  // パステルレインボーグラデーション
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, "#fce4ec");
  grad.addColorStop(0.25, "#e8d5f5");
  grad.addColorStop(0.5, "#d1e7ff");
  grad.addColorStop(0.75, "#d5f5e3");
  grad.addColorStop(1, "#fff9c4");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // 星の散らし
  const stars = [
    [30, 25], [340, 20], [50, 290], [320, 280],
    [180, 15], [15, 150], [355, 160],
  ];
  ctx.fillStyle = "rgba(255,215,0,0.4)";
  for (const [sx, sy] of stars) {
    drawStar(ctx, sx, sy, 6, 12, 5);
  }

  drawPetCentered(ctx, petImg, w, h, 0.6, 0.28);

  if (text) {
    const cx = w / 2;
    const cy = h * 0.12;
    const bw = Math.max(90, text.length * 20 + 40);
    const bh = 40;

    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.strokeStyle = "#e091c9";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(cx - bw / 2, cy - bh / 2, bw, bh, 20);
    ctx.fill();
    ctx.stroke();

    drawStampText(ctx, text, cx, cy, 20, "#c2185b", true);
  }
}

function drawStar(ctx, cx, cy, innerR, outerR, points) {
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const angle = (Math.PI * 2 * i) / (points * 2) - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
}
