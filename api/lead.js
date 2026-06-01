const SHEET_URL =
  'https://script.google.com/macros/s/AKfycbyV2NCc0Hg8HoJm317cE20WDHPQkCKz86njpPNxsGA2eCmMvCh2qZJkLRAM6wIlr753Bw/exec';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const b = req.body || {};
  console.log('LEAD RAW:', JSON.stringify(b));

  // ── Поиск по имени ключа
  const find = (...keys) => {
    for (const k of keys) {
      if (b[k] !== undefined && String(b[k]).trim()) return String(b[k]).trim();
    }
    return '';
  };

  let name = find(
    'name', 'NAME', 'Name',
    'имя', 'Имя', 'ИМЯ',
    'username', 'fullname', 'full_name',
    'контакт', 'Контакт', 'contact',
  );

  let phone = find(
    'phone', 'PHONE', 'Phone',
    'телефон', 'Телефон', 'ТЕЛЕФОН',
    'tel', 'Tel', 'TEL',
    'mobile', 'Mobile',
    'номер', 'Номер',
  );

  let email = find(
    'email', 'EMAIL', 'Email',
    'почта', 'Почта', 'ПОЧТА',
    'mail', 'Mail', 'MAIL',
    'e-mail', 'E-mail',
  );

  const brand = find(
    'brand', 'BRAND', 'Brand',
    'бренд', 'Бренд', 'БРЕНД',
    'company', 'Company',
    'компания', 'Компания',
    'brand-name', 'brandName',
  );

  const message = find(
    'message', 'MESSAGE', 'Message',
    'сообщение', 'Сообщение', 'СООБЩЕНИЕ',
    'comment', 'Comment',
    'комментарий', 'Комментарий',
    'text', 'Text', 'note',
  );

  const source = find('source', 'SOURCE', 'Source') || '/';

  // ── Fallback: поиск по паттерну значения
  const entries = Object.entries(b).filter(
    ([k]) => !['source', 'date', 'service', 'budget'].includes(k)
  );

  if (!email) {
    const found = entries.find(([, v]) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim())
    );
    if (found) email = String(found[1]).trim();
  }

  if (!phone) {
    const found = entries.find(([, v]) =>
      /^[\d\s\+\-\(\)]{7,20}$/.test(String(v || '').trim())
    );
    if (found) phone = String(found[1]).trim();
  }

  if (!name) {
    const used = new Set([email, phone]);
    const found = entries.find(([k, v]) => {
      const s = String(v || '').trim();
      return s && !used.has(s) && !/^\d+$/.test(s);
    });
    if (found) name = String(found[1]).trim();
  }

  if (!name || !phone || !email) {
    console.warn('LEAD INCOMPLETE — name:', name, '| phone:', phone, '| email:', email);
    console.warn('Keys received:', Object.keys(b));
  }

  const row = {
    date:    new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' }),
    name:    name    || '(не указано)',
    phone:   phone   || '(не указано)',
    email:   email   || '(не указано)',
    brand:   brand   || '',
    message: message || '',
    source,
  };

  console.log('LEAD:', JSON.stringify(row));

  // ── Отправка в Google Sheets — с редиректами и повтором
  let sheetOk = false;
  let sheetError = null;

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const r = await fetch(SHEET_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Vercel/1.0',
        },
        body: JSON.stringify(row),
        redirect: 'follow', // следуем редиректам Google
      });

      const responseText = await r.text();
      console.log(`Sheets attempt ${attempt}: status=${r.status} body=${responseText.slice(0, 200)}`);

      if (r.ok) {
        sheetOk = true;
        break;
      } else {
        sheetError = `${r.status}: ${responseText.slice(0, 100)}`;
      }
    } catch (err) {
      sheetError = err.message;
      console.error(`Sheets attempt ${attempt} error:`, err.message);
    }
  }

  if (!sheetOk) {
    console.error('Sheets final error:', sheetError);
  }

  return res.status(200).json({ ok: true, sheetOk, sheetError });
}
