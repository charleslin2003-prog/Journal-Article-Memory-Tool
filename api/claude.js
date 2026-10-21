// Vercel Serverless Function：替前端代為呼叫 Anthropic API，金鑰只存在伺服器環境變數。
// 環境變數：
//   ANTHROPIC_API_KEY  必填，Anthropic API 金鑰
//   LUNYI_ACCESS_CODE  選填，設定後前端必須在「設定」輸入相同的存取碼才能使用
//   LUNYI_MODEL        選填，預設 claude-sonnet-5-5
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'POST only' });
  }
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return res.status(404).json({ error: 'AI backend not configured' });

  const code = process.env.LUNYI_ACCESS_CODE;
  if (code && req.headers['x-lunyi-code'] !== code) {
    return res.status(401).json({ error: 'bad access code' });
  }

  const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  if (!Array.isArray(b.messages) || !b.messages.length) {
    return res.status(400).json({ error: 'messages required' });
  }
  const body = {
    model: process.env.LUNYI_MODEL || 'claude-sonnet-5-5',
    max_tokens: Math.min(Number(b.max_tokens) || 1500, 4000),
    messages: b.messages,
  };
  if (typeof b.system === 'string') body.system = b.system;

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });
    const data = await r.json();
    return res.status(r.ok ? 200 : 502).json(data);
  } catch (e) {
    return res.status(502).json({ error: String(e) });
  }
};
