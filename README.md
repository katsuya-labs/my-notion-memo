## 🚀 概要

日常のメモは「すぐ書けること」が重要ですが、
NotionのUIでは入力までに複数ステップが必要です。

そこで、最小入力でNotionデータベースに記録できる
軽量インターフェースとしてこのツールを作成しました。

## ✨ 主な機能

- **かんたん投稿**: タイトル、カテゴリ選択、本文を入力してボタンを押すだけの最小ステップ。
- **Notion連携**: Notion APIを通じて、指定したデータベースにリアルタイムで反映。

## 🛠 使用技術

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **API**: Notion SDK (@notionhq/client)
- **Deployment**: Vercel (Private environment)

## ⚙️ セットアップ（開発者向け）

本プロジェクトは個人利用を想定しているため、公開デプロイは行っていません。ご自身の環境で動かす場合は以下の手順を実行してください。

1. リポジトリをクローン

   ```bash
   git clone [https://github.com/katsuya-lab/my-notion-memo.git](https://github.com/katsuya-lab/my-notion-memo.git)
   cd my-notion-memo
   ```

2. 依存関係のインストール

   ```bash
   npm install
   ```

3. 環境変数の設定
   `.env.local`ファイルを作成し、以下の項目を設定してください。
   - `NOTION_TOKEN`: Notionのインテグレーショントークン
   - `NOTION_DATABASE_ID`: 投稿先のデータベースID

4. 開発サーバーの起動
   ```bash
   npm run dev
   ```
