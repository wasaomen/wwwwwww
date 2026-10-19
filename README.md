# 動画ファイル送信サイト & Discord BOT

Discord BOTと連携した動画ファイル送信サイトです。Webサイトから動画をアップロードし、Discord BOT経由でダウンロードできます。アップロード時にDiscordチャンネルへ自動通知されます。

## 機能

- **Webサイト**
  - 動画ファイルのアップロード（最大100MB）
  - 動画一覧の表示
  - 動画のダウンロード
  - 動画の削除

- **Discord BOT**
  - `!setup` - 現在のチャンネルを通知チャンネルに設定
  - `!videos` - アップロードされた動画一覧を表示
  - `!download [ファイル名]` - 指定した動画をダウンロード
  - `!delete [ファイル名]` - 指定した動画を削除
  - `!help` - ヘルプを表示

- **自動通知**
  - Webサイトから動画をアップロードすると、設定されたDiscordチャンネルに自動通知が送信されます

## セットアップ

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd disfile
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 環境変数の設定

`.env.example` をコピーして `.env` を作成し、以下の環境変数を設定してください：

```env
PORT=3000
DISCORD_TOKEN=your_discord_bot_token_here
```

**Discord BOTトークンの取得方法：**

1. [Discord Developer Portal](https://discord.com/developers/applications) にアクセス
2. 「New Application」をクリックしてアプリケーションを作成
3. 「Bot」タブで「Add Bot」をクリック
4. 「Reset Token」をクリックしてトークンをコピー
5. `.env` ファイルにトークンを貼り付け

### 4. サーバーの起動

**Webサーバー：**

```bash
node server.js
```

**Discord BOT：**

```bash
node bot/index.js
```

または、両方を同時に起動するために `package.json` にスクリプトを追加することもできます。

## 使用方法

### 通知チャンネルの設定

1. Discordで通知を受け取りたいチャンネルに移動
2. `!setup` コマンドを実行して、そのチャンネルを通知チャンネルに設定

### Webサイトから動画をアップロード

1. `http://localhost:3000` にアクセス
2. 「動画アップロード」セクションで動画ファイルを選択
3. 「アップロード」ボタンをクリック
4. アップロード成功後、設定されたDiscordチャンネルに自動通知が送信されます

### Discord BOTから動画をダウンロード

1. Discordで `!videos` コマンドを実行して動画一覧を確認
2. `!download [ファイル名]` コマンドで目的の動画をダウンロード

## 技術スタック

- **Webサーバー**: Node.js + Express
- **Discord BOT**: discord.js
- **ファイルアップロード**: multer
- **フロントエンド**: HTML + CSS + JavaScript

## サポートされる動画形式

- MP4
- WebM
- OGG
- MOV
- AVI
- MKV

## 注意事項

- アップロードできるファイルサイズは最大100MBです
- `.env` ファイルはシークレット情報を含むため、GitHubにコミットしないでください
- `uploads/` ディレクトリは `.gitignore` に含まれているため、アップロードされたファイルはリポジトリに保存されません

## ライセンス

ISC
