/**
 * 料理雑誌テンプレート定義
 * 背景除去なし: 料理写真をそのままCanvasに描画してオーバーレイでテキスト
 */

export const TEMPLATES = [
  {
    id: "bon-appetit",
    name: "BON APPETIT",
    emoji: "🍷",
    bgColor: "#ffffff",
    render: (ctx, w, h, foodImg) => renderBonAppetit(ctx, w, h, foodImg),
  },
  {
    id: "food-wine",
    name: "FOOD & WINE",
    emoji: "🍾",
    bgColor: "#1a1a2e",
    render: (ctx, w, h, foodImg) => renderFoodWine(ctx, w, h, foodImg),
  },
  {
    id: "delicious",
    name: "DELICIOUS",
    emoji: "⭐",
    bgColor: "#f5c518",
    render: (ctx, w, h, foodImg) => renderDelicious(ctx, w, h, foodImg),
  },
  {
    id: "vegan",
    name: "PLANT BASED",
    emoji: "🌿",
    bgColor: "#1b5e20",
    render: (ctx, w, h, foodImg) => renderVegan(ctx, w, h, foodImg),
  },
  {
    id: "street-food",
    name: "STREET FOOD",
    emoji: "🔥",
    bgColor: "#e65100",
    render: (ctx, w, h, foodImg) => renderStreetFood(ctx, w, h, foodImg),
  },
  {
    id: "patisserie",
    name: "PATISSERIE",
    emoji: "🧁",
    bgColor: "#f8bbd0",
    render: (ctx, w, h, foodImg) => renderPatisserie(ctx, w, h, foodImg),
  },
];

// --- 共通ヘルパー ---

/** 写真を中央にフィットして描画（背景除去なし、cover方式） */
function drawFoodCover(ctx, foodImg, x, y, areaW, areaH) {
  const aspect = foodImg.width / foodImg.height;
  const areaAspect = areaW / areaH;
  let sx, sy, sw, sh;

  if (aspect > areaAspect) {
    sh = foodImg.height;
    sw = sh * areaAspect;
    sx = (foodImg.width - sw) / 2;
    sy = 0;
  } else {
    sw = foodImg.width;
    sh = sw / areaAspect;
    sx = 0;
    sy = (foodImg.height - sh) / 2;
  }

  ctx.drawImage(foodImg, sx, sy, sw, sh, x, y, areaW, areaH);
}

function drawText(ctx, text, x, y, font, color, align = "center") {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.fillText(text, x, y);
}

// --- テンプレートごとの描画 ---

function renderBonAppetit(ctx, w, h, foodImg) {
  // 白背景
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);

  // 写真を中央エリアに配置（上下にマージン）
  const photoTop = h * 0.16;
  const photoHeight = h * 0.68;
  drawFoodCover(ctx, foodImg, 0, photoTop, w, photoHeight);

  // 上部の白帯
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h * 0.14);

  // ロゴ: BON APPETIT（赤文字、太字serif）
  drawText(
    ctx, "BON APP\u00c9TIT", w / 2, h * 0.09,
    `bold ${w * 0.1}px Georgia, serif`, "#c0392b"
  );

  // 上部の赤いライン
  ctx.fillStyle = "#c0392b";
  ctx.fillRect(0, 0, w, 5);

  // 下部帯
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.fillRect(0, h * 0.86, w, h * 0.14);

  drawText(
    ctx, "Recipe of the Month", w / 2, h * 0.93,
    `italic ${w * 0.04}px Georgia, serif`, "#333"
  );

  // 下部赤ライン
  ctx.fillStyle = "#c0392b";
  ctx.fillRect(0, h - 5, w, 5);
}

