# Poker Tournament Schedule

ポーカーのトーナメント情報を参照できるフロントエンド（React + Vite）。
`src/assets/tournaments.json` のデータをもとに UI コンポーネントで表示します。

このプロジェクトは Manus が作成しました。

## 必要要件
- Node.js 18 以上（推奨 20+）
- pnpm 10 以上

## セットアップ
```bash
pnpm install
```

## 開発
```bash
pnpm dev
```
- Vite の開発サーバが起動します。

## ビルド / プレビュー
```bash
pnpm build
pnpm preview
```
- ビルド成果物は `dist/` に出力されます。

## Lint
```bash
pnpm lint
```

## データの編集
- トーナメントデータは `src/assets/tournaments.json` にあります。
- 形式を保ったまま編集してください。

## ディレクトリ構成（抜粋）
```
.
├─ public/
├─ src/
│  ├─ assets/
│  │  └─ tournaments.json
│  ├─ components/
│  │  └─ ui/
│  ├─ hooks/
│  ├─ lib/
│  ├─ App.jsx
│  └─ main.jsx
├─ index.html
├─ package.json
├─ vite.config.js
└─ README.md
```

## 使用技術
- React 19
- Vite 6
- Tailwind CSS 4
- Radix UI / lucide-react / framer-motion ほか

## 備考
- `.env` が必要な場合は `.env.local` 等を利用してください（`.gitignore` 済み）。
