/**
 * 映画ポスターテンプレート定義
 * 各テンプレートはCanvasに描画する関数を持つ
 */

export const TEMPLATES = [
  {
    id: "fast",
    name: "FAST",
    emoji: "🔥",
    bgColor: "#1a0800",
    render: (ctx, w, h, carImg) => renderFast(ctx, w, h, carImg),
  },
  {
    id: "noir",
    name: "NOIR",
    emoji: "🎬",
    bgColor: "#1a1a1a",
    render: (ctx, w, h, carImg) => renderNoir(ctx, w, h, carImg),
  },
  {
    id: "neon",
    name: "NEON NIGHTS",
    emoji: "💜",
    bgColor: "#0a0014",
    render: (ctx, w, h, carImg) => renderNeon(ctx, w, h, carImg),
  },
  {
    id: "gt",
    name: "GRAN TURISMO",
    emoji: "🏁",
    bgColor: "#0a1428",
    render: (ctx, w, h, carImg) => renderGT(ctx, w, h, carImg),
  },
  {
    id: "vintage",
    name: "VINTAGE",
    emoji: "📜",
    bgColor: "#d4a76a",
    render: (ctx, w, h, carImg) => renderVintage(ctx, w, h, carImg),
  },
  {
    id: "cyber",
    name: "CYBERPUNK",
    emoji: "🌆",
    bgColor: "#0a0028",
    render: (ctx, w, h, carImg) => renderCyber(ctx, w, h, carImg),
  },
];

// --- 共通ヘルパー ---

function drawCarCentered(ctx, carImg, w, h, scale = 0.7, yRatio = 0.55) {
  const aspect = carImg.width / carImg.height;
  let dw, dh;
  if (aspect > w / h) {
    dw = w * scale;
    dh = dw / aspect;
  } else {
    dh = h * scale;
    dw = dh * aspect;
  }
  const x = (w - dw) / 2;
  const y = h * yRatio - dh / 2;
  ctx.drawImage(carImg, x, y, dw, dh);
}

function drawText(ctx, text, x, y, font, color, align = "center") {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.fillText(text, x, y);
}

// --- FAST（ワイルドスピード風） ---

function renderFast(ctx, w, h, carImg) {
  // 黒背景
  ctx.fillStyle = "#0a0000";
  ctx.fillRect(0, 0, w, h);

  // 下からオレンジ〜赤グラデ（炎風）
  const flameGrad = ctx.createLinearGradient(0, h * 0.5, 0, h);
  flameGrad.addColorStop(0, "rgba(255,80,0,0)");
  flameGrad.addColorStop(0.4, "rgba(255,100,0,0.3)");
  flameGrad.addColorStop(0.7, "rgba(255,60,0,0.6)");
  flameGrad.addColorStop(1, "rgba(200,20,0,0.8)");
  ctx.fillStyle = flameGrad;
  ctx.fillRect(0, h * 0.5, w, h * 0.5);

  // スピードライン（横線を複数描画）
  ctx.strokeStyle = "rgba(255,120,0,0.25)";
  ctx.lineWidth = 2;
  for (let i = 0; i < 30; i++) {
    const y = Math.random() * h * 0.7 + h * 0.15;
    const xStart = Math.random() * w * 0.3;
    const xEnd = xStart + Math.random() * w * 0.5 + w * 0.2;
    ctx.beginPath();
    ctx.moveTo(xStart, y);
    ctx.lineTo(xEnd, y);
    ctx.stroke();
  }

  // 車を中央下部に
  drawCarCentered(ctx, carImg, w, h, 0.75, 0.6);

  // 「FAST」大きい文字（上部）
  ctx.save();
  ctx.shadowColor = "rgba(255,80,0,0.8)";
  ctx.shadowBlur = 20;
  drawText(ctx, "FAST", w / 2, h * 0.15, `bold ${w * 0.12}px sans-serif`, "#ff6600");
  ctx.restore();

  // サブテキスト
  drawText(ctx, "NO LIMITS", w / 2, h * 0.92, `bold ${w * 0.03}px sans-serif`, "rgba(255,150,50,0.7)");
}

