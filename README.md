# 論憶：期刊論文記憶庫

給研究生與個人研究者用的論文管理平台。匯入論文後可以逐段翻譯成繁體中文、自動串聯相關論文、做螢光與筆記，並用 AI 查閱整個文獻庫。

- 網站（GitHub Pages）：https://charleslin2003-prog.github.io/Journal-Article-Memory-Tool/
- 功能細節：[功能說明.md](功能說明.md)
- 進度與待辦：[待辦事項.md](待辦事項.md)

課程：視覺化分析與決策應用設計（2026 秋）　設計者：林永欽

期中報告投影片：[docs/期中報告_論憶.pptx](docs/期中報告_論憶.pptx)（[PDF 版](docs/期中報告_論憶.pdf)）

## 四種工作區

介面仿照 Notion：左側欄是帳號（頭像）、搜尋、設定、四個工作區與專案樹，上方是目前位置（專案／論文）與 AI 狀態。

| 1a 閱讀器 | 1b 關聯圖譜 |
|---|---|
| ![閱讀器](docs/screenshots/reader.png) | ![圖譜](docs/screenshots/graph.png) |
| 原文／中文對照、螢光、段落筆記，右側列出引用與主題相關論文 | 以節點與三種線型呈現共同關鍵詞、引用、手動串聯；選取一篇後，無關的論文淡化 |
| **1c AI 對話** | **1d 文獻庫總覽** |
| ![對話](docs/screenshots/chat.png) | ![總覽](docs/screenshots/dashboard.png) |
| 根據整個文獻庫回答，出處可點開看原文 | 關鍵數字、出版年份、專案組成、熱門關鍵詞、閱讀進度，點圖表即可篩選或搜尋 |

## 開始使用

主要給桌面版 Chrome／Edge 使用（手機也能開，側欄會變成抽屜）。

1. 開啟網站，內建 4 篇示範論文（Transformer、BERT、ResNet、GPT-3）。第一次使用會跳出「登入論憶」視窗，只有登入方式可選、不用輸入帳號密碼：
   - **繼續使用 Google**：跳出 Google 的帳號選擇視窗，點自己的帳號即可（瀏覽器已登入 Google 時不必再打密碼）。登入後可以同步到雲端硬碟、匯入 PDF、匯出 Google 文件。
   - **用 OpenRouter 登入**：AI 帳號，見下方「AI 連線」。
   - **先不登入，直接使用**：所有資料仍存在這台電腦。之後按左上角的頭像可以再打開登入視窗。
2. 左側欄的「＋ 新增論文」上傳 PDF 或貼上文字；「專案」可以把論文分群，按 ＋ 新增專案，按 ⋯ 改名或刪除。
3. 不登入也能翻譯：沒有連結雲端 AI 時，會用瀏覽器內建的翻譯（免費、在你的電腦上執行）。
4. 要用 AI 問答、自動辨識論文資訊、高品質翻譯：左上角頭像 → 登入視窗 →「用 OpenRouter 登入」，見下方「AI 連線」。
5. 資料存在瀏覽器裡。換電腦前用「設定與備份 → 同步與備份 → 匯出 JSON」，到新電腦再「匯入 JSON」；或設定「雲端同步」，用 Google 雲端硬碟或 GitHub 私人 Gist 自動同步。

<img src="docs/screenshots/login.png" alt="登入論憶視窗：繼續使用 Google、用 OpenRouter 登入、先不登入直接使用" width="640">

## 修改網站

編輯 `src/app.html` 後執行 `python3 tools/build.py`，會重新產生 `index.html`。

## AI 連線

使用者不必自己處理 API 金鑰，費用都算在使用者自己的帳號，網站作者不必付費，也不需要後端。

| 方式 | 使用者要做的事 | 能做到的事 | 費用 |
|---|---|---|---|
| **瀏覽器內建翻譯**（預設） | 什麼都不用做；第一次使用時下載語言包 | 只有翻譯（英、日、韓、德、法等 → 繁中） | 免費，在使用者電腦上執行 |
| **用 OpenRouter 登入**（建議） | 左上角頭像或「設定 → AI 模型」按「用 OpenRouter 登入」，在 OpenRouter 頁面按同意後自動回到論憶 | 翻譯、問答、自動辨識；可選 Claude、Gemini、GPT 等模型 | 從使用者的 OpenRouter 額度扣；沒儲值也能用免費模型 |
| 進階：自備 API 金鑰 | 「設定 → 進階」貼上 Gemini（AI Studio 免費取得）或 Claude 金鑰 | 同上 | 算在金鑰所屬的帳號 |

- **翻譯模式**（設定 → AI 模型）：自動（有雲端 AI 用 AI，沒有用內建）、一律內建、一律雲端 AI。內建翻譯的段落會標「內建翻譯」，點段落可以「用 AI 重新翻譯」。
- **OpenRouter 登入**採用 OAuth PKCE：網站拿到的是一把只屬於這個使用者、可在 OpenRouter「Keys」頁面刪除的金鑰；網站不經手使用者密碼。登出時網站會刪除本機的金鑰。
- **登入資訊存在哪裡**：預設勾選「在這台電腦記住 AI 登入」，存在瀏覽器的 localStorage；取消勾選則只存在這次工作階段，關閉這個分頁或瀏覽器就清除。這個選項只管 OpenRouter 登入與進階金鑰，不影響 Google 登入與 Gist 同步權杖。金鑰不會被匯出或同步。
- **做不到的事**：Claude.ai、ChatGPT 的訂閱帳號不能用來登入第三方網站（Anthropic 明文禁止；OpenAI 只開放給受邀合作夥伴），所以用 Claude 或 GPT 要透過 OpenRouter，或在「進階」貼 API 金鑰。用 Google 帳號直接付 Gemini 費用目前也沒有給一般網站的公開機制。
- **內建翻譯的限制**：需要桌面版 Chrome 138 以上（或支援的 Edge）。它是一般機器翻譯，不會在專有名詞後附原文，也不會刻意使用台灣學術用語。
- 在 Claude 的編輯環境中開啟時，會直接使用該環境內建的 AI。部署在 Vercel 時，也可以由網站代付（見下一節）。

