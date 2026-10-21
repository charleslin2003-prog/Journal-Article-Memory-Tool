# 論憶：期刊論文記憶庫

給研究生與個人研究者用的論文管理平台。匯入論文後可以逐段翻譯成繁體中文、自動串聯相關論文、做螢光與筆記，並用 AI 查閱整個文獻庫。

- 網站（GitHub Pages）：https://charleslin2003-prog.github.io/Journal-Article-Memory-Tool/
- 功能細節：[功能說明.md](功能說明.md)
- 進度與待辦：[待辦事項.md](待辦事項.md)

課程：視覺化分析與決策應用設計（2026 秋）　設計者：林永欽

## 三種工作區

| 1a 閱讀器 | 1b 關聯圖譜 | 1c AI 對話 |
|---|---|---|
| ![閱讀器](docs/screenshots/reader.png) | ![圖譜](docs/screenshots/graph.png) | ![對話](docs/screenshots/chat.png) |
| 原文／中文對照、螢光、段落筆記，右側列出引用與主題相關論文 | 以節點與三種線型呈現共同關鍵詞、引用、手動串聯 | 根據整個文獻庫回答，出處可點開看原文 |

## 開始使用

1. 開啟網站，內建 4 篇示範論文（Transformer、BERT、ResNet、GPT-3）。
2. 按「＋ 新增論文」上傳 PDF 或貼上文字。
3. AI 功能（自動辨識、翻譯、問答）需要連線設定，見下方。
4. 資料存在瀏覽器裡。換電腦前用「設定與備份 → 匯出 JSON」，到新電腦再「匯入 JSON」；或設定「雲端同步」，用 GitHub 私人 Gist 自動同步。

## 修改網站

編輯 `src/app.html` 後執行 `python3 tools/build.py`，會重新產生 `index.html`。

## AI 連線

前端呼叫 AI 的順序：

1. 執行環境本身有 AI（例如在 Claude 的編輯環境中開啟）→ 直接使用。
2. 「設定與備份」裡填了 Anthropic API 金鑰 → 由瀏覽器直接呼叫 Anthropic。金鑰只存在該瀏覽器的 localStorage，不會被匯出。
3. 都沒有 → 呼叫同網站的 `api/claude`（只有部署在 Vercel 時存在）。

GitHub Pages 是純靜態網站，沒有後端，因此在 Pages 上使用 AI 要填自己的金鑰。

### 部署到 Vercel（金鑰放在伺服器）

1. 用 GitHub 登入 [Vercel](https://vercel.com) → Add New → Project → Import 這個 repo → Deploy（設定維持預設）。
2. Project → Settings → Environment Variables 加入：
   - `ANTHROPIC_API_KEY`：必填
   - `LUNYI_ACCESS_CODE`：建議設定。設定後，使用者要在「設定與備份」填入相同存取碼才能用 AI，避免金鑰被陌生人消耗
   - `LUNYI_MODEL`：選填，預設 `claude-sonnet-5-5`
3. 重新部署（Redeploy）。

後端程式在 [`api/claude.js`](api/claude.js)。

## 檔案

```
index.html          單一檔案網站（約 190 KB，含 React 與執行環境），由 tools/build.py 產生
src/app.html        網站原始碼（版面＋程式），要改網站就改這個
tools/build.py      把 src/app.html 打包回 index.html
api/claude.js       Vercel Serverless Function，代為呼叫 Anthropic API
docs/screenshots/   功能截圖
功能說明.md          完整功能說明
待辦事項.md          已完成與未完成工作
```

## 使用限制

- PDF 最多擷取前 150 頁、300 段；掃描版 PDF 的 OCR 最多 60 頁。
- 寬度 900px 以下為單欄手機版面。
- 瀏覽器 localStorage 約 5 MB，論文很多時請定期匯出備份。
