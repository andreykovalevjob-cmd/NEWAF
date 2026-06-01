# CONTEXT — another fashion site

**Репо:** https://github.com/andreykovalevjob-cmd/NewAffaMac  
**Прод:** https://new-affa-mac.vercel.app (Vercel, проект `new-affa-mac`)  
**Домен:** anotherfashion.agency (GoDaddy, подключается)  
**Стек:** статика, React 18 + Babel-standalone (CDN), без билда  
**Деплой:** пуш в `main` → Vercel автоматически  
**Vercel team:** `team_SFxAvlBC3V3DuBdYMphDLSfG`  
**Vercel project:** `prj_xpiKsTh4N5BGQOYqSY26s1xEDrGn`

## Git config (обязательно)
```
user.email = andrey.kovalev.job@gmail.com
user.name  = andreykovalevjob-cmd
```
Vercel блокирует деплой если email не совпадает с GitHub аккаунтом.  
На Маке: `git config --global user.email "andrey.kovalev.job@gmail.com"`

---

## Структура файлов

```
/
├── index.html                  ← главная
├── audit.html
├── marketing.html
├── content-creation.html
├── hrr.html
├── web.html
├── worldwide.html
├── company.html                ← о нас
├── contact.html                ← контакты
├── vercel.json                 ← cleanUrls: true, trailingSlash: false
├── api/
│   └── lead.js                 ← serverless endpoint → Google Sheets
├── css/
│   └── base.css                ← все глобальные стили, CSS-переменные
├── components/
│   ├── header.jsx              ← сквозная шапка (все страницы)
│   └── footer.jsx              ← сквозной футер
├── assets/
│   ├── reel.mp4
│   ├── logos/*.webp            ← логотипы клиентов
│   └── mockups/
│       ├── lavarice-desktop.png
│       └── lavarice-mobile.png
└── pages/
    ├── home-desktop.jsx + home-mobile.jsx + home.jsx
    ├── index.jsx
    ├── audit.jsx + audit-data.js
    ├── marketing.jsx + marketing-data.js
    ├── content-creation.jsx + content-creation-data.js
    ├── hrr.jsx + hrr-data.js
    ├── web.jsx + web-data.js
    ├── worldwide.jsx + worldwide-data.js
    ├── company.jsx + company-data.js
    └── contact.jsx
```

---

## Навигация (header.jsx)

```
аудит / о нас / услуги▾ / портфолио / контакты
```

**Dropdown "услуги":**
- Вывод на зарубежные рынки → /worldwide
- Маркетинг для fashion бренда → /marketing
- Создание контента → /content-creation
- Запуск интернет-магазина → /web
- Построение команды (HR) → /hrr
- Производство → внешняя ссылка

**Удалены:** инвесторам, кейсы, как работаем, финансовое моделирование  
**Подчёркивание у "аудит":** отключено намеренно  
**CTA на service страницах** ведут на `/audit`

---

## Формы и лиды

**Endpoint:** `POST /api/lead` (Vercel serverless)  
**Таблица:** https://docs.google.com/spreadsheets/d/1fLGE5jk9lEJ5rqMQEUw5bTo8-vpk4hfHGSOI7ia9gYQ  
**Apps Script:** `https://script.google.com/macros/s/AKfycbxvutDYQyCxIF0Zv2a5NiNOi_V5huvjDxDHHgxTjgP-bZwnzpNdkpS8rM4aRzsM7JcN/exec`  
**Поля:** name, email, brand, message, source  
**Колонки:** Дата / Имя / Email / Телефон / Бренд / Сообщение / Источник

**Страницы с формами:** `/` (home-desktop + home-mobile), `/index`, `/audit`, `/contact`

---

## CSS-переменные (css/base.css)

| Переменная | Значение | Назначение |
|---|---|---|
| `--v2-ink` | `#fafafa` | основной текст |
| `--v2-paper` | `#0a0a0a` | фон |
| `--v2-muted` | `#707070` | вторичный текст |
| `--v2-line` | `#1f1f1f` | разделители |

Шрифты: **Archivo Black** (заголовки), **JetBrains Mono** (текст, UI)

---

## Шаблон новой страницы

1. `pages/NAME.jsx` → экспортирует `window.NAMEPage`
2. `pages/NAME-data.js` → данные в `window.NAMEData` (опционально)
3. `NAME.html`:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#0a0a0a">
  <title>ЗАГОЛОВОК — another fashion</title>
  <link rel="stylesheet" href="/css/base.css">
</head>
<body>
  <div id="root"></div>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script type="text/babel" src="/components/header.jsx"></script>
  <script type="text/babel" src="/components/footer.jsx"></script>
  <script src="/pages/NAME-data.js"></script>
  <script type="text/babel" src="/pages/NAME.jsx"></script>
  <script type="text/babel" data-presets="react">
    ReactDOM.createRoot(document.getElementById('root')).render(<window.NAMEPage />);
  </script>
</body>
</html>
```

---

## Что где менять

| Задача | Файл |
|---|---|
| Меню, логотип | `components/header.jsx` |
| Футер, контакты | `components/footer.jsx` |
| Цвета, шрифты | `css/base.css` |
| Контент страницы | `pages/NAME.jsx` |
| Данные (тарифы, кейсы) | `pages/NAME-data.js` |
| Приём заявок | `api/lead.js` |
| Google Sheets скрипт | script.google.com → таблица Requests |

---

## Контакты проекта

- Email: sale@anotherfashion.agency / audit@anotherfashion.agency
- Telegram: @anotherfashion
- WhatsApp: +7 989 592-17-39

---

## Как Claude пушит изменения

Claude работает через временную папку `/tmp/newaffamac` — это клон репо внутри сессии.

**Начало каждого нового чата:**
```bash
cd /tmp && git clone https://TOKEN@github.com/andreykovalevjob-cmd/NewAffaMac.git newaffamac
cd /tmp/newaffamac
git config user.email "andrey.kovalev.job@gmail.com"
git config user.name "andreykovalevjob-cmd"
```

**Токен:** нужно вставить в начале чата (в репо не хранится из соображений безопасности).  
Формат: `ghp_...`

**Рабочий цикл:**
1. Внести изменения в файлы в `/tmp/newaffamac/`
2. `git add .`
3. `git commit -m "описание"`
4. `git pull --rebase origin main` (на случай если были пуши с Мака)
5. `git push origin main`

**Если репо уже клонирован в сессии** (продолжение чата):
```bash
cd /tmp/newaffamac && git pull --rebase origin main
```

**Важно:** Vercel деплоит автоматически после каждого пуша в `main`.  
Если деплой заблокирован — значит email в git config не совпадает с GitHub аккаунтом.