function renderFoodWine(ctx, w, h, foodImg) {
  // 写真を全面に配置
  drawFoodCover(ctx, foodImg, 0, 0, w, h);

  // 暗いオーバーレイ
  ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
  ctx.fillRect(0, 0, w, h);

  // 上部にグラデーションオーバーレイ（ロゴを読みやすく）
  const topGrad = ctx.createLinearGradient(0, 0, 0, h * 0.25);
  topGrad.addColorStop(0, "rgba(0,0,0,0.6)");
  topGrad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = topGrad;
  ctx.fillRect(0, 0, w, h * 0.25);

  // ロゴ: FOOD & WINE（白文字エレガント）
  drawText(
    ctx, "FOOD & WINE", w / 2, h * 0.1,
    `bold ${w * 0.09}px Georgia, serif`, "#ffffff"
  );

  // 区切り線
  ctx.strokeStyle = "rgba(255,255,255,0.5)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(w * 0.3, h * 0.13);
  ctx.lineTo(w * 0.7, h * 0.13);
  ctx.stroke();

  // 下部グラデーション
  const botGrad = ctx.createLinearGradient(0, h * 0.75, 0, h);
  botGrad.addColorStop(0, "rgba(0,0,0,0)");
  botGrad.addColorStop(1, "rgba(0,0,0,0.7)");
  ctx.fillStyle = botGrad;
  ctx.fillRect(0, h * 0.75, w, h * 0.25);

  drawText(
    ctx, "Chef's Special", w / 2, h * 0.93,
    `italic ${w * 0.045}px Georgia, serif`, "#ffffff"
  );
}

function renderDelicious(ctx, w, h, foodImg) {
  // 黄色背景
  ctx.fillStyle = "#f5c518";
  ctx.fillRect(0, 0, w, h);

  // 黄色枠の内側に写真
  const margin = w * 0.06;
  const photoTop = h * 0.15;
  const photoBottom = h * 0.82;
  const photoW = w - margin * 2;
  const photoH = photoBottom - photoTop;

  drawFoodCover(ctx, foodImg, margin, photoTop, photoW, photoH);

  // 写真の枠
  ctx.strokeStyle = "#222";
  ctx.lineWidth = 3;
  ctx.strokeRect(margin, photoTop, photoW, photoH);

  // 上部に「DELICIOUS」（黒太字）
  drawText(
    ctx, "DELICIOUS", w / 2, h * 0.1,
    `bold ${w * 0.12}px "Arial Black", sans-serif`, "#222"
  );

  // 下部に星評価
  drawText(
    ctx, "\u2605\u2605\u2605\u2605\u2605", w / 2, h * 0.91,
    `${w * 0.07}px sans-serif`, "#222"
  );

  drawText(
    ctx, "5-Star Rating", w / 2, h * 0.96,
    `${w * 0.03}px sans-serif`, "#555"
  );
}

