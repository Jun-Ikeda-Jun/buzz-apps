/**
 * Nui Travel - 世界名所テンプレート定義
 * 背景は全てCanvas描画（外部画像不要）
 */

export const TEMPLATES = [
  {
    id: "paris",
    name: "パリ",
    emoji: "🗼",
    bgColor: "#87ceeb",
    render: (ctx, w, h, nuiImg) => renderParis(ctx, w, h, nuiImg),
  },
  {
    id: "tokyo",
    name: "東京",
    emoji: "🏙️",
    bgColor: "#ff7043",
    render: (ctx, w, h, nuiImg) => renderTokyo(ctx, w, h, nuiImg),
  },
  {
    id: "nyc",
    name: "ニューヨーク",
    emoji: "🗽",
    bgColor: "#4fc3f7",
    render: (ctx, w, h, nuiImg) => renderNYC(ctx, w, h, nuiImg),
  },
  {
    id: "space",
    name: "宇宙",
    emoji: "🚀",
    bgColor: "#1a0033",
    render: (ctx, w, h, nuiImg) => renderSpace(ctx, w, h, nuiImg),
  },
  {
    id: "beach",
    name: "ビーチ",
    emoji: "🏖️",
    bgColor: "#00bcd4",
    render: (ctx, w, h, nuiImg) => renderBeach(ctx, w, h, nuiImg),
  },
  {
    id: "snow",
    name: "雪国",
    emoji: "❄️",
    bgColor: "#b0bec5",
    render: (ctx, w, h, nuiImg) => renderSnow(ctx, w, h, nuiImg),
  },
];

// --- 共通ヘルパー ---

function drawNuiOnGround(ctx, nuiImg, w, h, scale = 0.45) {
  const aspect = nuiImg.width / nuiImg.height;
  let dw, dh;
  if (aspect > 1) {
    dw = w * scale;
    dh = dw / aspect;
  } else {
    dh = h * scale;
    dw = dh * aspect;
  }
  const x = (w - dw) / 2;
  const y = h - dh - h * 0.02;
  ctx.drawImage(nuiImg, x, y, dw, dh);
}

function drawNuiFloating(ctx, nuiImg, w, h, scale = 0.4) {
  const aspect = nuiImg.width / nuiImg.height;
  let dw, dh;
  if (aspect > 1) {
    dw = w * scale;
    dh = dw / aspect;
  } else {
    dh = h * scale;
    dw = dh * aspect;
  }
  const x = (w - dw) / 2;
  const y = (h - dh) / 2 + h * 0.05;
  ctx.drawImage(nuiImg, x, y, dw, dh);
}

function drawCaption(ctx, text, w, h, color = "#fff", shadow = true) {
  const fontSize = w * 0.055;
  ctx.font = `bold ${fontSize}px sans-serif`;
  ctx.textAlign = "center";
  if (shadow) {
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillText(text, w / 2 + 2, h * 0.08 + 2);
  }
  ctx.fillStyle = color;
  ctx.fillText(text, w / 2, h * 0.08);
}

// --- seeded random for consistent star/snow placement ---
function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

// --- テンプレート描画 ---

function renderParis(ctx, w, h, nuiImg) {
  // 空
  const sky = ctx.createLinearGradient(0, 0, 0, h * 0.7);
  sky.addColorStop(0, "#87ceeb");
  sky.addColorStop(1, "#b3e5fc");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  // 地面
  ctx.fillStyle = "#a5d6a7";
  ctx.fillRect(0, h * 0.75, w, h * 0.25);

  // エッフェル塔シルエット
  ctx.fillStyle = "rgba(55,55,55,0.35)";
  const tx = w * 0.75;
  const tBase = h * 0.75;
  const tTop = h * 0.12;
  ctx.beginPath();
  ctx.moveTo(tx, tTop);
  ctx.lineTo(tx - w * 0.06, tBase);
  ctx.lineTo(tx + w * 0.06, tBase);
  ctx.closePath();
  ctx.fill();
  // 塔の上部アンテナ
  ctx.strokeStyle = "rgba(55,55,55,0.35)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(tx, tTop);
  ctx.lineTo(tx, tTop - h * 0.05);
  ctx.stroke();
  // 横梁
  ctx.beginPath();
  ctx.moveTo(tx - w * 0.035, tBase * 0.55);
  ctx.lineTo(tx + w * 0.035, tBase * 0.55);
  ctx.stroke();

  drawNuiOnGround(ctx, nuiImg, w, h);
  drawCaption(ctx, "Bonjour Paris!", w, h, "#fff");
}

