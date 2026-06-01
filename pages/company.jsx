// Company — страница «О нас».
// Hero (как на главной) → цифры → D2C-преимущества → 6 направлений →
// основатель + проекты-логотипы (компактно) → клиенты (как на главной, белая панель) → CTA

const useCompanyViewport = () => {
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

const CompanyPage = () => {
  const X = window.COMPANY;

  const ink   = 'var(--v2-ink, #fafafa)';
  const paper = 'var(--v2-paper, #0a0a0a)';
  const muted = 'var(--v2-muted, #707070)';
  const line  = 'var(--v2-line, #1f1f1f)';
  const deep  = '#050505';

  const { isMobile, isTablet } = useCompanyViewport();
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

  return (
    <React.Fragment>
      <window.SiteHeader active="about" />

      <div data-screen-label="Company" style={{
        width: '100%', maxWidth: 1600, margin: '0 auto',
        background: paper, color: ink,
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        overflowX: 'hidden',
      }}>

        {/* HERO — типографика как на главной */}
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
              О НАС
            </span>
            <span style={{ ...monoLabel, color: ink, fontSize: isMobile ? 10 : 11 }}>
              {`>>> ${X.hero.eyebrow}`}
            </span>
            <span style={{ ...monoLabel, fontSize: isMobile ? 10 : 11 }}>
              · {X.hero.kicker}
            </span>
          </div>

          <h1 style={{
            ...display,
            fontSize: isMobile ? 'clamp(56px, 18vw, 96px)' : 'clamp(96px, 12.5vw, 200px)',
            lineHeight: 0.88,
            letterSpacing: '-0.05em', margin: 0, color: ink,
            textTransform: 'lowercase', overflowWrap: 'anywhere',
          }}>another<br/>fashion.</h1>

          <div style={{
            marginTop: isMobile ? 32 : 48,
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
            gap: isMobile ? 24 : 32,
            borderTop: `1px solid ${line}`, paddingTop: isMobile ? 24 : 32, alignItems: 'start',
          }}>
            <p style={{
              ...monoBody, margin: 0,
              gridColumn: isMobile ? 'auto' : 'span 2', maxWidth: 720,
            }}>
              {X.hero.body}
              <span style={{ display: 'block', marginTop: 14, color: muted }}>{X.hero.body2}</span>
            </p>
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 10,
              alignItems: isMobile ? 'stretch' : 'flex-end',
            }}>
              <a href={X.cta.buttonHref} style={{
                padding: '14px 22px', background: ink, color: paper,
                border: `1px solid ${ink}`, fontSize: 12,
                fontFamily: '"JetBrains Mono", monospace', textTransform: 'uppercase',
                letterSpacing: 1.5, fontWeight: 600, textDecoration: 'none', textAlign: 'center',
              }}>[ {X.hero.cta} → ]</a>
              <a href="https://anotherfashion.agency/our-portfolio" style={{
                padding: '12px 22px', color: ink, border: `1px solid ${line}`,
                fontSize: 11, fontFamily: '"JetBrains Mono", monospace',
                textTransform: 'uppercase', letterSpacing: 1.5, textDecoration: 'none', textAlign: 'center',
              }}>[ {X.hero.secondary} ]</a>
            </div>
          </div>

          {/* Цифры */}
          <div style={{
            marginTop: isMobile ? 32 : 48,
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            border: `1px solid ${line}`,
          }}>
            {X.stats.map((s, i) => (
              <div key={i} style={{
                padding: isMobile ? 18 : 28,
                borderRight: !isMobile && i < 3 ? `1px solid ${line}` :
                             (isMobile && i % 2 === 0 ? `1px solid ${line}` : 'none'),
                borderBottom: isMobile && i < 2 ? `1px solid ${line}` : 'none',
                display: 'flex', flexDirection: 'column', gap: 10,
              }}>
                <div style={{
                  ...display, fontSize: isMobile ? 'clamp(22px, 7vw, 32px)' : 'clamp(28px, 3vw, 44px)',
                  letterSpacing: '-0.03em', lineHeight: 0.95,
                  color: ink, textTransform: 'uppercase',
                }}>{s.n}</div>
                <div style={{ ...monoLabel, fontSize: 10, color: ink, letterSpacing: 1.5 }}>{s.l}</div>
                <div style={{ ...monoLabel, fontSize: 9, color: muted, textTransform: 'none', letterSpacing: 0.4 }}>
                  {s.sub}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* D2C — главная фишка позиционирования */}
        <section style={{ borderTop: `1px solid ${line}`, padding: `${sectionPadY}px 0`, background: deep }}>
          <div style={wrap}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '120px 1fr',
              gap: isMobile ? 16 : 32,
              marginBottom: isMobile ? 28 : 40, alignItems: 'baseline',
            }}>
              <div style={monoLabel}>[ {X.d2c.label} ]</div>
              <div>
                <h2 style={{
                  ...display, color: ink,
                  fontSize: isMobile ? 'clamp(40px, 12vw, 72px)' : 'clamp(64px, 8vw, 128px)',
                  lineHeight: 0.92, letterSpacing: '-0.04em', margin: 0,
                  textTransform: 'lowercase',
                }}>{X.d2c.title}</h2>
                <p style={{ ...monoBody, color: muted, fontSize: isMobile ? 13 : 14, maxWidth: 720, marginTop: 18 }}>
                  {X.d2c.body}
                </p>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
              gap: 0, border: `1px solid ${line}`, background: paper,
            }}>
              {X.d2c.items.map((it, i) => (
                <div key={i} style={{
                  padding: isMobile ? 22 : 26,
                  borderRight: !isMobile && i < 3 ? `1px solid ${line}` : 'none',
                  borderBottom: isMobile && i < X.d2c.items.length - 1 ? `1px solid ${line}` : 'none',
                }}>
                  <div style={{ ...monoLabel, fontSize: 10, color: muted, marginBottom: 12 }}>[{it.n}]</div>
                  <h3 style={{
                    ...display, fontSize: isMobile ? 18 : 20,
                    letterSpacing: '-0.02em', textTransform: 'uppercase',
                    margin: '0 0 10px', color: ink, lineHeight: 1.1,
                  }}>{it.t}</h3>
                  <p style={{ ...monoBody, color: muted, fontSize: isMobile ? 12 : 13, margin: 0 }}>
                    {it.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6 НАПРАВЛЕНИЙ */}
        <section style={{ borderTop: `1px solid ${line}`, padding: `${sectionPadY}px 0` }}>
          <div style={wrap}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '120px 1fr',
              gap: isMobile ? 16 : 32,
              marginBottom: isMobile ? 28 : 48, alignItems: 'start',
            }}>
              <div style={monoLabel}>[ что делаем ]</div>
              <h2 style={{
                ...display, color: ink,
                fontSize: isMobile ? 'clamp(34px, 9vw, 48px)' : 'clamp(48px, 7vw, 112px)',
                lineHeight: 0.94, letterSpacing: '-0.04em', margin: 0,
                textTransform: 'uppercase', overflowWrap: 'anywhere',
              }}>6 направлений.<br/>одна индустрия.</h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'),
              gap: 0, border: `1px solid ${line}`,
            }}>
              {X.about.map((b, i) => {
                const perRow = isMobile ? 1 : (isTablet ? 2 : 3);
                const inLastCol = ((i + 1) % perRow) === 0;
                const inLastRow = i >= X.about.length - (X.about.length % perRow || perRow);
                return (
                  <div key={i} style={{
                    padding: isMobile ? 24 : 30, background: paper,
                    borderRight: inLastCol ? 'none' : `1px solid ${line}`,
                    borderBottom: inLastRow ? 'none' : `1px solid ${line}`,
                  }}>
                    <div style={{
                      display: 'flex', alignItems: 'baseline', gap: 14,
                      marginBottom: isMobile ? 14 : 18,
                    }}>
                      <span style={{ ...monoLabel, fontSize: 10, color: muted }}>[{b.n}]</span>
                      <h3 style={{
                        ...display, fontSize: isMobile ? 20 : 22,
                        letterSpacing: '-0.02em', textTransform: 'uppercase',
                        margin: 0, color: ink, lineHeight: 1.1,
                      }}>{b.t}</h3>
                    </div>
                    <p style={{ ...monoBody, margin: 0, color: muted, fontSize: isMobile ? 12 : 13 }}>
                      {b.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ОСНОВАТЕЛЬ — компактно, проекты-логотипы */}
        <section style={{ borderTop: `1px solid ${line}`, padding: `${sectionPadY}px 0`, background: deep }}>
          <div style={wrap}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '120px 1fr',
              gap: isMobile ? 16 : 32,
              marginBottom: isMobile ? 28 : 40, alignItems: 'baseline',
            }}>
              <div style={monoLabel}>[ основатель ]</div>
              <h2 style={{
                ...display, color: ink,
                fontSize: isMobile ? 'clamp(28px, 8vw, 40px)' : 'clamp(40px, 5vw, 72px)',
                lineHeight: 0.95, letterSpacing: '-0.03em', margin: 0,
                textTransform: 'lowercase',
              }}>андрей ковалев.</h2>
            </div>

            {/* короткая био-карточка */}
            <div style={{
              border: `1px solid ${line}`, background: paper,
              padding: isMobile ? 22 : 28,
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1.6fr',
              gap: isMobile ? 18 : 36,
              marginBottom: isMobile ? 22 : 28,
            }}>
              <div>
                <div style={{ ...monoLabel, fontSize: 10, color: muted, marginBottom: 8 }}>
                  {X.founder.role}
                </div>
                <div style={{
                  ...display, fontSize: isMobile ? 22 : 26,
                  letterSpacing: '-0.02em', textTransform: 'uppercase',
                  color: ink, lineHeight: 1.05,
                }}>{X.founder.name}</div>
              </div>
              <p style={{ ...monoBody, margin: 0, color: ink, fontSize: isMobile ? 13 : 14 }}>
                {X.founder.body}
              </p>
            </div>

            {/* Проекты-логотипы — компактная сетка */}
            <div style={{ ...monoLabel, fontSize: 10, color: muted, marginBottom: 12 }}>
              [ проекты ]
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : (isTablet ? 'repeat(3, 1fr)' : 'repeat(3, 1fr)'),
              gap: 0, border: `1px solid ${line}`, background: paper,
            }}>
              {X.founder.projects.map((p, i) => {
                const perRow = isMobile ? 2 : 3;
                const inLastCol = ((i + 1) % perRow) === 0;
                const inLastRow = i >= X.founder.projects.length - (X.founder.projects.length % perRow || perRow);
                return (
                  <div key={i} style={{
                    padding: isMobile ? 16 : 20,
                    borderRight: inLastCol ? 'none' : `1px solid ${line}`,
                    borderBottom: inLastRow ? 'none' : `1px solid ${line}`,
                    minHeight: isMobile ? 110 : 132,
                    display: 'flex', flexDirection: 'column', gap: 6,
                  }}>
                    <div style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                    }}>
                      <span style={{ ...monoLabel, fontSize: 10, color: muted }}>{p.y}</span>
                      <span style={{ ...monoLabel, fontSize: 9, color: muted, textTransform: 'none', letterSpacing: 0.3 }}>
                        {p.r}
                      </span>
                    </div>
                    <div style={{
                      ...display, fontSize: isMobile ? 18 : 22,
                      letterSpacing: '-0.02em', textTransform: 'uppercase',
                      color: ink, lineHeight: 1.05, marginTop: 'auto',
                    }}>
                      {p.n}
                    </div>
                    <div style={{ ...monoLabel, fontSize: 9, color: muted, textTransform: 'none', letterSpacing: 0.3 }}>
                      {p.note}
                    </div>
                  </div>
                );
              })}
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
            animation: 'cmpmarq 40s linear infinite',
          }}>
            {Array.from({ length: 4 }).flatMap((_, k) => [
              <span key={`a${k}`}>FASHION ONLY · D2C ONLY</span>,
              <span key={`b${k}`}>0 → 5 МЛРД ₽ ОДИН БРЕНД</span>,
              <span key={`c${k}`}>12 МЛРД ₽ СОВОКУПНО · 400+ БРЕНДОВ</span>,
              <span key={`d${k}`}>2016 → ANOTHER FASHION AGENCY</span>,
            ])}
          </div>
          <style>{`@keyframes cmpmarq { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
        </section>

        {/* КЛИЕНТЫ — как на главной: чёрный баннер + белая панель, лого 4-в-ряд */}
        <section style={{ borderTop: `1px solid ${line}` }}>
          <div style={{
            background: paper, color: ink,
            padding: `${isMobile ? 36 : 56}px ${pad}px`,
            textAlign: 'center', borderBottom: `1px solid ${line}`,
          }}>
            <div style={{
              ...monoLabel, color: muted, fontSize: isMobile ? 10 : 11,
              marginBottom: isMobile ? 14 : 18,
            }}>{`// our clients`}</div>
            <h2 style={{
              ...display,
              fontSize: isMobile ? 'clamp(34px, 10vw, 56px)' : 'clamp(56px, 7vw, 112px)',
              fontWeight: 900, letterSpacing: '-0.04em', margin: 0,
              textTransform: 'uppercase', color: ink, lineHeight: 0.95,
            }}>ПОРТФОЛИО</h2>
          </div>

          <div style={{ background: '#ffffff', padding: `${isMobile ? 48 : 96}px 0` }}>
            <div style={{ ...wrap, padding: `0 ${isMobile ? 20 : 64}px` }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                columnGap: isMobile ? 8 : 12,
                rowGap: isMobile ? 16 : 24,
                alignItems: 'center', justifyItems: 'center',
              }}>
                {X.clients.map((slug, i) => (
                  <div key={i} style={{
                    width: '100%',
                    height: isMobile ? 160 : 220,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: isMobile ? '0 4px' : '0 6px',
                  }}>
                    <img
                      src={`/assets/logos/${slug}.webp`}
                      alt={slug}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                    />
                  </div>
                ))}
              </div>
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
            }}>{X.cta.eyebrow}</div>

            <h2 style={{
              ...display, color: paper,
              fontSize: isMobile ? 'clamp(40px, 12vw, 72px)' : 'clamp(64px, 8vw, 128px)',
              lineHeight: 0.9, letterSpacing: '-0.05em', margin: 0,
              textTransform: 'lowercase',
            }}>{X.cta.title}</h2>

            <p style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: isMobile ? 13 : 14,
              color: '#888', maxWidth: 600, marginTop: isMobile ? 20 : 32, lineHeight: 1.55,
            }}>{X.cta.body}</p>

            <div style={{
              marginTop: isMobile ? 28 : 40,
              display: 'flex', gap: 14, flexWrap: 'wrap',
            }}>
              <a href={X.cta.buttonHref} style={{
                padding: '16px 28px', background: paper, color: ink,
                fontSize: 12, fontFamily: '"JetBrains Mono", monospace',
                textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600,
                textDecoration: 'none', border: `1px solid ${paper}`,
              }}>[ {X.cta.buttonLabel} → ]</a>
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

window.CompanyPage = CompanyPage;