function renderVegan(ctx, w, h, foodImg) {
  // 深い緑背景
  ctx.fillStyle = "#1b5e20";
  ctx.fillRect(0, 0, w, h);

  // 写真エリア
  const photoTop = h * 0.16;
  const photoH = h * 0.66;
  drawFoodCover(ctx, foodImg, 0, photoTop, w, photoH);

  // 上部の緑帯
  ctx.fillStyle = "#1b5e20";
  ctx.fillRect(0, 0, w, h * 0.14);

  // ロゴ: PLANT BASED（緑文字）
  drawText(
    ctx, "PLANT BASED", w / 2, h * 0.09,
    `bold ${w * 0.09}px sans-serif`, "#a5d6a7"
  );

  // 下部の緑帯
  ctx.fillStyle = "#1b5e20";
  ctx.fillRect(0, h * 0.84, w, h * 0.16);

  drawText(
    ctx, "100% Delicious", w / 2, h * 0.92,
    `bold ${w * 0.045}px sans-serif`, "#a5d6a7"
  );

  // 葉っぱ装飾: 小さい楕円を散らす
  ctx.fillStyle = "rgba(165, 214, 167, 0.3)";
  const leaves = [
    [w * 0.1, h * 0.04], [w * 0.85, h * 0.05],
    [w * 0.15, h * 0.88], [w * 0.82, h * 0.89],
    [w * 0.05, h * 0.95], [w * 0.92, h * 0.95],
  ];
  for (const [lx, ly] of leaves) {
    ctx.save();
    ctx.translate(lx, ly);
    ctx.rotate(Math.random() * Math.PI);
    ctx.beginPath();
    ctx.ellipse(0, 0, w * 0.03, w * 0.015, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function renderStreetFood(ctx, w, h, foodImg) {
  // オレンジ背景
  ctx.fillStyle = "#e65100";
  ctx.fillRect(0, 0, w, h);

  // ドット柄
  ctx.fillStyle = "rgba(255,255,255,0.06)";
  for (let i = 0; i < w; i += 24) {
    for (let j = 0; j < h; j += 24) {
      ctx.beginPath();
      ctx.arc(i, j, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 写真を少し傾けて配置
  ctx.save();
  ctx.translate(w / 2, h * 0.52);
  ctx.rotate(-0.04); // 少し傾ける
  const photoW = w * 0.85;
  const photoH = h * 0.58;
  drawFoodCover(ctx, foodImg, -photoW / 2, -photoH / 2, photoW, photoH);

  // 写真の白枠
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 4;
  ctx.strokeRect(-photoW / 2, -photoH / 2, photoW, photoH);
  ctx.restore();

  // ロゴ: STREET FOOD（白太字）
  drawText(
    ctx, "STREET FOOD", w / 2, h * 0.1,
    `bold ${w * 0.1}px "Arial Black", sans-serif`, "#ffffff"
  );

  // 下部テキスト
  drawText(
    ctx, "Today's Pick", w / 2, h * 0.94,
    `bold ${w * 0.05}px sans-serif`, "#ffffff"
  );
}

function renderPatisserie(ctx, w, h, foodImg) {
  // ピンクの淡い背景
  ctx.fillStyle = "#fce4ec";
  ctx.fillRect(0, 0, w, h);

  // 写真を中央に配置
  const photoTop = h * 0.18;
  const photoH = h * 0.6;
  const photoW = w * 0.85;
  const photoX = (w - photoW) / 2;

  drawFoodCover(ctx, foodImg, photoX, photoTop, photoW, photoH);

  // 写真のソフトな枠
  ctx.strokeStyle = "#f48fb1";
  ctx.lineWidth = 3;
  ctx.strokeRect(photoX, photoTop, photoW, photoH);

  // ロゴ: PATISSERIE（エレガントserifフォント）
  drawText(
    ctx, "P\u00c2TISSERIE", w / 2, h * 0.1,
    `bold ${w * 0.09}px Georgia, serif`, "#c2185b"
  );

  // 区切り線
  ctx.strokeStyle = "#f48fb1";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(w * 0.25, h * 0.13);
  ctx.lineTo(w * 0.75, h * 0.13);
  ctx.stroke();

  // 下部テキスト
  drawText(
    ctx, "Sweet Dreams", w / 2, h * 0.88,
    `italic ${w * 0.05}px Georgia, serif`, "#c2185b"
  );

  // ハートの散らし装飾
  ctx.fillStyle = "rgba(244, 143, 177, 0.35)";
  const hearts = [
    [w * 0.08, h * 0.04], [w * 0.88, h * 0.06],
    [w * 0.12, h * 0.92], [w * 0.85, h * 0.93],
    [w * 0.5, h * 0.95], [w * 0.92, h * 0.15],
  ];
  for (const [hx, hy] of hearts) {
    drawHeart(ctx, hx, hy, w * 0.02);
  }
}

/** ハート描画ヘルパー */
function drawHeart(ctx, x, y, size) {
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.moveTo(0, size * 0.4);
  ctx.bezierCurveTo(-size, -size * 0.2, -size * 0.5, -size, 0, -size * 0.4);
  ctx.bezierCurveTo(size * 0.5, -size, size, -size * 0.2, 0, size * 0.4);
  ctx.fill();
  ctx.restore();
}