function renderTokyo(ctx, w, h, nuiImg) {
  // 夕焼け空
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, "#ff7043");
  sky.addColorStop(0.4, "#ff8a65");
  sky.addColorStop(0.7, "#ce93d8");
  sky.addColorStop(1, "#4a148c");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  // ビル群シルエット
  ctx.fillStyle = "rgba(20,20,40,0.5)";
  const buildings = [
    [0.05, 0.55, 0.06], [0.12, 0.48, 0.05], [0.18, 0.58, 0.07],
    [0.26, 0.42, 0.04], [0.31, 0.52, 0.06], [0.38, 0.45, 0.05],
    [0.85, 0.50, 0.06], [0.78, 0.55, 0.05], [0.92, 0.48, 0.06],
  ];
  buildings.forEach(([bx, by, bw]) => {
    ctx.fillRect(w * bx, h * by, w * bw, h - h * by);
  });

  // 東京タワーシルエット
  ctx.fillStyle = "rgba(180,40,40,0.45)";
  const ttx = w * 0.6;
  const ttBase = h * 0.78;
  const ttTop = h * 0.10;
  ctx.beginPath();
  ctx.moveTo(ttx, ttTop);
  ctx.lineTo(ttx - w * 0.045, ttBase);
  ctx.lineTo(ttx + w * 0.045, ttBase);
  ctx.closePath();
  ctx.fill();
  // アンテナ
  ctx.strokeStyle = "rgba(180,40,40,0.45)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(ttx, ttTop);
  ctx.lineTo(ttx, ttTop - h * 0.04);
  ctx.stroke();

  // 地面
  ctx.fillStyle = "rgba(20,20,40,0.6)";
  ctx.fillRect(0, h * 0.78, w, h * 0.22);

  drawNuiOnGround(ctx, nuiImg, w, h);
  drawCaption(ctx, "Hello Tokyo!", w, h, "#fff");
}

function renderNYC(ctx, w, h, nuiImg) {
  // 青空
  const sky = ctx.createLinearGradient(0, 0, 0, h * 0.7);
  sky.addColorStop(0, "#42a5f5");
  sky.addColorStop(1, "#90caf9");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  // 地面
  ctx.fillStyle = "#78909c";
  ctx.fillRect(0, h * 0.78, w, h * 0.22);

  // 自由の女神シルエット
  ctx.fillStyle = "rgba(60,80,70,0.35)";
  const sx = w * 0.2;
  const sBase = h * 0.78;
  // 台座
  ctx.fillRect(sx - w * 0.04, sBase - h * 0.08, w * 0.08, h * 0.08);
  ctx.fillRect(sx - w * 0.025, sBase - h * 0.35, w * 0.05, h * 0.27);
  // 頭
  ctx.beginPath();
  ctx.arc(sx, sBase - h * 0.38, w * 0.025, 0, Math.PI * 2);
  ctx.fill();
  // 王冠のトゲ
  const crownY = sBase - h * 0.40;
  for (let i = -3; i <= 3; i++) {
    ctx.beginPath();
    ctx.moveTo(sx + i * w * 0.008, crownY);
    ctx.lineTo(sx + i * w * 0.005, crownY - h * 0.04);
    ctx.lineTo(sx + i * w * 0.011, crownY);
    ctx.fill();
  }
  // トーチ（右腕）
  ctx.strokeStyle = "rgba(60,80,70,0.35)";
  ctx.lineWidth = w * 0.012;
  ctx.beginPath();
  ctx.moveTo(sx + w * 0.025, sBase - h * 0.30);
  ctx.lineTo(sx + w * 0.05, sBase - h * 0.48);
  ctx.stroke();
  // 炎
  ctx.fillStyle = "rgba(255,200,50,0.5)";
  ctx.beginPath();
  ctx.arc(sx + w * 0.05, sBase - h * 0.50, w * 0.015, 0, Math.PI * 2);
  ctx.fill();

  drawNuiOnGround(ctx, nuiImg, w, h);
  drawCaption(ctx, "I \u2665 NY", w, h, "#fff");
}

function renderSpace(ctx, w, h, nuiImg) {
  // 宇宙背景
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, "#000011");
  bg.addColorStop(0.5, "#1a0033");
  bg.addColorStop(1, "#0d0022");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // 星
  const rand = seededRandom(42);
  ctx.fillStyle = "#fff";
  for (let i = 0; i < 200; i++) {
    const sx = rand() * w;
    const sy = rand() * h;
    const sr = rand() * 1.8 + 0.3;
    ctx.beginPath();
    ctx.arc(sx, sy, sr, 0, Math.PI * 2);
    ctx.fill();
  }

  // 惑星
  const pg = ctx.createRadialGradient(
    w * 0.78, h * 0.28, w * 0.01,
    w * 0.78, h * 0.28, w * 0.09,
  );
  pg.addColorStop(0, "#ff8a65");
  pg.addColorStop(0.7, "#d84315");
  pg.addColorStop(1, "#4e342e");
  ctx.fillStyle = pg;
  ctx.beginPath();
  ctx.arc(w * 0.78, h * 0.28, w * 0.09, 0, Math.PI * 2);
  ctx.fill();

  // 小さい惑星
  ctx.fillStyle = "#7e57c2";
  ctx.beginPath();
  ctx.arc(w * 0.18, h * 0.15, w * 0.03, 0, Math.PI * 2);
  ctx.fill();

  drawNuiFloating(ctx, nuiImg, w, h);
  drawCaption(ctx, "Space Adventure!", w, h, "#e1bee7");
}

