// HR — страница услуги «Построение команды».
// Hero → две орг-структуры (старт vs. зрелость) + переход → 6 модулей → CTA.

const useHrrViewport = () => {
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

const HrrPage = () => {
  const H = window.HRR;

  const ink   = 'var(--v2-ink, #fafafa)';
  const paper = 'var(--v2-paper, #0a0a0a)';
  const muted = 'var(--v2-muted, #707070)';
  const line  = 'var(--v2-line, #1f1f1f)';
  const deep  = '#050505';

  const { isMobile, isTablet } = useHrrViewport();
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

  // ──────── SVG-примитив: бокс с заголовком и подписью ────────
  const Node = ({ x, y, w, h, title, sub, accent }) => (
    <g>
      <rect x={x} y={y} width={w} height={h}
            fill={accent ? '#fafafa' : 'transparent'}
            stroke={accent ? '#fafafa' : '#fafafa'} strokeWidth="1"/>
      <text x={x + w / 2} y={y + (sub ? h * 0.45 : h * 0.6)} textAnchor="middle"
            fontFamily='"Archivo Black","Helvetica Neue",sans-serif' fontWeight="900"
            fontSize={w > 180 ? 16 : 13}
            fill={accent ? '#0a0a0a' : '#fafafa'}
            letterSpacing="0.5">
        {title}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h * 0.75} textAnchor="middle"
              fontFamily='"JetBrains Mono",monospace' fontSize="9"
              fill={accent ? '#444' : '#888'} letterSpacing="0.5">
          {sub}
        </text>
      )}
    </g>
  );

  // ──────── SMALL ORG ────────
  const SmallOrg = () => {
    const stroke = '#fafafa';
    const cx = [80, 245, 410, 575]; // centers of 4 children
    return (
      <svg viewBox="0 0 660 320" xmlns="http://www.w3.org/2000/svg"
           style={{ width: '100%', height: 'auto', display: 'block' }}>
        {/* основатель */}
        <Node x={210} y={20} w={240} h={70}
              title="ОСНОВАТЕЛЬ" sub="стратегия + всё остальное" accent />
        <line x1="330" y1="90" x2="330" y2="150" stroke={stroke} strokeWidth="1"/>
        <line x1={cx[0]} y1="150" x2={cx[cx.length - 1]} y2="150" stroke={stroke} strokeWidth="1"/>
        {cx.map(x => <line key={x} x1={x} y1="150" x2={x} y2="200" stroke={stroke} strokeWidth="1"/>)}
        {/* функции */}
        <Node x={cx[0] - 70} y={200} w={140} h={62}
              title="МАРКЕТИНГ" sub="1 человек" />
        <Node x={cx[1] - 70} y={200} w={140} h={62}
              title="ОПЕРАЦИОНКА" sub="склад · доставка" />
        <Node x={cx[2] - 70} y={200} w={140} h={62}
              title="ПРОДУКТ" sub="дизайн · конструктор" />
        <Node x={cx[3] - 70} y={200} w={140} h={62}
              title="ФИНАНСЫ" sub="на основателе" />
        <text x="330" y="298" textAnchor="middle"
              fontFamily='"JetBrains Mono",monospace' fontSize="10"
              fill="#888" letterSpacing="0.8">
          один человек тянет несколько функций сразу
        </text>
      </svg>
    );
  };

  // ──────── LARGE ORG ────────
  const LargeOrg = () => {
    const stroke = '#fafafa';
    const cx = [120, 350, 580, 810, 1040]; // центры 5 карточек директоров
    const cLevels = [
      { key: 'cmo', t: 'ДИР. МАРКЕТИНГА',  s: 'бренд · перф · CRM' },
      { key: 'coo', t: 'ОПЕРАЦИОННЫЙ ДИР.', s: 'опер · снабжение · сервис' },
      { key: 'cfo', t: 'ФИНАНСОВЫЙ ДИР.',   s: 'финансы · инвестиции' },
      { key: 'cpo', t: 'ДИР. ПО ПРОДУКТУ',  s: 'продукт · дизайн' },
      { key: 'cto', t: 'ТЕХНИЧЕСКИЙ ДИР.',  s: 'веб · данные · IT' },
    ];
    const teams = {
      cmo: ['Бренд', 'Перформанс', 'Контент', 'CRM', 'PR'],
      coo: ['Логистика', 'Закупки', 'Поддержка', 'Розница'],
      cfo: ['Бухгалтерия', 'Финплан'],
      cpo: ['Дизайн', 'Конструктор', 'Производство', 'Материалы'],
      cto: ['Е-ком', 'Аналитика', 'IT'],
    };
    return (
      <svg viewBox="0 0 1160 660" xmlns="http://www.w3.org/2000/svg"
           style={{ width: '100%', height: 'auto', display: 'block' }}>
        {/* основатель */}
        <Node x={450} y={20} w={260} h={70}
              title="ОСНОВАТЕЛЬ" sub="видение · инвестиции · совет" accent />

        <line x1="580" y1="90" x2="580" y2="150" stroke={stroke} strokeWidth="1"/>
        <line x1={cx[0]} y1="150" x2={cx[cx.length - 1]} y2="150" stroke={stroke} strokeWidth="1"/>
        {cx.map(x => <line key={x} x1={x} y1="150" x2={x} y2="190" stroke={stroke} strokeWidth="1"/>)}

        {/* «новый слой» маркер */}
        <g>
          <line x1="40" y1="225" x2="80" y2="225" stroke="#fafafa" strokeWidth="1"/>
          <text x="44" y="218" fontFamily='"JetBrains Mono",monospace' fontSize="9"
                fill="#fafafa" letterSpacing="1.5">
            НОВЫЙ СЛОЙ ↓
          </text>
        </g>

        {/* директорские карточки */}
        {cLevels.map((c, i) => {
          const x = cx[i] - 100; const y = 190; const w = 200; const h = 76;
          return (
            <g key={c.key}>
              {/* подсветка нового слоя */}
              <rect x={x - 4} y={y - 4} width={w + 8} height={h + 8}
                    fill="none" stroke="#fafafa" strokeWidth="1" strokeDasharray="3 4"/>
              <rect x={x} y={y} width={w} height={h}
                    fill="#fafafa" stroke="#fafafa" strokeWidth="1"/>
              <text x={x + w / 2} y={y + 32} textAnchor="middle"
                    fontFamily='"Archivo Black","Helvetica Neue",sans-serif' fontWeight="900"
                    fontSize="13" fill="#0a0a0a" letterSpacing="0.5">
                {c.t}
              </text>
              <text x={x + w / 2} y={y + 55} textAnchor="middle"
                    fontFamily='"JetBrains Mono",monospace' fontSize="9"
                    fill="#555" letterSpacing="0.5">
                {c.s}
              </text>
            </g>
          );
        })}

        {/* пунктирные линии вниз к командам */}
        {cx.map(x => <line key={x} x1={x} y1="266" x2={x} y2="306" stroke={stroke} strokeWidth="1" strokeDasharray="2 3"/>)}

        {/* стеки команд под каждым директором */}
        {cLevels.map((c, i) => {
          const x = cx[i] - 95;
          const list = teams[c.key];
          return (
            <g key={c.key + '-team'}>
              {list.map((t, j) => {
                const ry = 306 + j * 44;
                return (
                  <g key={t}>
                    <rect x={x} y={ry} width="190" height="36"
                          fill="transparent" stroke="#3a3a3a" strokeWidth="1"/>
                    <text x={x + 12} y={ry + 22}
                          fontFamily='"Archivo Black",sans-serif' fontWeight="700"
                          fontSize="11" fill="#fafafa" letterSpacing="0.8">
                      {t.toUpperCase()}
                    </text>
                    <text x={x + 178} y={ry + 22} textAnchor="end"
                          fontFamily='"JetBrains Mono",monospace' fontSize="9"
                          fill="#777">отдел</text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    );
  };

  // ──────── общий блок «диаграмма + подпись» ────────
  const OrgCard = ({ kicker, title, sub, note, children }) => (
    <div style={{ border: `1px solid ${line}`, padding: isMobile ? 16 : 24, background: paper }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        gap: 12, flexWrap: 'wrap',
        marginBottom: isMobile ? 14 : 20, paddingBottom: isMobile ? 12 : 16,
        borderBottom: `1px solid ${line}`,
      }}>
        <div>
          <div style={{ ...monoLabel, fontSize: 10 }}>{kicker}</div>
          <div style={{
            ...display, fontSize: isMobile ? 20 : 24,
            letterSpacing: '-0.02em', textTransform: 'uppercase',
            color: ink, marginTop: 6,
          }}>{title}</div>
        </div>
        <div style={{ ...monoLabel, fontSize: 10, color: muted, textTransform: 'none', letterSpacing: 0.4, textAlign: 'right', maxWidth: 220 }}>
          {sub}
        </div>
      </div>
      {children}
      {note && (
        <div style={{
          marginTop: isMobile ? 14 : 18,
          padding: '8px 12px', border: `1px dashed ${line}`,
          ...monoLabel, fontSize: 10, color: muted, textTransform: 'none', letterSpacing: 0.4,
        }}>
          {note}
        </div>
      )}
    </div>
  );

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

  return (
    <React.Fragment>
      <window.SiteHeader active="services" />

      <div data-screen-label="HR" style={{
        width: '100%', maxWidth: 1600, margin: '0 auto',
        background: paper, color: ink,
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        overflowX: 'hidden',
      }}>

        {/* HERO */}
        <section style={{ ...wrap, padding: `${isMobile ? 40 : 64}px ${pad}px ${isMobile ? 40 : 56}px` }}>
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
              {`>>> ${H.hero.eyebrow}`}
            </span>
            <span style={{ ...monoLabel, fontSize: isMobile ? 10 : 11 }}>
              · {H.hero.kicker}
            </span>
          </div>

          <h1 style={{
            ...display,
            fontSize: isMobile ? 'clamp(34px, 9vw, 56px)' : 'clamp(64px, 8vw, 144px)',
            lineHeight: 0.92, letterSpacing: '-0.05em', margin: 0, color: ink,
            textTransform: 'lowercase', overflowWrap: 'anywhere',
          }}>{H.hero.title}</h1>

          <div style={{
            marginTop: isMobile ? 32 : 48,
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
            gap: isMobile ? 24 : 32,
            borderTop: `1px solid ${line}`, paddingTop: isMobile ? 24 : 32, alignItems: 'start',
          }}>
            <p style={{
              ...monoBody, margin: 0,
              gridColumn: isMobile ? 'auto' : 'span 2', maxWidth: 640,
            }}>
              {H.hero.body}
              <span style={{ display: 'block', marginTop: 14, color: muted }}>{H.hero.body2}</span>
            </p>
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 10,
              alignItems: isMobile ? 'stretch' : 'flex-end',
            }}>
              <a href={H.cta.buttonHref} style={{
                padding: '14px 22px', background: ink, color: paper,
                border: `1px solid ${ink}`, fontSize: 12,
                fontFamily: '"JetBrains Mono", monospace', textTransform: 'uppercase',
                letterSpacing: 1.5, fontWeight: 600, textDecoration: 'none', textAlign: 'center',
              }}>[ {H.hero.cta} → ]</a>
              <a href="https://anotherfashion.agency/our-portfolio" style={{
                padding: '12px 22px', color: ink, border: `1px solid ${line}`,
                fontSize: 11, fontFamily: '"JetBrains Mono", monospace',
                textTransform: 'uppercase', letterSpacing: 1.5, textDecoration: 'none', textAlign: 'center',
              }}>[ {H.hero.secondary} ]</a>
            </div>
          </div>

          <div style={{
            marginTop: isMobile ? 28 : 40,
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            border: `1px solid ${line}`,
          }}>
            {H.hero.meta.map((m, i) => (
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

        {/* ОРГ-СТРУКТУРЫ */}
        <section style={{ borderTop: `1px solid ${line}`, padding: `${sectionPadY}px 0`, background: deep }}>
          <div style={wrap}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '120px 1fr',
              gap: isMobile ? 16 : 32,
              marginBottom: isMobile ? 28 : 48, alignItems: 'baseline',
            }}>
              <div style={monoLabel}>[ org · before / after ]</div>
              <h2 style={{
                ...display, color: ink,
                fontSize: isMobile ? 'clamp(28px, 8vw, 40px)' : 'clamp(40px, 5vw, 72px)',
                lineHeight: 0.95, letterSpacing: '-0.03em', margin: 0,
                textTransform: 'lowercase',
              }}>как меняется структура при росте.</h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: isMobile ? 28 : 36,
            }}>
              {/* SMALL */}
              <OrgCard
                kicker="[ старт · 5–8 человек ]"
                title={H.orgSmall.title}
                sub={H.orgSmall.sub}
                note={H.orgSmall.note}
              >
                <SmallOrg />
              </OrgCard>

              {/* TRANSITION */}
              <div style={{
                padding: isMobile ? '20px 16px' : '28px 24px',
                border: `1px solid ${line}`,
                background: paper,
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'auto 1fr auto',
                gap: isMobile ? 14 : 24, alignItems: 'center',
              }}>
                <div style={{ ...monoLabel, fontSize: 11, color: ink, letterSpacing: 2 }}>
                  +1 LAYER
                </div>
                <div style={{ ...monoBody, fontSize: isMobile ? 12 : 13, color: muted }}>
                  ≈25+ человек — founder перестаёт держать в голове все процессы.
                  Между ним и руками появляется <span style={{ color: ink }}>C-level</span> —
                  CMO · COO · CFO · CPO · CTO. Каждый отвечает за свой департамент с командой и KPI.
                </div>
                <div style={{
                  ...display, fontSize: isMobile ? 28 : 40, letterSpacing: '-0.02em',
                  color: ink, textTransform: 'uppercase',
                }}>↓</div>
              </div>

              {/* LARGE */}
              <OrgCard
                kicker="[ зрелость · 25–80 человек ]"
                title={H.orgLarge.title}
                sub={H.orgLarge.sub}
                note={H.orgLarge.note}
              >
                <div style={{ overflowX: 'auto' }}>
                  <LargeOrg />
                </div>
              </OrgCard>
            </div>

            <div style={{
              marginTop: isMobile ? 20 : 32,
              padding: isMobile ? '10px 14px' : '12px 18px',
              border: `1px dashed ${line}`,
              ...monoLabel, fontSize: 10, color: muted, textTransform: 'none', letterSpacing: 0.4,
            }}>
              структура — пример. Реальная сборка зависит от продукта, географии и темпа роста. Иногда CTO и CPO сливаются в одну роль; иногда CFO остаётся аутсорсом до 50+ человек.
            </div>
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
            animation: 'hrrmarq 40s linear infinite',
          }}>
            {Array.from({ length: 4 }).flatMap((_, k) =>
              H.marquee.map((t, i) => <span key={`${k}-${i}`}>{t}</span>)
            )}
          </div>
          <style>{`@keyframes hrrmarq { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
        </section>

        {/* МОДУЛИ */}
        <section style={{ padding: `${sectionPadY}px 0`, borderTop: `1px solid ${line}` }}>
          <div style={wrap}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '120px 1fr',
              gap: isMobile ? 16 : 32,
              marginBottom: isMobile ? 28 : 48, alignItems: 'start',
            }}>
              <div style={monoLabel}>[01] что делаем</div>
              <h2 style={{
                ...display, color: ink,
                fontSize: isMobile ? 'clamp(34px, 9vw, 48px)' : 'clamp(48px, 7vw, 112px)',
                lineHeight: 0.94, letterSpacing: '-0.04em', margin: 0,
                textTransform: 'uppercase', overflowWrap: 'anywhere',
              }}>6 модулей.<br/>одна команда.</h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'),
              gap: 0, border: `1px solid ${line}`,
            }}>
              {H.blocks.map((b, i) => {
                const perRow = isMobile ? 1 : (isTablet ? 2 : 3);
                const inLastCol = ((i + 1) % perRow) === 0;
                const inLastRow = i >= H.blocks.length - (H.blocks.length % perRow || perRow);
                return (
                  <div key={i} style={{
                    padding: isMobile ? 24 : 30, background: paper,
                    borderRight: inLastCol ? 'none' : `1px solid ${line}`,
                    borderBottom: inLastRow ? 'none' : `1px solid ${line}`,
                    display: 'flex', flexDirection: 'column',
                  }}>
                    <div style={{
                      display: 'flex', alignItems: 'baseline', gap: 14,
                      marginBottom: isMobile ? 18 : 22,
                    }}>
                      <span style={{ ...monoLabel, fontSize: 10, color: muted }}>[{b.n}]</span>
                      <h3 style={{
                        ...display, fontSize: isMobile ? 22 : 26,
                        letterSpacing: '-0.02em', textTransform: 'uppercase',
                        margin: 0, color: ink, lineHeight: 1.1,
                      }}>{b.title}</h3>
                    </div>
                    <BulletList items={b.items} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" style={{
          background: ink, color: paper, padding: `${isMobile ? 72 : 120}px 0`,
        }}>
          <div style={wrap}>
            <div style={{
              ...monoLabel, color: '#666',
              fontSize: isMobile ? 10 : 11, marginBottom: isMobile ? 14 : 24,
              letterSpacing: 2,
            }}>{H.cta.eyebrow}</div>

            <h2 style={{
              ...display, color: paper,
              fontSize: isMobile ? 'clamp(40px, 12vw, 72px)' : 'clamp(64px, 8vw, 128px)',
              lineHeight: 0.9, letterSpacing: '-0.05em', margin: 0,
              textTransform: 'lowercase',
            }}>{H.cta.title}</h2>

            <p style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: isMobile ? 13 : 14,
              color: '#888', maxWidth: 600, marginTop: isMobile ? 20 : 32, lineHeight: 1.55,
            }}>{H.cta.body}</p>

            <div style={{
              marginTop: isMobile ? 28 : 40,
              display: 'flex', gap: 14, flexWrap: 'wrap',
            }}>
              <a href={H.cta.buttonHref} style={{
                padding: '16px 28px', background: paper, color: ink,
                fontSize: 12, fontFamily: '"JetBrains Mono", monospace',
                textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600,
                textDecoration: 'none', border: `1px solid ${paper}`,
              }}>[ {H.cta.buttonLabel} → ]</a>
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

window.HrrPage = HrrPage;