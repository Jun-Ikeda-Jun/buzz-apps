# PROGRESS — buzz-apps

## 現在の状態
- フェーズ: 全7アプリ実装完了、GitHub Pagesデプロイ済み、**動作確認未実施**
- 最終更新: 2026-04-15 12:37
- 公開URL: https://jun-ikeda-jun.github.io/buzz-apps/
- リポ: https://github.com/Jun-Ikeda-Jun/buzz-apps （public）

### 完成済みアプリ一覧
| # | アプリ | ディレクトリ | 背景除去 | 特記 |
|---|---|---|---|---|
| 1 | Pet Cover Maker（ペット雑誌表紙） | apps/pet-magazine/ | あり | テンプレ構造の原型 |
| 2 | Oshi Altar Maker（推し祭壇） | apps/oshi-altar/ | あり | |
| 3 | Baby Card Maker（赤ちゃん月齢カード） | apps/baby-card/ | あり | 月齢・名前入力付き、正方形1200x1200 |
| 4 | Nui Travel（ぬい旅行） | apps/nui-travel/ | あり | 横長1200x900、背景はCanvas描画 |
| 5 | Pet Stamp Maker（ペットスタンプ） | apps/pet-stamp/ | あり | セリフ入力付き、370x320 |
| 6 | Food Magazine Maker（料理雑誌） | apps/food-magazine/ | **なし** | 料理は背景込みの方が映える |
| 7 | Car Poster Maker（車映画ポスター） | apps/car-poster/ | あり | 横長1200x800 |

### 技術スタック
- HTML/CSS/JS（フレームワークなし）
- 背景除去: @imgly/background-removal v1.5.5（CDN経由、ブラウザWASM実行）
- 共通コード: shared/bg-remove.js, shared/ui.js, shared/style.css
- デプロイ: GitHub Pages（無料、publicリポ）

### 未完了
- **全7アプリの動作確認**（ブラウザで実際に写真を入れて確認していない）
- **拡散チャネル・戦略の決定**（池田さんはX未使用。TikTok/Reddit/Product Hunt等を検討中）
- サブエージェントが作った6アプリのコード品質確認

## 次にやること
1. GitHub Pagesにアクセスして全7アプリの動作確認
2. バグがあれば修正
3. 拡散チャネルを決める（池田さんと相談）
4. サンプル画像を作ってSNS投稿用素材を準備

## 過去の経緯（要約）
- 2026-04-15: プロジェクト作成。YouTube動画「インスピレーションキャット」の構造（ローカル処理・コスト0円・SNS拡散ループ）× 溺愛テーマで7アプリを量産する方針。全7アプリ実装→GitHub Pagesデプロイまで1セッションで完了
