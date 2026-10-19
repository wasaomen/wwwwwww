const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ミドルウェア
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// アップロードディレクトリの確認
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 通知ディレクトリの確認
const notificationDir = path.join(__dirname, 'bot', 'data', 'notifications');
if (!fs.existsSync(notificationDir)) {
  fs.mkdirSync(notificationDir, { recursive: true });
}

console.log('通知ディレクトリ:', notificationDir);

// Multer設定
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /mp4|webm|ogg|mov|avi|mkv/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('動画ファイルのみアップロード可能です'));
    }
  }
});

// ルート
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 動画一覧取得
app.get('/api/videos', (req, res) => {
  try {
    const files = fs.readdirSync(uploadDir);
    const videos = files.map(file => ({
      name: file,
      url: `/api/videos/${file}`,
      size: fs.statSync(path.join(uploadDir, file)).size
    }));
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: '動画一覧の取得に失敗しました' });
  }
});

// 動画アップロード
app.post('/api/upload', upload.single('video'), (req, res) => {
  console.log('アップロードリクエスト受信:', req.file ? req.file.filename : 'なし');
  
  if (!req.file) {
    return res.status(400).json({ error: 'ファイルがアップロードされませんでした' });
  }
  
  console.log('ファイル保存成功:', req.file.filename);
  
  // Discord通知用ファイルを作成
  const notificationData = {
    name: req.file.filename,
    size: req.file.size,
    timestamp: Date.now()
  };
  
  const notificationFile = path.join(notificationDir, `${Date.now()}.json`);
  fs.writeFileSync(notificationFile, JSON.stringify(notificationData, null, 2));
  
  console.log('通知ファイル作成:', notificationFile);
  
  res.json({
    message: 'アップロード成功',
    file: {
      name: req.file.filename,
      size: req.file.size
    }
  });
});

// 動画削除
app.delete('/api/videos/:filename', (req, res) => {
  const filePath = path.join(uploadDir, req.params.filename);
  
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'ファイルが見つかりません' });
  }
  
  fs.unlinkSync(filePath);
  res.json({ message: '削除成功' });
});

// サーバー起動
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// サーバーが終了しないようにする
process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
