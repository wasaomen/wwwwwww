# 動画ファイル送信サイト

Discord BOTと連携した動画ファイル送信サイトです。Webサイトから動画をアップロードすると、Discordチャンネルに自動で動画が送信されます。

## 機能

- **Webサイト**
  - 動画ファイルのアップロード（最大100MB）
  - アップロード時にDiscordチャンネルへ自動送信

- **Discord BOT（別途実装が必要）**
  - `!setup` - 現在のチャンネルを通知チャンネルに設定
  - `!videos` - アップロードされた動画一覧を表示
  - `!download [ファイル名]` - 指定した動画をダウンロード
  - `!delete [ファイル名]` - 指定した動画を削除
  - `!help` - ヘルプを表示

## セットアップ

### 1. リポジトリのクローン

```bash
git clone https://github.com/wasaomen/wwwwwww.git
cd wwwwww
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. サーバーの起動

```bash
node server.js
```

サーバーは http://localhost:3000 で起動します。

## Discord BOT連携

Discord BOT連携機能を使用するには、別途BOTを実装する必要があります。BOTの実装はこのリポジトリには含まれていません（セキュリティ上の理由）。

BOT実装の要件：
- `bot/data/notifications/` ディレクトリをポーリングして、新しい通知ファイルをチェック
- 通知ファイルが見つかったら、設定されたDiscordチャンネルに動画を送信
- チャンネル設定は `bot/data/channel.json` に保存

通知ファイルの形式：
```json
{
  "name": "動画ファイル名.mp4",
  "size": 12345678,
  "timestamp": 1234567890
}
```

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
