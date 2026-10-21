"""把 src/app.html 重新打包進 index.html。

index.html 是單一檔案網站：外層的解包程式、React 與執行環境（manifest）維持不變，
只替換 __bundler/template 區塊。用法：python3 tools/build.py
"""
import json
import pathlib
import re

root = pathlib.Path(__file__).resolve().parent.parent
index = root / 'index.html'
app = (root / 'src' / 'app.html').read_text(encoding='utf-8')

encoded = json.dumps(app, ensure_ascii=False).replace('</', '<\\u002F')
html = index.read_text(encoding='utf-8')
pat = re.compile(r'(<script type="__bundler/template">\n).*?(\n  </script>)', re.S)
if not pat.search(html):
    raise SystemExit('index.html 裡找不到 __bundler/template 區塊')
html = pat.sub(lambda m: m.group(1) + encoded + m.group(2), html, count=1)
index.write_text(html, encoding='utf-8')
print(f'已更新 index.html（{len(html.encode()) // 1024} KB）')
