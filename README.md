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
4. 資料存在瀏覽器裡。換電腦前用「設定與備份 → 匯出 JSON」，到新電腦再「匯入 JSON」；或設定「雲端同步」，用 Google 雲端硬碟或 GitHub 私人 Gist 自動同步。

## 修改網站

編輯 `src/app.html` 後執行 `python3 tools/build.py`，會重新產生 `index.html`。

## AI 連線

「設定與備份 → AI 連線」可選 **Claude** 或 **Google Gemini**。

- **Gemini**：到 [Google AI Studio](https://aistudio.google.com) 按「Get API key」免費建立金鑰，填入即可。模型預設 `gemini-2.5-flash`，可改成其他 Gemini 模型名稱。
- **Claude**：依下列順序：

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

## Google 整合

連結 Google 帳號後可以：

- 從 **Google 雲端硬碟** 搜尋並匯入 PDF（「新增論文 → Google 雲端硬碟」）
- 把論文的翻譯、螢光與筆記匯出成 **Google 文件**（存在雲端硬碟「論憶」資料夾）
- 把閱讀計畫排入 **Google 日曆**
- 用 **Google 雲端硬碟** 同步文獻庫（「設定與備份 → 雲端同步」）
- 每篇論文都有 **Google 學術搜尋** 連結（不需登入）

登入用的是 Google 官方的 OAuth，網站只在瀏覽器取得 1 小時有效的存取權杖，沒有伺服器會碰到你的資料。第一次使用前要建立 OAuth 用戶端 ID（只要做一次）：

1. 到 [Google Cloud Console](https://console.cloud.google.com) 建立專案。
2. 「API 和服務 → 程式庫」啟用 **Google Drive API** 和 **Google Calendar API**。
3. 「OAuth 同意畫面」：使用者類型選「外部」，填應用程式名稱與信箱；在「測試使用者」加入你自己的 Gmail。
   範圍（scopes）可加入 `drive.file`、`drive.readonly`、`calendar.events`。
4. 「憑證 → 建立憑證 → OAuth 用戶端 ID」：類型選「網頁應用程式」，「已授權的 JavaScript 來源」加入：
   - `https://charleslin2003-prog.github.io`
   - Vercel 網址（有部署的話），例如 `https://你的專案.vercel.app`
5. 複製用戶端 ID（`….apps.googleusercontent.com`），貼到網站「設定與備份 → Google 帳號」，按「連結 Google 帳號」。

想讓所有使用者都不必自己填，可把用戶端 ID 寫進 `src/app.html` 的 `GOOGLE_CLIENT_ID` 再重新打包。
應用程式維持「測試」狀態時，只有加入測試使用者名單的帳號能登入，Google 也會顯示「未經驗證的應用程式」提示，這是正常的；要開放給所有人需送 Google 審查。

各功能用到的權限（第一次使用該功能時才會請求）：

| 功能 | 權限 |
|---|---|
| 登入、雲端硬碟同步、匯出 Google 文件 | `drive.file`（只能存取論憶自己建立的檔案） |
| 從雲端硬碟匯入 PDF | `drive.readonly` |
| 排入 Google 日曆 | `calendar.events` |

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
