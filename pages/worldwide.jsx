// Worldwide — страница услуги «Вывод на зарубежные рынки».
// Стилистика: брутализм в духе главной и аудита.
// Контент — в worldwide-data.js (window.WORLDWIDE).

const useWorldwideViewport = () => {
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

const WorldwidePage = () => {
  const W = window.WORLDWIDE;

  const ink   = 'var(--v2-ink, #fafafa)';
  const paper = 'var(--v2-paper, #0a0a0a)';
  const muted = 'var(--v2-muted, #707070)';
  const line  = 'var(--v2-line, #1f1f1f)';
  const deep  = '#050505';

  const { isMobile, isTablet } = useWorldwideViewport();
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

  // Колонок в сетке блоков: 1 / 2 / 3
  const cols = isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)');

  return (
    <React.Fragment>
      <window.SiteHeader active="services" />

      <div data-screen-label="Worldwide" style={{
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
              {`>>> ${W.hero.eyebrow}`}
            </span>
            <span style={{ ...monoLabel, fontSize: isMobile ? 10 : 11 }}>
              · {W.hero.kicker}
            </span>
          </div>

          <h1 style={{
            ...display,
            fontSize: isMobile ? 'clamp(34px, 9vw, 56px)' : 'clamp(64px, 8vw, 144px)',
            lineHeight: 0.92,
            letterSpacing: '-0.05em', margin: 0, color: ink,
            textTransform: 'lowercase',
            overflowWrap: 'anywhere',
          }}>
            {W.hero.title}
          </h1>

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
              {W.hero.body}
              <span style={{ display: 'block', marginTop: 14, color: muted }}>{W.hero.body2}</span>
            </p>
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 10,
              alignItems: isMobile ? 'stretch' : 'flex-end',
            }}>
              <a href={W.cta.buttonHref} style={{
                padding: '14px 22px', background: ink, color: paper,
                border: `1px solid ${ink}`, fontSize: 12,
                fontFamily: '"JetBrains Mono", monospace', textTransform: 'uppercase',
                letterSpacing: 1.5, fontWeight: 600, textDecoration: 'none',
                textAlign: 'center',
              }}>[ {W.hero.cta} → ]</a>
              <a href="https://anotherfashion.agency/our-portfolio" style={{
                padding: '12px 22px', color: ink, border: `1px solid ${line}`,
                fontSize: 11, fontFamily: '"JetBrains Mono", monospace',
                textTransform: 'uppercase', letterSpacing: 1.5, textDecoration: 'none',
                textAlign: 'center',
              }}>[ {W.hero.secondary} ]</a>
            </div>
          </div>

          {/* meta strip */}
          <div style={{
            marginTop: isMobile ? 28 : 40,
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            border: `1px solid ${line}`,
          }}>
            {W.hero.meta.map((m, i) => (
              <div key={i} style={{
                padding: isMobile ? 16 : 22,
                borderRight: !isMobile && i < 3 ? `1px solid ${line}` : (isMobile && i % 2 === 0 ? `1px solid ${line}` : 'none'),
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
            animation: 'wwmarq 40s linear infinite',
          }}>
            {Array.from({ length: 4 }).flatMap((_, k) => [
              <span key={`a${k}`}>USA · NEW YORK · LOS ANGELES</span>,
              <span key={`b${k}`}>EU · PARIS · MILAN · BERLIN</span>,
              <span key={`c${k}`}>MIDDLE EAST · DUBAI · RIYADH</span>,
              <span key={`d${k}`}>APAC · TOKYO · SHANGHAI · SEOUL</span>,
              <span key={`e${k}`}>D2C · MARKETPLACES · SOCIAL</span>,
            ])}
          </div>
          <style>{`@keyframes wwmarq { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
        </section>

        {/* СЕРВИСНЫЕ БЛОКИ */}
        <section style={{ padding: `${sectionPadY}px 0`, borderTop: `1px solid ${line}` }}>
          <div style={wrap}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '120px 1fr',
              gap: isMobile ? 16 : 32,
              marginBottom: isMobile ? 32 : 56, alignItems: 'start',
            }}>
              <div style={monoLabel}>[01] что внутри</div>
              <h2 style={{
                ...display, color: ink,
                fontSize: isMobile ? 'clamp(34px, 9vw, 48px)' : 'clamp(48px, 7vw, 112px)',
                lineHeight: 0.94, letterSpacing: '-0.04em', margin: 0,
                textTransform: 'uppercase', overflowWrap: 'anywhere',
              }}>12 модулей<br/>под ключ.</h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: cols,
              gap: 0,
              border: `1px solid ${line}`,
            }}>
              {W.blocks.map((b, i) => {
                // Сетка: 3 col на десктопе, 2 на планшете, 1 на мобиле
                const perRow = isMobile ? 1 : (isTablet ? 2 : 3);
                const inLastCol  = ((i + 1) % perRow) === 0;
                const inLastRow  = i >= W.blocks.length - (W.blocks.length % perRow || perRow);
                return (
                  <div key={i} style={{
                    padding: isMobile ? 22 : 28, background: paper,
                    borderRight: inLastCol ? 'none' : `1px solid ${line}`,
                    borderBottom: inLastRow ? 'none' : `1px solid ${line}`,
                    display: 'flex', flexDirection: 'column',
                  }}>
                    <div style={{
                      display: 'flex', alignItems: 'baseline', gap: 12,
                      marginBottom: isMobile ? 14 : 20,
                    }}>
                      <span style={{ ...monoLabel, fontSize: 10, color: muted }}>[{b.n}]</span>
                      <h3 style={{
                        ...display, fontSize: isMobile ? 20 : 24,
                        letterSpacing: '-0.02em', textTransform: 'uppercase',
                        margin: 0, color: ink, lineHeight: 1.1,
                      }}>{b.title}</h3>
                    </div>
                    <ul style={{
                      listStyle: 'none', padding: 0, margin: 0,
                      display: 'grid', gap: 10,
                    }}>
                      {b.items.map((it, j) => (
                        <li key={j} style={{
                          ...monoBody,
                          color: muted, fontSize: isMobile ? 12 : 13,
                          display: 'grid', gridTemplateColumns: '14px 1fr', gap: 8,
                          alignItems: 'baseline',
                        }}>
                          <span style={{ color: ink }}>→</span>
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
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
            }}>{W.cta.eyebrow}</div>

            <h2 style={{
              ...display, color: paper,
              fontSize: isMobile ? 'clamp(40px, 12vw, 72px)' : 'clamp(64px, 8vw, 128px)',
              lineHeight: 0.9, letterSpacing: '-0.05em', margin: 0,
              textTransform: 'lowercase',
            }}>{W.cta.title}</h2>

            <p style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: isMobile ? 13 : 14,
              color: '#888', maxWidth: 540, marginTop: isMobile ? 20 : 32, lineHeight: 1.55,
            }}>{W.cta.body}</p>

            <div style={{
              marginTop: isMobile ? 28 : 40,
              display: 'flex', gap: 14, flexWrap: 'wrap',
            }}>
              <a href={W.cta.buttonHref} style={{
                padding: '16px 28px', background: paper, color: ink,
                fontSize: 12, fontFamily: '"JetBrains Mono", monospace',
                textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600,
                textDecoration: 'none', border: `1px solid ${paper}`,
              }}>[ {W.cta.buttonLabel} → ]</a>
              <a href="/audit" style={{
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

window.WorldwidePage = WorldwidePage;