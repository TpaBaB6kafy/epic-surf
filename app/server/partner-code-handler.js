import { createHash } from 'node:crypto';

const attributionKeys = ['partner', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'landing_page'];
const windowMs = 10 * 60 * 1000;
const maxBodyBytes = 4096;
const hash = value => createHash('sha256').update(value).digest('hex');
const reply = (status, body, headers = {}) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } });

// Per-instance backstop. Use platform rate limiting for a distributed deployment.
export function createPartnerCodeHandler({ fetchImpl = fetch, env = process.env, now = Date.now } = {}) {
  const attempts = new Map();
  const sent = new Map();
  const inFlight = new Map();
  return async request => {
    const origin = request.headers.get('origin');
    if (origin && origin !== new URL(request.url).origin) return reply(403, { ok: false });
    if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return reply(415, { ok: false });
    if (Number(request.headers.get('content-length')) > maxBodyBytes) return reply(413, { ok: false });
    let data;
    try {
      const text = await request.text();
      if (Buffer.byteLength(text) > maxBodyBytes) return reply(413, { ok: false });
      data = JSON.parse(text);
    } catch { return reply(400, { ok: false }); }
    if (!data || typeof data !== 'object' || Array.isArray(data)) return reply(400, { ok: false });
    if (data.website) return reply(200, { ok: true }); // Honeypot never reaches the bot.
    const email = typeof data.email === 'string' ? data.email.trim() : '';
    const language = data.language;
    if (email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) || !['en', 'ru'].includes(language)) return reply(400, { ok: false, error: 'invalid_email' });
    const token = env.PARTNER_TELEGRAM_BOT_TOKEN;
    const chatId = env.PARTNER_TELEGRAM_CHAT_ID;
    if (!token || !chatId) return reply(503, { ok: false, error: 'unavailable' });
    const time = now();
    for (const [key, value] of attempts) if (value.until <= time) attempts.delete(key);
    for (const [key, expiry] of sent) if (expiry <= time) sent.delete(key);
    const emailKey = hash(email.toLowerCase());
    if (sent.has(emailKey)) return reply(200, { ok: true });
    if (inFlight.has(emailKey)) return (await inFlight.get(emailKey)) ? reply(200, { ok: true }) : reply(502, { ok: false });
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown';
    const ipKey = hash(ip);
    const quota = attempts.get(ipKey) || { count: 0, until: time + windowMs };
    if (quota.count >= 3) return reply(429, { ok: false }, { 'Retry-After': String(Math.ceil((quota.until - time) / 1000)) });
    if (attempts.size >= 10000) return reply(429, { ok: false }, { 'Retry-After': '60' });
    attempts.set(ipKey, { ...quota, count: quota.count + 1 });
    const attribution = data.attribution && typeof data.attribution === 'object' ? data.attribution : {};
    const lines = ['EPIC — запрос партнёрского кода', `Email: ${email}`, `Язык: ${language}`, `Страница: ${language === 'ru' ? '/ru/partners' : '/partners'}`];
    for (const key of attributionKeys) {
      const raw = attribution[key];
      if (typeof raw === 'string' && raw.trim()) lines.push(`${key}: ${raw.replace(/[\r\n\u0000-\u001f]/g, ' ').slice(0, 200)}`);
    }
    lines.push('Пришлите партнёрский код на указанный email.');
    const delivery = (async () => {
      try {
        const response = await fetchImpl(`https://api.telegram.org/bot${token}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: chatId, text: lines.join('\n'), link_preview_options: { is_disabled: true } }), signal: AbortSignal.timeout(10000), cache: 'no-store' });
        const result = await response.json();
        return response.ok && result.ok === true;
      } catch { return false; } // Never expose bot credentials or remote errors to the browser/logs.
    })();
    inFlight.set(emailKey, delivery);
    const delivered = await delivery;
    inFlight.delete(emailKey);
    if (!delivered) return reply(502, { ok: false, error: 'delivery_failed' });
    sent.set(emailKey, now() + windowMs);
    return reply(200, { ok: true });
  };
}
