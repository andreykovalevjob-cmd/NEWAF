# another fashion — site/

Структура многостраничного сайта со сквозной шапкой и футером.
Никакого билда: React + Babel-standalone тянутся из CDN, всё работает как обычная
статика на Vercel / Netlify / GitHub Pages.

## Структура

```
site/
├── index.html             ← главная (использует SiteHeader + HomePage + SiteFooter)
├── audit.html             ← страница аудита (тот же SiteHeader/SiteFooter, своя страница)
├── vercel.json            ← cleanUrls для красивых URL без .html
├── components/
│   ├── header.jsx         ← ОДИН файл — шапка для всех страниц
│   └── footer.jsx         ← ОДИН файл — футер для всех страниц
├── pages/
│   ├── home.jsx           ← контент главной (без шапки/футера)
│   └── audit.jsx          ← контент аудита (без шапки/футера)
├── css/
│   └── base.css           ← глобальные стили + шрифты с Google Fonts
└── assets/
    └── logos/             ← логотипы клиентов в webp
```

## Что менять и где

| Хочу поменять                 | Файл                          |
|-------------------------------|-------------------------------|
| Пункты меню в шапке           | `components/header.jsx`       |
| Подсветить активный пункт     | проп `active="audit"` в странице |
| Логотип / название агентства  | `components/header.jsx`       |
| Email, копирайт, ссылки футера| `components/footer.jsx`       |
| Контент главной               | `pages/home.jsx`              |
| Контент аудита                | `pages/audit.jsx`             |
| Цвета (paper / ink / muted)   | `css/base.css` (CSS-переменные) |

Поменяли `header.jsx` — обновилось и на главной, и на аудите. Это и есть «сквозная шапка».

## Добавить новую страницу

1. Создать `pages/contact.jsx` со своим компонентом и `window.ContactPage = ContactPage`.
2. Скопировать `audit.html` в `contact.html`, заменить пути на `pages/contact.jsx`
   и в монтаже — `<window.ContactPage />`.
3. Готово. Шапка/футер прилетают автоматически.

## Локальный просмотр

Любой простой статический сервер из папки `site/`:

```bash
cd site
python3 -m http.server 8000
# открыть http://localhost:8000
```

Открытие `index.html` напрямую из файла **не сработает** (Babel не загрузит модули
через `file://`). Только через сервер.

## Деплой на Vercel

Вариант А — через дашборд:
1. https://vercel.com/new
2. Перетащить папку `site/` (или зип) в проект.
3. Готово.

Вариант Б — через git:
1. Запушить папку `site/` в репозиторий.
2. На vercel.com подключить репо.
3. Root Directory = `site`, framework = «Other», build command пустой.

## Если нужно ускорение в проде

Babel в браузере жрёт CPU. Когда сайт устаканится, можно переехать на:
- **Astro** — те же компоненты, статический HTML на выходе, ноль JS-оверхеда.
- **Next.js** — если планируется динамика (формы, API).

Готов помочь с переездом, когда будете готовы.