### 部署到 Vercel（金鑰放在伺服器）

1. 用 GitHub 登入 [Vercel](https://vercel.com) → Add New → Project → Import 這個 repo → Deploy（設定維持預設）。
2. Project → Settings → Environment Variables 加入：
   - `ANTHROPIC_API_KEY`：必填
   - `LUNYI_ACCESS_CODE`：建議設定。設定後，使用者要在「設定 → 進階」填入相同存取碼才能用 AI，避免金鑰被陌生人消耗
   - `LUNYI_MODEL`：選填，預設 `claude-sonnet-5-5`
3. 重新部署（Redeploy）。

後端程式在 [`api/claude.js`](api/claude.js)。

## Google 整合

用 Google 登入後可以：

- 從 **Google 雲端硬碟** 搜尋並匯入 PDF（「新增論文 → Google 雲端硬碟」）
- 把論文的翻譯、螢光與筆記匯出成 **Google 文件**（存在雲端硬碟「論憶」資料夾）
- 把閱讀計畫排入 **Google 日曆**
- 用 **Google 雲端硬碟** 同步文獻庫（「設定 → 同步與備份」）
- 每篇論文都有 **Google 學術搜尋** 連結（不需登入）

使用者在登入視窗按「繼續使用 Google」，就會跳出 Google 的帳號選擇視窗。登入用的是 Google 官方的 OAuth（Google Identity Services），網站只在瀏覽器取得 1 小時有效的存取權杖，沒有伺服器會碰到你的資料。

**網站管理者要先建立一次 OAuth 用戶端 ID**，沒有它 Google 不會跳出登入視窗（登入視窗裡的 Google 按鈕會是灰的，顯示「Google 登入暫時還沒開放」）：

1. 到 [Google Cloud Console](https://console.cloud.google.com) 建立專案。
2. 「API 和服務 → 程式庫」啟用 **Google Drive API** 和 **Google Calendar API**。
3. 「OAuth 同意畫面」（新版介面叫「Google Auth Platform」）：使用者類型選「外部」，填應用程式名稱「論憶」與信箱。
   範圍（scopes）可加入 `drive.file`、`drive.readonly`、`calendar.events`。
   還在「測試」狀態時，只有「測試使用者」名單裡的帳號能登入，記得把自己和要展示的帳號加進去。
4. 「憑證 → 建立憑證 → OAuth 用戶端 ID」：類型選「網頁應用程式」，「已授權的 JavaScript 來源」加入：
   - `https://charleslin2003-prog.github.io`
   - Vercel 網址（有部署的話），例如 `https://你的專案.vercel.app`
   - 本機測試用（選填）：`http://localhost:8765`
5. 複製用戶端 ID（`….apps.googleusercontent.com`），寫進 `src/app.html` 的 `GOOGLE_CLIENT_ID`，執行 `python3 tools/build.py` 再 push。所有使用者的登入視窗就會出現可用的「繼續使用 Google」。
   只想自己先試的話，也可以貼到網站「設定 → 進階 → Google OAuth 用戶端 ID」（只對這台瀏覽器有效）。

用戶端 ID 本來就會出現在網頁裡，可以公開，不是密碼；Google 只接受從上面登記的網址發出的登入。
應用程式維持「測試」狀態時，只有加入測試使用者名單的帳號能登入，Google 也會顯示「未經驗證的應用程式」提示，這是正常的；要開放給所有人需送 Google 審查。

各功能用到的權限（第一次使用該功能時才會請求）：

| 功能 | 權限 |
|---|---|
| 登入、雲端硬碟同步、匯出 Google 文件 | `drive.file`（只能存取論憶自己建立的檔案） |
| 從雲端硬碟匯入 PDF | `drive.readonly` |
| 排入 Google 日曆 | `calendar.events` |

## 檔案

```
index.html          單一檔案網站（約 240 KB，含 React 與執行環境），由 tools/build.py 產生
src/app.html        網站原始碼（版面＋程式），要改網站就改這個
tools/build.py      把 src/app.html 打包回 index.html
api/claude.js       Vercel Serverless Function，代為呼叫 Anthropic API
docs/screenshots/   功能截圖（桌面四個工作區、設定、手機版）
docs/期中報告_論憶.pptx  期中報告投影片（附講稿備註），另有 PDF 版
docs/瀏覽器插件方案.md   做成 Chrome 插件／Google 生態工具的方案比較與路線圖
功能說明.md          完整功能說明
待辦事項.md          已完成與未完成工作
```

## 使用限制

- PDF 最多擷取前 150 頁、300 段；掃描版 PDF 的 OCR 最多 60 頁。
- 寬度 900px 以下為單欄手機版面。
- 瀏覽器 localStorage 約 5 MB，論文很多時請定期匯出備份。
