// Marketing — страница услуги «Маркетинг для fashion-бренда».
// Каждый из 4 модулей идёт со своей визуализацией (воронка, бюджет, отчёт, прогноз)
// в брутальном wireframe-стиле — без картинок, на хайрлайн-бордерах и моно-шрифте.
// Контент — в marketing-data.js (window.MARKETING).

const useMarketingViewport = () => {
  const get = () => {
    if (typeof window === 'undefined') return { isMobile: false, isTablet: false };
    const w = window.innerWidth;
    return { isMobile: w < 768, isTablet: w >= 768 && w < 1024 };
  };
  const [v, setV] = React.useState(get);
  React.useEffect(() => {
    const on = () => setV(get());
    window.addEventListener('resize', on);
    window.addEventListener('orientationchange', on);
    return () => {
      window.removeEventListener('resize', on);
      window.removeEventListener('orientationchange', on);
    };
  }, []);
  return v;
};

const MarketingPage = () => {
  const M = window.MARKETING;

  const ink   = 'var(--v2-ink, #fafafa)';
  const paper = 'var(--v2-paper, #0a0a0a)';
  const muted = 'var(--v2-muted, #707070)';
  const line  = 'var(--v2-line, #1f1f1f)';
  const deep  = '#050505';

  const { isMobile, isTablet } = useMarketingViewport();
  const pad = isMobile ? 20 : (isTablet ? 36 : 56);
  const sectionPadY = isMobile ? 56 : (isTablet ? 80 : 96);

  const wrap = { width: '100%', maxWidth: 1600, margin: '0 auto', padding: `0 ${pad}px` };
  const monoLabel = {
    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
    fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: muted,
  };
  const monoBody = {
    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
    fontSize: isMobile ? 13 : 14, lineHeight: 1.55, color: ink,
  };
  const display = {
    fontFamily: '"Archivo Black", "Helvetica Neue", sans-serif',
    fontWeight: 900,
  };

  // ─── маленькие универсальные блоки ─────────────────────────────

  // Бокс с хайрлайн-обводкой и моно-подписью сверху
  const Boxed = ({ label, big, sub, style }) => (
    <div style={{ border: `1px solid ${line}`, padding: isMobile ? 12 : 16, ...style }}>
      {label && <div style={{ ...monoLabel, fontSize: 9, marginBottom: 6 }}>{label}</div>}
      <div style={{
        ...display, fontSize: isMobile ? 13 : 15,
        letterSpacing: '-0.01em', textTransform: 'uppercase', color: ink,
        lineHeight: 1.15,
      }}>{big}</div>
      {sub && <div style={{ ...monoLabel, fontSize: 9, marginTop: 6, color: muted, textTransform: 'none', letterSpacing: 0.4 }}>{sub}</div>}
    </div>
  );

  // Список буллетов модуля
  const BulletList = ({ items }) => (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12 }}>
      {items.map((it, i) => (
        <li key={i} style={{
          ...monoBody, color: muted, fontSize: isMobile ? 12 : 13,
          display: 'grid', gridTemplateColumns: '16px 1fr', gap: 10,
          alignItems: 'baseline',
        }}>
          <span style={{ color: ink }}>→</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );

  // Большой заголовок модуля с номером
  const ModuleHeader = ({ n, title }) => (
    <div style={{
      display: 'flex', alignItems: 'baseline', gap: 14,
      marginBottom: isMobile ? 22 : 28,
    }}>
      <span style={{ ...monoLabel, fontSize: 11, color: muted }}>[{n}]</span>
      <h3 style={{
        ...display, fontSize: isMobile ? 'clamp(28px, 7vw, 36px)' : 'clamp(36px, 4vw, 56px)',
        letterSpacing: '-0.02em', textTransform: 'uppercase',
        margin: 0, color: ink, lineHeight: 1.05,
      }}>{title}</h3>
    </div>
  );

  // ─── визуализации ─────────────────────────────────────────────

  // 01 — бюджетная сетка планирования (4 колонки + CRM сбоку)
  const VizBudget = () => {
    const cols = [
      { pct: '50%', t: 'Рост аудитории', sub: '(новая)',     ch: 'охватные кампании · соц',                  metric: 'CPS',  res: '3 333 subs' },
      { pct: '20%', t: 'Рост продаж',    sub: '(текущая)',    ch: 'все площадки + retarget',                  metric: 'CPO',  res: '66 orders' },
      { pct: '20%', t: 'Рост продаж',    sub: '(новая)',      ch: 'все площадки + retarget',                  metric: 'CAC',  res: '— orders' },
      { pct: '10%', t: 'Retargeting',    sub: 'brand protect.', ch: 'Yandex ads · global + merch',            metric: 'CPRO', res: '24 orders' },
    ];
    return (
      <div style={{ border: `1px solid ${line}`, padding: isMobile ? 16 : 22 }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          padding: '6px 10px', border: `1px solid ${line}`,
          marginBottom: isMobile ? 16 : 22,
        }}>
          <div style={{ ...display, fontSize: isMobile ? 12 : 14, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
            СТРАТЕГИЯ
          </div>
          <div style={{ ...monoLabel, fontSize: 10, color: muted, textTransform: 'none', letterSpacing: 0.5 }}>
            Бюджет на неделю ~ ( ___ )
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: 0, border: `1px solid ${line}`,
        }}>
          {cols.map((c, i) => (
            <div key={i} style={{
              padding: isMobile ? 12 : 16,
              borderRight: !isMobile && i < 3 ? `1px solid ${line}` :
                           (isMobile && i % 2 === 0 ? `1px solid ${line}` : 'none'),
              borderBottom: isMobile && i < 2 ? `1px solid ${line}` : 'none',
              display: 'flex', flexDirection: 'column', gap: 8,
            }}>
              <div style={{ ...display, fontSize: isMobile ? 16 : 22, color: ink, letterSpacing: '-0.02em' }}>{c.pct}</div>
              <div style={{ ...monoLabel, fontSize: 9, color: ink, textTransform: 'uppercase' }}>{c.t}</div>
              <div style={{ ...monoLabel, fontSize: 9, color: muted, textTransform: 'none', letterSpacing: 0.4 }}>{c.sub}</div>
              <div style={{ ...monoBody, fontSize: 11, color: muted, marginTop: 6 }}>{c.ch}</div>
              <div style={{
                marginTop: 'auto', paddingTop: 10,
                borderTop: `1px dashed ${line}`,
                display: 'flex', justifyContent: 'space-between',
                ...monoLabel, fontSize: 10, color: muted, textTransform: 'uppercase',
              }}>
                <span>{c.metric}</span>
                <span style={{ color: ink }}>{c.res}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: isMobile ? 16 : 22, padding: isMobile ? 12 : 14,
          border: `1px solid ${line}`,
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'auto 1fr',
          gap: isMobile ? 8 : 16, alignItems: 'baseline',
        }}>
          <div style={{ ...display, fontSize: isMobile ? 13 : 15, letterSpacing: '-0.01em' }}>CRM</div>
          <div style={{ ...monoBody, fontSize: 11, color: muted }}>
            работа с базой · email-маркетинг · sms · прочее
          </div>
        </div>
      </div>
    );
  };

  // 02 — маркетинговая воронка (inline SVG, по мотивам оригинала)
  const VizFunnel = () => {
    const sansHeavy = '"Archivo Black","Helvetica Neue",sans-serif';
    const sans      = '"Manrope","Helvetica Neue",sans-serif';
    const txt       = '#fafafa';
    const dim       = '#9a9a9a';

    return (
      <div style={{ border: `1px solid ${line}`, padding: isMobile ? 12 : 16, background: paper }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          marginBottom: 12,
        }}>
          <div style={{ ...monoLabel, fontSize: 9, color: muted }}>[ маркетинговая воронка ]</div>
          <div style={{ ...monoLabel, fontSize: 9, color: muted, textTransform: 'none', letterSpacing: 0.5 }}>
            omnichannel
          </div>
        </div>

        <svg
          viewBox="0 0 1200 760"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        >
          <defs>
            <linearGradient id="funnelGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"  stopColor="#ffffff" stopOpacity="0.55" />
              <stop offset="55%" stopColor="#ffffff" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.04" />
            </linearGradient>
            <marker id="arrowEnd" viewBox="0 0 10 10" refX="5" refY="5"
                    markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={txt} />
            </marker>
          </defs>

          {/* Заголовок */}
          <text x="600" y="55" textAnchor="middle"
                fontFamily={sansHeavy} fontWeight="900" fontSize="42" fill={txt}>
            МАРКЕТИНГОВАЯ ВОРОНКА
          </text>

          {/* Подпись слева */}
          <text x="60" y="225" fontFamily={sans} fontSize="14" fill={dim}>
            <tspan x="60" dy="0">Методологический подход к</tspan>
            <tspan x="60" dy="20">увеличению привлечения и</tspan>
            <tspan x="60" dy="20">удержания клиентов с помощью</tspan>
            <tspan x="60" dy="20">омниканальной стратегии</tspan>
          </text>

          {/* Верхний box: ИНФЛЮЕНСЕРЫ / PR / ИВЕНТЫ */}
          <rect x="380" y="115" width="440" height="60"
                fill="none" stroke={txt} strokeWidth="1" />
          <text x="600" y="153" textAnchor="middle"
                fontFamily={sans} fontWeight="600" fontSize="22" fill={txt} letterSpacing="2">
            ИНФЛЮЕНСЕРЫ / PR / ИВЕНТЫ
          </text>

          {/* Пунктирные дуги к боковым меткам */}
          <path d="M 400 175 Q 230 230 130 410"
                fill="none" stroke="#777" strokeWidth="1" strokeDasharray="2 5" />
          <path d="M 800 175 Q 970 230 1070 410"
                fill="none" stroke="#777" strokeWidth="1" strokeDasharray="2 5" />

          {/* Левая метка */}
          <text x="130" y="440" textAnchor="middle"
                fontFamily={sans} fontWeight="600" fontSize="16" fill={txt} letterSpacing="1.5">
            <tspan x="130" dy="0">БРЕНДЫ</tspan>
            <tspan x="130" dy="22">КОНКУРЕНТОВ</tspan>
          </text>

          {/* Правая метка */}
          <text x="1070" y="440" textAnchor="middle"
                fontFamily={sans} fontWeight="600" fontSize="16" fill={txt} letterSpacing="1.5">
            <tspan x="1070" dy="0">РОЗНИЧНЫЕ/ОПТОВЫЕ</tspan>
            <tspan x="1070" dy="22">ПАРТНЁРЫ</tspan>
          </text>

          {/* Воронка-треугольник */}
          <polygon points="290,220 910,220 600,690"
                   fill="url(#funnelGrad)" />

          {/* 1. СОЦСЕТИ БРЕНДА */}
          <text x="600" y="265" textAnchor="middle"
                fontFamily={sans} fontWeight="600" fontSize="20" fill={txt} letterSpacing="2">
            СОЦСЕТИ БРЕНДА
          </text>
          <text x="600" y="293" textAnchor="middle"
                fontFamily={sans} fontSize="11" fill={dim} letterSpacing="1">
            СИЛЬНЫЙ ДНК БРЕНДА И РЕГУЛЯРНЫЙ SOCIAL
          </text>
          <text x="600" y="310" textAnchor="middle"
                fontFamily={sans} fontSize="11" fill={dim} letterSpacing="1">
            КОНТЕНТ
          </text>
          <line x1="600" y1="328" x2="600" y2="358"
                stroke={txt} strokeWidth="1" markerEnd="url(#arrowEnd)" />

          {/* 2. ВИЗИТ САЙТА */}
          <text x="600" y="390" textAnchor="middle"
                fontFamily={sans} fontWeight="600" fontSize="20" fill={txt} letterSpacing="2">
            ВИЗИТ САЙТА
          </text>

          {/* Боковые подписи каналов трафика */}
          <text x="360" y="460" textAnchor="middle"
                fontFamily={sans} fontWeight="500" fontSize="13" fill={txt} letterSpacing="1.5">
            ЯНДЕКС ORGANIC SEARCH
          </text>
          <text x="840" y="460" textAnchor="middle"
                fontFamily={sans} fontWeight="500" fontSize="13" fill={txt} letterSpacing="1.5">
            ЯНДЕКС PAID ADS
          </text>

          <line x1="600" y1="410" x2="600" y2="445"
                stroke={txt} strokeWidth="1" markerEnd="url(#arrowEnd)" />

          {/* 3. ДЕЙСТВИЕ НА САЙТЕ — пунктирная рамка */}
          <rect x="420" y="475" width="360" height="60"
                fill="none" stroke="#888" strokeWidth="1" strokeDasharray="2 5" />
          <text x="600" y="500" textAnchor="middle"
                fontFamily={sans} fontWeight="600" fontSize="17" fill={txt} letterSpacing="2">
            ДЕЙСТВИЕ НА САЙТЕ
          </text>
          <text x="600" y="522" textAnchor="middle"
                fontFamily={sans} fontSize="11" fill={dim} letterSpacing="0.8">
            ПОДПИСКА | ДОБАВЛЕНИЕ В КОРЗИНУ | ДОБАВЛЕНИЕ В ВИШЛИСТ
          </text>
          <line x1="600" y1="545" x2="600" y2="580"
                stroke={txt} strokeWidth="1" markerEnd="url(#arrowEnd)" />

          {/* 4. Email / Paid social / Paid yandex */}
          <text x="600" y="610" textAnchor="middle"
                fontFamily={sans} fontWeight="500" fontSize="15" fill={txt} letterSpacing="1.5">
            EMAIL МАРКЕТИНГ | SOCIAL PAID ADS | ЯНДЕКС PAID ADS
          </text>
          <text x="600" y="630" textAnchor="middle"
                fontFamily={sans} fontSize="10" fill={dim} letterSpacing="2">
            LOOK-A-LIKE & RE-TARGETING
          </text>
          <line x1="600" y1="650" x2="600" y2="685"
                stroke={txt} strokeWidth="1" markerEnd="url(#arrowEnd)" />

          {/* 5. ЗАКАЗ */}
          <text x="600" y="722" textAnchor="middle"
                fontFamily={sans} fontWeight="600" fontSize="18" fill={txt} letterSpacing="3">
            ЗАКАЗ
          </text>
        </svg>
      </div>
    );
  };

  // 03 — отчётность plan/fact (пример данных несуществующего бренда)
  const VizReport = () => {
    const green = '#3dd183';
    const red   = '#e85a5a';

    // dir: 'up' — больше = лучше, 'down' — меньше = лучше
    const allRows = [
      { k: 'Revenue',    p: '39 830 316 ₽', f: '42 378 653 ₽', pct: 106.40, dir: 'up'   },
      { k: 'Clicks',     p: '447 929',      f: '362 374',      pct: 80.90,  dir: 'up'   },
      { k: 'CPC',        p: '7,61 ₽',       f: '16,38 ₽',      pct: 215.18, dir: 'down' },
      { k: 'Add to cart',p: '8 345',        f: '8 655',        pct: 103.72, dir: 'up'   },
      { k: 'CR',         p: '1,86 %',       f: '2,39 %',       pct: 128.21, dir: 'up'   },
      { k: 'AOV',        p: '4 773 ₽',      f: '4 896 ₽',      pct: 102.58, dir: 'up'   },
      { k: 'Costs',      p: '3 408 948 ₽',  f: '5 934 307 ₽',  pct: 174.08, dir: 'down' },
      { k: 'CPO',        p: '408,51 ₽',     f: '685,65 ₽',     pct: 167.84, dir: 'down' },
      { k: 'New clients',p: '5 841',        f: '6 059',        pct: 103.72, dir: 'up'   },
      { k: 'CAC',        p: '583,59 ₽',     f: '979,50 ₽',     pct: 167.84, dir: 'down' },
      { k: 'COS',        p: '8,56 %',       f: '14,00 %',      pct: 163.61, dir: 'down' },
    ];

    const socialRows = [
      { k: 'Subscribers',  p: '470 400',    f: '411 835',     pct: 87.55,  dir: 'up'   },
      { k: 'CRTS',         p: '35,00 %',    f: '22,73 %',     pct: 64.95,  dir: 'up'   },
      { k: 'CR to sub',    p: '16,00 %',    f: '23,55 %',     pct: 147.16, dir: 'up'   },
      { k: 'CPS',          p: '75,00 ₽',    f: '43,54 ₽',     pct: 58.06,  dir: 'down' },
      { k: 'Paid clicks',  p: '80 000',     f: '127 312',     pct: 159.14, dir: 'up'   },
      { k: 'Subs / month', p: '12 800',     f: '29 976',      pct: 234.19, dir: 'up'   },
    ];

    const colorFor = (r) => {
      const better = (r.dir === 'up' && r.pct >= 100) || (r.dir === 'down' && r.pct <= 100);
      return better ? green : red;
    };

    // Жёстко зафиксированные ширины колонок — иначе цифры разной длины
    // плывут вправо и колонки не выстраиваются.
    const colTpl = isMobile
      ? '1fr 110px 110px 70px'
      : '1fr 160px 160px 90px';

    const Row = ({ r, last }) => (
      <div style={{
        display: 'grid',
        gridTemplateColumns: colTpl,
        padding: '9px 0', borderBottom: last ? 'none' : `1px solid ${line}`,
        ...monoBody, fontSize: isMobile ? 10.5 : 11.5,
        fontVariantNumeric: 'tabular-nums',
      }}>
        <div style={{ color: ink, fontWeight: 600 }}>{r.k}</div>
        <div style={{ textAlign: 'right', color: muted, whiteSpace: 'nowrap' }}>{r.p}</div>
        <div style={{ textAlign: 'right', color: ink, whiteSpace: 'nowrap' }}>{r.f}</div>
        <div style={{
          textAlign: 'right',
          color: colorFor(r), fontWeight: 700,
          whiteSpace: 'nowrap',
        }}>
          {r.pct.toFixed(2)} %
        </div>
      </div>
    );

    const Header = ({ caption }) => (
      <div style={{
        display: 'grid',
        gridTemplateColumns: colTpl,
        ...monoLabel, fontSize: 9, color: muted, textTransform: 'uppercase',
        padding: '8px 0', borderBottom: `1px solid ${line}`,
      }}>
        <div>{caption}</div>
        <div style={{ textAlign: 'right' }}>план</div>
        <div style={{ textAlign: 'right' }}>факт</div>
        <div style={{ textAlign: 'right' }}>Δ</div>
      </div>
    );

    return (
      <div style={{ border: `1px solid ${line}`, padding: isMobile ? 16 : 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <div style={{ ...monoLabel, fontSize: 9, color: muted }}>[ plan / fact · weekly ]</div>
          <div style={{ ...monoLabel, fontSize: 9, color: muted, textTransform: 'none', letterSpacing: 0.4 }}>
            пример · бренд не существует
          </div>
        </div>

        {/* ВСЕ КАНАЛЫ */}
        <div style={{ ...monoLabel, fontSize: 9, color: ink, letterSpacing: 1.5, padding: '4px 0 2px' }}>
          ALL CHANNELS /
        </div>
        <Header caption="метрика" />
        {allRows.map((r, i) => <Row key={i} r={r} last={i === allRows.length - 1} />)}

        {/* SOCIAL */}
        <div style={{
          ...monoLabel, fontSize: 9, color: ink, letterSpacing: 1.5,
          padding: '16px 0 2px', marginTop: 8, borderTop: `1px solid ${line}`,
        }}>
          SOCIAL /
        </div>
        <Header caption="метрика" />
        {socialRows.map((r, i) => <Row key={i} r={r} last={i === socialRows.length - 1} />)}

        <div style={{
          marginTop: 14, padding: '8px 12px', border: `1px dashed ${line}`,
          ...monoLabel, fontSize: 9, color: muted, textTransform: 'none', letterSpacing: 0.4,
        }}>
          зелёным — расхождение в плюс к плану, красным — в минус. Блоки SEM и DIRECT/SEO в полной версии отчёта.
        </div>
      </div>
    );
  };

  // 04 — прогноз по месяцам (пример несуществующего бренда, US$)
  const VizForecast = () => {
    const allMonths = ['feb','mar','apr','may','jun','jul','aug','sep'];
    const months = isMobile ? allMonths.slice(0, 4) : allMonths;

    // полный массив значений по 8 месяцам
    const data = {
      ALL: [
        { k: 'revenue', accent: true, v: ['499 360','548 538','600 229','654 829','712 812','774 746','841 313','913 334'] },
        { k: 'orders',                 v: ['8 323','9 142','10 004','10 914','11 880','12 912','14 022','15 222'] },
        { k: 'CR %',                   v: ['3,19','3,18','3,16','3,14','3,12','3,09','3,07','3,04'] },
        { k: 'AOV',                    v: ['60','60','60','60','60','60','60','60'] },
        { k: 'CAC',                    v: ['7','7','7','7','7','7','7','7'] },
        { k: 'COS %',                  v: ['8,55','8,17','7,90','7,71','7,60','7,57','7,60','7,70'] },
      ],
      NL: [
        { k: 'subs DB',  accent: true, v: ['126 037','144 982','165 821','188 706','213 825','241 398','271 691','305 025'] },
        { k: 'sent',                   v: ['25 207','28 996','33 164','37 741','42 765','48 280','54 338','61 005'] },
        { k: 'OR %',                   v: ['20','20','20','20','20','20','20','20'] },
      ],
      IG: [
        { k: 'revenue', accent: true,  v: ['264 415','285 674','306 934','328 193','349 453','370 712','391 972','413 231'] },
        { k: 'clicks',                 v: ['119 400','129 000','138 600','148 200','157 800','167 400','177 000','186 600'] },
        { k: 'CR traff %',             v: ['30','30','30','30','30','30','30','30'] },
      ],
      SEM: [
        { k: 'revenue', accent: true,  v: ['32 098','38 518','46 221','55 465','66 558','79 870','95 844','115 013'] },
        { k: 'clicks',                 v: ['35 664','42 797','51 357','61 628','73 954','88 744','106 493','127 792'] },
        { k: 'orders',                 v: ['535','642','770','924','1 108','1 331','1 597','1 917'] },
        { k: 'CTR %',                  v: ['33','33','33','33','33','33','33','33'] },
      ],
    };

    const sliceCount = months.length;

    return (
      <div style={{ border: `1px solid ${line}`, padding: isMobile ? 14 : 20, overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
          <div style={{ ...monoLabel, fontSize: 9, color: muted }}>[ forecast · monthly · US$ ]</div>
          <div style={{ ...monoLabel, fontSize: 9, color: muted, textTransform: 'none', letterSpacing: 0.4 }}>
            пример · бренд не существует
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: `78px repeat(${sliceCount}, 1fr)`,
          padding: '6px 0', borderBottom: `1px solid ${line}`,
          ...monoLabel, fontSize: 9, color: muted, textTransform: 'uppercase',
        }}>
          <div>канал</div>
          {months.map((m, i) => (
            <div key={i} style={{ textAlign: 'right' }}>{m}</div>
          ))}
        </div>

        {Object.entries(data).map(([seg, rows], segIdx) => (
          <React.Fragment key={seg}>
            <div style={{
              padding: '10px 0 4px',
              ...monoLabel, fontSize: 9, color: ink, letterSpacing: 1.5,
              borderTop: segIdx > 0 ? `1px solid ${line}` : 'none',
              marginTop: segIdx > 0 ? 6 : 0,
            }}>{seg} /</div>
            {rows.map((r, i) => (
              <div key={`${seg}-${i}`} style={{
                display: 'grid',
                gridTemplateColumns: `78px repeat(${sliceCount}, 1fr)`,
                padding: '4px 0',
                ...monoBody, fontSize: isMobile ? 9.5 : 10.5,
              }}>
                <div style={{ color: muted, fontSize: isMobile ? 9.5 : 10.5 }}>{r.k}</div>
                {r.v.slice(0, sliceCount).map((val, j) => (
                  <div key={j} style={{
                    textAlign: 'right',
                    color: r.accent ? ink : muted,
                    fontWeight: r.accent ? 700 : 400,
                    fontVariantNumeric: 'tabular-nums',
                  }}>{val}</div>
                ))}
              </div>
            ))}
          </React.Fragment>
        ))}

        <div style={{
          marginTop: 12, padding: '6px 10px', border: `1px dashed ${line}`,
          ...monoLabel, fontSize: 9, color: muted, textTransform: 'none', letterSpacing: 0.4,
        }}>
          {isMobile
            ? 'показаны 4 месяца — full-полный отчёт на 8+ месяцев + DIRECT/SEO/AFFILIATE'
            : 'feb → sep шаг 1 мес · DIRECT / SEO / AFFILIATE / OTHER + блоки CAC, CPO, COS — в полной версии'}
        </div>
      </div>
    );
  };

  // ─── одна универсальная секция: header + bullets + visual ──────
  const ModuleSection = ({ n, title, items, Viz, reverse }) => (
    <section style={{ padding: `${sectionPadY}px 0`, borderTop: `1px solid ${line}` }}>
      <div style={wrap}>
        <ModuleHeader n={n} title={title} />
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1.1fr',
          gap: isMobile ? 28 : 56, alignItems: 'start',
          direction: isMobile ? 'ltr' : (reverse ? 'rtl' : 'ltr'),
        }}>
          <div style={{ direction: 'ltr' }}>
            <BulletList items={items} />
          </div>
          <div style={{ direction: 'ltr' }}>
            <Viz />
          </div>
        </div>
      </div>
    </section>
  );

  // ─── return ─────────────────────────────────────────────────
  return (
    <React.Fragment>
      <window.SiteHeader active="services" />

      <div data-screen-label="Marketing" style={{
        width: '100%', maxWidth: 1600, margin: '0 auto',
        background: paper, color: ink,
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        overflowX: 'hidden',
      }}>

        {/* HERO */}
        <section style={{ ...wrap, padding: `${isMobile ? 40 : 64}px ${pad}px ${isMobile ? 56 : 80}px` }}>
          <div style={{
            display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap',
            marginBottom: isMobile ? 22 : 32,
          }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: isMobile ? '8px 12px' : '10px 14px',
              border: `1px solid ${ink}`, color: ink, background: 'transparent',
              fontFamily: '"JetBrains Mono", monospace', fontWeight: 700,
              fontSize: isMobile ? 11 : 12, letterSpacing: 1.5, textTransform: 'uppercase',
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%', background: ink, display: 'inline-block',
              }} />
              УСЛУГА
            </span>
            <span style={{ ...monoLabel, color: ink, fontSize: isMobile ? 10 : 11 }}>
              {`>>> ${M.hero.eyebrow}`}
            </span>
            <span style={{ ...monoLabel, fontSize: isMobile ? 10 : 11 }}>
              · {M.hero.kicker}
            </span>
            <a href={M.hero.tg.h} target="_blank" rel="noopener" style={{
              marginLeft: isMobile ? 0 : 'auto',
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: isMobile ? '6px 10px' : '8px 12px',
              border: `1px solid ${line}`,
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: isMobile ? 10 : 11, letterSpacing: 1, textTransform: 'uppercase',
              color: muted, textDecoration: 'none',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#33ade7' }} />
              [ tg → {M.hero.tg.l} ]
            </a>
          </div>

          <h1 style={{
            ...display,
            fontSize: isMobile ? 'clamp(34px, 9vw, 56px)' : 'clamp(64px, 8vw, 144px)',
            lineHeight: 0.92,
            letterSpacing: '-0.05em', margin: 0, color: ink,
            textTransform: 'lowercase',
            overflowWrap: 'anywhere',
          }}>{M.hero.title}</h1>

          <div style={{
            marginTop: isMobile ? 32 : 48,
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
            gap: isMobile ? 24 : 32,
            borderTop: `1px solid ${line}`, paddingTop: isMobile ? 24 : 32, alignItems: 'start',
          }}>
            <p style={{
              ...monoBody, margin: 0,
              gridColumn: isMobile ? 'auto' : 'span 2',
              maxWidth: 640,
            }}>
              {M.hero.body}
              <span style={{ display: 'block', marginTop: 14, color: muted }}>{M.hero.body2}</span>
            </p>
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 10,
              alignItems: isMobile ? 'stretch' : 'flex-end',
            }}>
              <a href={M.cta.buttonHref} style={{
                padding: '14px 22px', background: ink, color: paper,
                border: `1px solid ${ink}`, fontSize: 12,
                fontFamily: '"JetBrains Mono", monospace', textTransform: 'uppercase',
                letterSpacing: 1.5, fontWeight: 600, textDecoration: 'none',
                textAlign: 'center',
              }}>[ {M.hero.cta} → ]</a>
              <a href="https://anotherfashion.agency/our-portfolio" style={{
                padding: '12px 22px', color: ink, border: `1px solid ${line}`,
                fontSize: 11, fontFamily: '"JetBrains Mono", monospace',
                textTransform: 'uppercase', letterSpacing: 1.5, textDecoration: 'none',
                textAlign: 'center',
              }}>[ {M.hero.secondary} ]</a>
            </div>
          </div>

          <div style={{
            marginTop: isMobile ? 28 : 40,
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            border: `1px solid ${line}`,
          }}>
            {M.hero.meta.map((m, i) => (
              <div key={i} style={{
                padding: isMobile ? 16 : 22,
                borderRight: !isMobile && i < 3 ? `1px solid ${line}` :
                             (isMobile && i % 2 === 0 ? `1px solid ${line}` : 'none'),
                borderBottom: isMobile && i < 2 ? `1px solid ${line}` : 'none',
              }}>
                <div style={{ ...monoLabel, fontSize: 10 }}>{m.k}</div>
                <div style={{
                  ...display, fontSize: isMobile ? 14 : 16,
                  textTransform: 'uppercase', letterSpacing: '-0.01em',
                  marginTop: 10, lineHeight: 1.15,
                }}>{m.v}</div>
              </div>
            ))}
          </div>
        </section>

        {/* MARQUEE */}
        <section style={{
          borderTop: `1px solid ${line}`, borderBottom: `1px solid ${line}`,
          padding: '14px 0', overflow: 'hidden', background: deep,
        }}>
          <div style={{
            display: 'flex', gap: 56, whiteSpace: 'nowrap',
            ...monoLabel, color: ink, fontSize: isMobile ? 11 : 13,
            animation: 'mmarq 40s linear infinite',
          }}>
            {Array.from({ length: 4 }).flatMap((_, k) =>
              M.marquee.map((t, i) => <span key={`${k}-${i}`}>{t}</span>)
            )}
          </div>
          <style>{`@keyframes mmarq { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
        </section>

        {/* 01 ПЛАНИРОВАНИЕ — бюджет */}
        <ModuleSection
          n={M.blocks[0].n} title={M.blocks[0].title}
          items={M.blocks[0].items}
          Viz={VizBudget}
          reverse={false}
        />

        {/* 02 РЕАЛИЗАЦИЯ — воронка */}
        <ModuleSection
          n={M.blocks[1].n} title={M.blocks[1].title}
          items={M.blocks[1].items}
          Viz={VizFunnel}
          reverse={true}
        />

        {/* 03 ОТЧЁТНОСТЬ — таблица plan/fact */}
        <ModuleSection
          n={M.blocks[2].n} title={M.blocks[2].title}
          items={M.blocks[2].items}
          Viz={VizReport}
          reverse={false}
        />

        {/* 04 ПРОГНОЗ — табличка по месяцам */}
        <ModuleSection
          n={M.blocks[3].n} title={M.blocks[3].title}
          items={M.blocks[3].items}
          Viz={VizForecast}
          reverse={true}
        />

        {/* Портфолио-якорь */}
        <section style={{
          background: '#ffffff', color: '#0a0a0a',
          padding: `${isMobile ? 48 : 80}px 0`,
          borderTop: `1px solid ${line}`,
        }}>
          <div style={wrap}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr auto',
              gap: isMobile ? 20 : 32, alignItems: 'end',
            }}>
              <div>
                <div style={{
                  ...monoLabel, color: '#666',
                  fontSize: isMobile ? 10 : 11, marginBottom: 14,
                }}>{`// portfolio`}</div>
                <h2 style={{
                  ...display, color: '#0a0a0a',
                  fontSize: isMobile ? 'clamp(40px, 11vw, 64px)' : 'clamp(72px, 8vw, 144px)',
                  letterSpacing: '-0.04em', lineHeight: 0.92, margin: 0,
                  textTransform: 'uppercase',
                }}>Проекты</h2>
              </div>
              <a href="https://anotherfashion.agency/our-portfolio" style={{
                padding: '14px 22px', background: '#0a0a0a', color: '#fafafa',
                fontSize: 12, fontFamily: '"JetBrains Mono", monospace',
                textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600,
                textDecoration: 'none', justifySelf: isMobile ? 'stretch' : 'end',
                textAlign: 'center',
              }}>[ смотреть портфолио → ]</a>
            </div>

            <p style={{
              marginTop: isMobile ? 20 : 32, maxWidth: 720,
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: isMobile ? 13 : 14, color: '#555', lineHeight: 1.55,
            }}>
              22 fashion- и beauty-бренда в активной работе. От streetwear-стартапов
              до сетей с оборотом 500M+ ₽. Кейсы по перформансу, бренд-маркетингу
              и автоматизации отчётности — в разделе портфолио.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" style={{
          background: ink, color: paper,
          padding: `${isMobile ? 72 : 120}px 0`,
        }}>
          <div style={wrap}>
            <div style={{
              ...monoLabel, color: '#666',
              fontSize: isMobile ? 10 : 11, marginBottom: isMobile ? 14 : 24,
              letterSpacing: 2,
            }}>{M.cta.eyebrow}</div>

            <h2 style={{
              ...display, color: paper,
              fontSize: isMobile ? 'clamp(40px, 12vw, 72px)' : 'clamp(64px, 8vw, 128px)',
              lineHeight: 0.9, letterSpacing: '-0.05em', margin: 0,
              textTransform: 'lowercase',
            }}>{M.cta.title}</h2>

            <p style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: isMobile ? 13 : 14,
              color: '#888', maxWidth: 600, marginTop: isMobile ? 20 : 32, lineHeight: 1.55,
            }}>{M.cta.body}</p>

            <div style={{
              marginTop: isMobile ? 28 : 40,
              display: 'flex', gap: 14, flexWrap: 'wrap',
            }}>
              <a href={M.cta.buttonHref} style={{
                padding: '16px 28px', background: paper, color: ink,
                fontSize: 12, fontFamily: '"JetBrains Mono", monospace',
                textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600,
                textDecoration: 'none', border: `1px solid ${paper}`,
              }}>[ {M.cta.buttonLabel} → ]</a>
              <a href="/audit.html" style={{
                padding: '16px 28px', color: paper,
                fontSize: 12, fontFamily: '"JetBrains Mono", monospace',
                textTransform: 'uppercase', letterSpacing: 1.5,
                textDecoration: 'none', border: `1px solid #333`,
              }}>[ или начать с аудита ]</a>
            </div>
          </div>
        </section>
      </div>

      <window.SiteFooter email="sale@anotherfashion.agency" year={2026} />
    </React.Fragment>
  );
};

window.MarketingPage = MarketingPage;