function renderBeach(ctx, w, h, nuiImg) {
  // 空
  const sky = ctx.createLinearGradient(0, 0, 0, h * 0.5);
  sky.addColorStop(0, "#4fc3f7");
  sky.addColorStop(1, "#b3e5fc");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  // 海
  const sea = ctx.createLinearGradient(0, h * 0.45, 0, h * 0.68);
  sea.addColorStop(0, "#0288d1");
  sea.addColorStop(1, "#4fc3f7");
  ctx.fillStyle = sea;
  ctx.fillRect(0, h * 0.45, w, h * 0.23);

  // 砂浜
  const sand = ctx.createLinearGradient(0, h * 0.68, 0, h);
  sand.addColorStop(0, "#ffe082");
  sand.addColorStop(1, "#ffca28");
  ctx.fillStyle = sand;
  ctx.fillRect(0, h * 0.68, w, h * 0.32);

  // ヤシの木（左側）
  ctx.strokeStyle = "rgba(78,52,46,0.5)";
  ctx.lineWidth = w * 0.015;
  ctx.beginPath();
  ctx.moveTo(w * 0.12, h * 0.68);
  ctx.quadraticCurveTo(w * 0.10, h * 0.45, w * 0.14, h * 0.28);
  ctx.stroke();
  // 葉
  ctx.strokeStyle = "rgba(56,142,60,0.5)";
  ctx.lineWidth = w * 0.008;
  const lx = w * 0.14;
  const ly = h * 0.28;
  const leaves = [
    [lx + w * 0.10, ly + h * 0.06],
    [lx + w * 0.08, ly - h * 0.03],
    [lx - w * 0.08, ly + h * 0.05],
    [lx - w * 0.06, ly - h * 0.04],
    [lx + w * 0.02, ly - h * 0.06],
  ];
  leaves.forEach(([ex, ey]) => {
    ctx.beginPath();
    ctx.moveTo(lx, ly);
    ctx.quadraticCurveTo((lx + ex) / 2, ly - h * 0.04, ex, ey);
    ctx.stroke();
  });

  // ヤシの木（右側）
  ctx.strokeStyle = "rgba(78,52,46,0.4)";
  ctx.lineWidth = w * 0.012;
  ctx.beginPath();
  ctx.moveTo(w * 0.88, h * 0.68);
  ctx.quadraticCurveTo(w * 0.90, h * 0.48, w * 0.86, h * 0.32);
  ctx.stroke();
  ctx.strokeStyle = "rgba(56,142,60,0.4)";
  ctx.lineWidth = w * 0.006;
  const rx = w * 0.86;
  const ry = h * 0.32;
  const rLeaves = [
    [rx + w * 0.07, ry + h * 0.05],
    [rx - w * 0.09, ry + h * 0.04],
    [rx - w * 0.05, ry - h * 0.04],
    [rx + w * 0.03, ry - h * 0.05],
  ];
  rLeaves.forEach(([ex, ey]) => {
    ctx.beginPath();
    ctx.moveTo(rx, ry);
    ctx.quadraticCurveTo((rx + ex) / 2, ry - h * 0.03, ex, ey);
    ctx.stroke();
  });

  drawNuiOnGround(ctx, nuiImg, w, h);
  drawCaption(ctx, "Paradise Beach", w, h, "#fff");
}

function renderSnow(ctx, w, h, nuiImg) {
  // 空
  const sky = ctx.createLinearGradient(0, 0, 0, h * 0.6);
  sky.addColorStop(0, "#90a4ae");
  sky.addColorStop(1, "#cfd8dc");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  // 雪の地面
  const ground = ctx.createLinearGradient(0, h * 0.6, 0, h);
  ground.addColorStop(0, "#eceff1");
  ground.addColorStop(1, "#ffffff");
  ctx.fillStyle = ground;
  ctx.fillRect(0, h * 0.6, w, h * 0.4);

  // 雪山シルエット
  ctx.fillStyle = "rgba(176,190,197,0.4)";
  ctx.beginPath();
  ctx.moveTo(0, h * 0.65);
  ctx.lineTo(w * 0.15, h * 0.35);
  ctx.lineTo(w * 0.30, h * 0.55);
  ctx.lineTo(w * 0.45, h * 0.28);
  ctx.lineTo(w * 0.60, h * 0.50);
  ctx.lineTo(w * 0.75, h * 0.32);
  ctx.lineTo(w * 0.90, h * 0.55);
  ctx.lineTo(w, h * 0.60);
  ctx.lineTo(w, h * 0.65);
  ctx.closePath();
  ctx.fill();

  // 雪の結晶（小さい点）
  const rand = seededRandom(77);
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  for (let i = 0; i < 150; i++) {
    const fx = rand() * w;
    const fy = rand() * h * 0.75;
    const fr = rand() * 2.5 + 0.5;
    ctx.beginPath();
    ctx.arc(fx, fy, fr, 0, Math.PI * 2);
    ctx.fill();
  }

  drawNuiOnGround(ctx, nuiImg, w, h);
  drawCaption(ctx, "Winter Wonderland", w, h, "#37474f", false);
}