// --- NOIR（フィルムノワール） ---

function renderNoir(ctx, w, h, carImg) {
  // 暗いグレー背景
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(0, 0, w, h);

  // ノイズ風のドット
  ctx.fillStyle = "rgba(255,255,255,0.03)";
  for (let i = 0; i < 2000; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    ctx.fillRect(x, y, 1, 1);
  }

  // 車を中央に
  drawCarCentered(ctx, carImg, w, h, 0.7, 0.55);

  // 上部タイトル
  drawText(ctx, "THE DRIVER", w / 2, h * 0.12, `bold ${w * 0.08}px Georgia`, "#ffffff");

  // 下部クレジット
  drawText(ctx, "A Film by...", w / 2, h * 0.88, `italic ${w * 0.025}px Georgia`, "#888888");
  drawText(ctx, "COMING SOON", w / 2, h * 0.93, `${w * 0.02}px sans-serif`, "#666666");
}

// --- NEON NIGHTS ---

function renderNeon(ctx, w, h, carImg) {
  // 黒背景
  ctx.fillStyle = "#050010";
  ctx.fillRect(0, 0, w, h);

  // ネオンピンク・紫のグロー（ぼかし付き長方形）
  ctx.save();
  ctx.shadowBlur = 60;
  ctx.shadowColor = "#ff00ff";
  ctx.fillStyle = "rgba(255,0,180,0.15)";
  ctx.fillRect(w * 0.05, h * 0.3, w * 0.4, h * 0.4);
  ctx.shadowColor = "#8800ff";
  ctx.fillStyle = "rgba(100,0,255,0.15)";
  ctx.fillRect(w * 0.55, h * 0.25, w * 0.4, h * 0.45);
  ctx.restore();

  // 道路の反射線
  ctx.strokeStyle = "rgba(255,0,200,0.3)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 8; i++) {
    const y = h * 0.75 + i * h * 0.03;
    ctx.beginPath();
    ctx.moveTo(w * 0.1, y);
    ctx.lineTo(w * 0.9, y);
    ctx.stroke();
  }

  // 車
  drawCarCentered(ctx, carImg, w, h, 0.7, 0.55);

  // ネオン文字
  ctx.save();
  ctx.shadowColor = "#ff00ff";
  ctx.shadowBlur = 30;
  drawText(ctx, "NEON NIGHTS", w / 2, h * 0.13, `bold ${w * 0.07}px sans-serif`, "#ff44cc");
  ctx.restore();

  drawText(ctx, "DRIVE THE LIGHT", w / 2, h * 0.93, `${w * 0.025}px sans-serif`, "rgba(255,0,200,0.6)");
}

// --- GRAN TURISMO ---

function renderGT(ctx, w, h, carImg) {
  // 暗い青背景
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, "#0a1428");
  grad.addColorStop(1, "#050a14");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // チェッカーフラッグパターン（上帯）
  const checkSize = w * 0.025;
  for (let col = 0; col < Math.ceil(w / checkSize); col++) {
    for (let row = 0; row < 2; row++) {
      const isBlack = (col + row) % 2 === 0;
      ctx.fillStyle = isBlack ? "#222" : "#ddd";
      ctx.fillRect(col * checkSize, row * checkSize, checkSize, checkSize);
    }
  }

  // チェッカーフラッグパターン（下帯）
  for (let col = 0; col < Math.ceil(w / checkSize); col++) {
    for (let row = 0; row < 2; row++) {
      const isBlack = (col + row) % 2 === 0;
      ctx.fillStyle = isBlack ? "#222" : "#ddd";
      ctx.fillRect(col * checkSize, h - checkSize * 2 + row * checkSize, checkSize, checkSize);
    }
  }

  // 車
  drawCarCentered(ctx, carImg, w, h, 0.75, 0.55);

  // タイトル
  drawText(ctx, "GRAN TURISMO", w / 2, h * 0.18, `bold ${w * 0.07}px sans-serif`, "#ffffff");

  // サブテキスト
  drawText(ctx, "THE REAL DRIVING SIMULATOR", w / 2, h * 0.23, `${w * 0.02}px sans-serif`, "#6688aa");
}

