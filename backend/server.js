const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.static('public')); // フロントエンドのHTMLを提供

// ファイルアップロード処理
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send("ファイルがアップロードされていません。");
    }

    const ext = path.extname(req.file.originalname).toLowerCase();
    if (!['.xlsx', '.xls', '.csv', '.txt'].includes(ext)) {
        fs.unlinkSync(req.file.path); // 許可されていないファイルは削除
        return res.status(400).send("対応していないファイル形式です。");
    }

    res.send(`ファイル ${req.file.originalname} がアップロードされました。`);
});

// サーバー起動
app.listen(3000, () => {
    console.log("サーバーが http://localhost:3000 で起動しました");
});