// --- VINTAGE ---

function renderVintage(ctx, w, h, carImg) {
  // セピア色背景
  ctx.fillStyle = "#d4a76a";
  ctx.fillRect(0, 0, w, h);

  // ビネット風の暗がり
  const vigGrad = ctx.createRadialGradient(w / 2, h / 2, w * 0.2, w / 2, h / 2, w * 0.7);
  vigGrad.addColorStop(0, "rgba(0,0,0,0)");
  vigGrad.addColorStop(1, "rgba(80,40,0,0.4)");
  ctx.fillStyle = vigGrad;
  ctx.fillRect(0, 0, w, h);

  // 枠線（ダブルライン）
  const m1 = w * 0.03;
  const m2 = w * 0.05;
  ctx.strokeStyle = "#5a3a1a";
  ctx.lineWidth = 2;
  ctx.strokeRect(m1, m1, w - m1 * 2, h - m1 * 2);
  ctx.strokeRect(m2, m2, w - m2 * 2, h - m2 * 2);

  // 車
  drawCarCentered(ctx, carImg, w, h, 0.65, 0.55);

  // タイトル
  drawText(ctx, "CLASSIC RIDE", w / 2, h * 0.14, `bold ${w * 0.07}px Georgia`, "#3a2210");

  // サブテキスト
  drawText(ctx, "A Timeless Journey", w / 2, h * 0.9, `italic ${w * 0.025}px Georgia`, "#5a3a1a");
}

// --- CYBERPUNK ---

function renderCyber(ctx, w, h, carImg) {
  // 暗い紫〜青グラデ
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, "#1a0040");
  grad.addColorStop(0.5, "#0a0028");
  grad.addColorStop(1, "#000a1a");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // レトロウェーブ太陽（半円＋横線）
  const sunX = w / 2;
  const sunY = h * 0.35;
  const sunR = w * 0.18;
  ctx.save();
  ctx.beginPath();
  ctx.arc(sunX, sunY, sunR, Math.PI, 0);
  ctx.closePath();
  const sunGrad = ctx.createLinearGradient(sunX, sunY - sunR, sunX, sunY);
  sunGrad.addColorStop(0, "#ff6600");
  sunGrad.addColorStop(0.5, "#ff0066");
  sunGrad.addColorStop(1, "#aa00ff");
  ctx.fillStyle = sunGrad;
  ctx.fill();

  // 太陽の横線（スリット）
  ctx.fillStyle = "#0a0028";
  for (let i = 1; i <= 6; i++) {
    const lineY = sunY - sunR + i * (sunR / 7);
    ctx.fillRect(sunX - sunR, lineY, sunR * 2, 3);
  }
  ctx.restore();

  // グリッドライン（遠近法風）
  ctx.strokeStyle = "rgba(0,255,255,0.2)";
  ctx.lineWidth = 1;

  // 横線（手前ほど間隔広く）
  for (let i = 0; i < 12; i++) {
    const ratio = i / 12;
    const y = h * 0.65 + (h * 0.35) * (ratio * ratio);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // 縦線（中央から放射状）
  for (let i = -8; i <= 8; i++) {
    const topX = w / 2 + i * w * 0.02;
    const bottomX = w / 2 + i * w * 0.12;
    ctx.beginPath();
    ctx.moveTo(topX, h * 0.65);
    ctx.lineTo(bottomX, h);
    ctx.stroke();
  }

  // 車
  drawCarCentered(ctx, carImg, w, h, 0.7, 0.6);

  // シアン文字
  ctx.save();
  ctx.shadowColor = "#00ffff";
  ctx.shadowBlur = 20;
  drawText(ctx, "CYBER DRIVE", w / 2, h * 0.13, `bold ${w * 0.07}px sans-serif`, "#00ffff");
  ctx.restore();

  drawText(ctx, "2 0 7 7", w / 2, h * 0.93, `${w * 0.03}px sans-serif`, "rgba(0,255,255,0.5)");
}
