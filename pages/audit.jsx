// AuditHome — страница аудита в визуальной системе главной (home.jsx).
// Брутализм: paper #0a0a0a, Archivo Black + JetBrains Mono, hairline #1f1f1f,
// mono-labels [01]…[07], marquee, full-bleed dark секции с таблицами-фрагментами отчёта.

const useViewport = () => {
  const get = () => {
    if (typeof window === 'undefined') return { w: 1280, isMobile: false, isTablet: false };
    const w = window.innerWidth;
    return { w, isMobile: w < 768, isTablet: w >= 768 && w < 1024 };
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

const AuditHome = () => {
  const A = window.AUDIT;

  // ── CTA form state
  const [ctaForm, setCtaForm] = React.useState({});
  const [ctaStatus, setCtaStatus] = React.useState('idle'); // idle | sending | ok | error

  const handleCtaChange = e =>
    setCtaForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleCtaSubmit = async e => {
    e.preventDefault();
    setCtaStatus('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...ctaForm,
          source: '/audit',
          date: new Date().toLocaleString('ru-RU'),
        }),
      });
      setCtaStatus(res.ok ? 'ok' : 'error');
    } catch {
      setCtaStatus('error');
    }
  };

  const ink   = 'var(--v2-ink, #fafafa)';
  const paper = 'var(--v2-paper, #0a0a0a)';
  const muted = 'var(--v2-muted, #707070)';
  const line  = 'var(--v2-line, #1f1f1f)';
  const deep  = '#050505';

  const { isMobile, isTablet } = useViewport();
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

  const Display = ({ children, size, style }) => (
    <h2 style={{
      fontFamily: '"Archivo Black", "Helvetica Neue", sans-serif',
      fontSize: size || (isMobile ? 'clamp(34px, 9vw, 48px)' : 'clamp(48px, 7vw, 112px)'),
      lineHeight: 0.94,
      letterSpacing: '-0.04em', margin: 0, color: ink, fontWeight: 900,
      textTransform: 'uppercase',
      overflowWrap: 'anywhere',
      ...style,
    }}>{children}</h2>
  );
  const Cell = ({ children, style, dark }) => (
    <div style={{
      border: `1px solid ${line}`, padding: isMobile ? 20 : 28,
      background: dark ? deep : paper, ...style,
    }}>{children}</div>
  );
  const SectionLabel = ({ n, name }) => (
    <div style={monoLabel}>[{n}] {name}</div>
  );

  // ── status glyphs for tables (mono, BW)
  const benchGlyph = {
    norm:  { m: '●', label: 'в норме' },
    over:  { m: '▲', label: 'выше нормы' },
    under: { m: '▼', label: 'недоинвест.' },
    miss:  { m: '○', label: 'не отслеж.' },
  };
  const checkGlyph = {
    yes:  { m: '✓', label: 'есть' },
    no:   { m: '✕', label: 'нет' },
    warn: { m: '!', label: 'част.' },
    na:   { m: '—', label: '—' },
  };

  return (
    <React.Fragment>
      <window.SiteHeader active="audit" />
      <div data-screen-label="Audit" style={{
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
          {/* free stamp */}
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
            БЕСПЛАТНО
          </span>
          <span style={{ ...monoLabel, color: ink, fontSize: isMobile ? 10 : 11 }}>
            {`>>> ${A.hero.eyebrow}`}
          </span>
          <span style={{ ...monoLabel, fontSize: isMobile ? 10 : 11 }}>
            · {A.hero.kicker}
          </span>
        </div>

        <h1 style={{
          fontFamily: '"Archivo Black", sans-serif',
          fontSize: isMobile ? 'clamp(34px, 10vw, 60px)' : 'clamp(88px, 11vw, 184px)',
          lineHeight: 0.92,
          letterSpacing: '-0.05em', margin: 0, color: ink, fontWeight: 900,
          textTransform: 'lowercase',
          overflowWrap: 'anywhere',
        }}>
          бесплатный<br/>аудит.
        </h1>

        <div style={{
          marginTop: isMobile ? 32 : 48,
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
          gap: isMobile ? 24 : 32,
          borderTop: `1px solid ${line}`, paddingTop: isMobile ? 24 : 32, alignItems: 'start',
        }}>
          <p style={{
            ...monoBody, fontSize: isMobile ? 13 : 14,
            margin: 0,
            gridColumn: isMobile ? 'auto' : 'span 2',
            maxWidth: 640,
          }}>
            {A.hero.body}
            <span style={{ display: 'block', marginTop: 14, color: muted }}>{A.hero.body2}</span>
          </p>
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 10,
            alignItems: isMobile ? 'stretch' : 'flex-end',
          }}>
            <a href="#contact" style={{
              padding: '14px 22px', background: ink, color: paper,
              border: `1px solid ${ink}`, fontSize: 12,
              fontFamily: '"JetBrains Mono", monospace', textTransform: 'uppercase',
              letterSpacing: 1.5, fontWeight: 600, textDecoration: 'none',
              textAlign: 'center',
            }}>[ {A.hero.cta} → ]</a>
            <a style={{
              padding: '12px 22px', color: ink, border: `1px solid ${line}`,
              fontSize: 11, fontFamily: '"JetBrains Mono", monospace',
              textTransform: 'uppercase', letterSpacing: 1.5, textDecoration: 'none',
              textAlign: 'center', cursor: 'pointer',
            }}>[ {A.hero.secondary} ]</a>
          </div>
        </div>

        {/* meta strip */}
        <div style={{
          marginTop: isMobile ? 28 : 40,
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          border: `1px solid ${line}`,
        }}>
          {A.hero.meta.map((m, i) => (
            <div key={i} style={{
              padding: isMobile ? 16 : 22,
              borderRight: !isMobile && i < 3 ? `1px solid ${line}` : (isMobile && i % 2 === 0 ? `1px solid ${line}` : 'none'),
              borderBottom: isMobile && i < 2 ? `1px solid ${line}` : 'none',
            }}>
              <div style={{ ...monoLabel, fontSize: 10 }}>{m.k}</div>
              <div style={{
                fontFamily: '"Archivo Black", sans-serif',
                fontSize: isMobile ? 14 : 16,
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
        padding: '14px 0', overflow: 'hidden',
      }}>
        <div style={{
          fontFamily: '"Archivo Black", sans-serif',
          fontSize: isMobile ? 13 : 16, letterSpacing: 4,
          textTransform: 'uppercase', whiteSpace: 'nowrap', color: ink,
          display: 'flex', gap: 32,
        }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i}>AUDIT · 2026 · FREE · 60+ PAGES · PDF · ZOOM · 10 DAYS · FASHION ONLY ·</span>
          ))}
        </div>
      </section>

      {/* MANIFESTO — fashion focus */}
      <section style={{ padding: `${sectionPadY}px 0` }}>
        <div style={wrap}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '120px 1fr',
            gap: isMobile ? 16 : 32, alignItems: 'start',
          }}>
            <SectionLabel n="00" name="manifesto" />
            <div style={{ maxWidth: 920 }}>
              <h2 style={{
                fontFamily: '"Archivo Black", sans-serif',
                fontSize: isMobile ? 'clamp(28px, 7.5vw, 36px)' : 'clamp(40px, 4.8vw, 76px)',
                lineHeight: 1.02,
                letterSpacing: '-0.03em', margin: 0, color: ink,
                textTransform: 'uppercase',
                overflowWrap: 'anywhere',
              }}>
                Только <span style={{ color: muted }}>fashion.</span><br/>
                Только то, в чём мы знаем больше всех.
              </h2>
              <p style={{
                ...monoBody, color: muted,
                marginTop: isMobile ? 20 : 32, maxWidth: 720,
              }}>{A.fashionFocus.sub}</p>

              {/* stats inline */}
              <div style={{
                marginTop: isMobile ? 28 : 40,
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                borderTop: `1px solid ${line}`,
              }}>
                {A.fashionFocus.stats.map((s, i) => (
                  <div key={i} style={{
                    padding: isMobile ? '18px 14px 0 0' : '24px 24px 0 0',
                    borderRight: !isMobile && i < 3 ? `1px solid ${line}` : (isMobile && i % 2 === 0 ? `1px solid ${line}` : 'none'),
                    borderTop: isMobile && i > 1 ? `1px solid ${line}` : 'none',
                    marginTop: isMobile && i > 1 ? 18 : 0,
                  }}>
                    <div style={{
                      fontFamily: '"Archivo Black", sans-serif',
                      fontSize: isMobile ? 36 : 56, lineHeight: 1,
                      letterSpacing: '-0.04em',
                    }}>{s.n}</div>
                    <div style={{
                      fontFamily: '"Archivo Black", sans-serif',
                      fontSize: isMobile ? 13 : 15, marginTop: 12,
                      textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1.15,
                    }}>{s.l}</div>
                    <div style={{
                      ...monoBody, fontSize: isMobile ? 11 : 12, color: muted, marginTop: 6,
                    }}>{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* segment chips */}
              <div style={{ marginTop: isMobile ? 28 : 36 }}>
                <div style={{ ...monoLabel, marginBottom: 14 }}>{`// сегменты`}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {A.fashionFocus.segments.map((sg, i) => (
                    <span key={i} style={{
                      padding: isMobile ? '8px 12px' : '10px 14px',
                      border: `1px solid ${line}`,
                      fontFamily: '"JetBrains Mono", monospace', fontSize: isMobile ? 11 : 12,
                      color: ink, letterSpacing: 0.4,
                    }}>{sg}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRIGGERS */}
      <section style={{ padding: `${sectionPadY}px 0`, borderTop: `1px solid ${line}` }}>
        <div style={wrap}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '120px 1fr',
            gap: isMobile ? 16 : 32,
            marginBottom: isMobile ? 32 : 56, alignItems: 'start',
          }}>
            <SectionLabel n={A.triggers.label} name="triggers" />
            <div>
              <Display>{A.triggers.title}.</Display>
              <p style={{ ...monoBody, color: muted, marginTop: 18, maxWidth: 720 }}>
                {A.triggers.sub}
              </p>
            </div>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : (isTablet ? '1fr 1fr' : 'repeat(4, 1fr)'),
          }}>
            {A.triggers.items.map((c, i) => (
              <Cell key={c.n} style={{
                padding: isMobile ? '24px 20px' : '32px 24px',
                minHeight: isMobile ? 'auto' : 320,
              }}>
                <div style={{
                  fontFamily: '"Archivo Black", sans-serif',
                  fontSize: isMobile ? 48 : 64, lineHeight: 1,
                }}>{c.n}</div>
                <div style={{
                  fontFamily: '"Archivo Black", sans-serif',
                  fontSize: isMobile ? 15 : 17,
                  textTransform: 'uppercase', marginTop: isMobile ? 16 : 28,
                  lineHeight: 1.18, letterSpacing: '-0.01em',
                }}>{c.t}</div>
                <div style={{
                  ...monoBody, fontSize: isMobile ? 13 : 12,
                  color: muted, marginTop: 12,
                }}>{c.d}</div>
              </Cell>
            ))}
          </div>
        </div>
      </section>

      {/* STRUCTURE */}
      <section style={{ padding: `${sectionPadY}px 0`, borderTop: `1px solid ${line}` }}>
        <div style={wrap}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '120px 1fr',
            gap: isMobile ? 16 : 32,
            marginBottom: isMobile ? 32 : 56, alignItems: 'start',
          }}>
            <SectionLabel n={A.structure.label} name="structure" />
            <div>
              <Display>{A.structure.title}.</Display>
              <p style={{ ...monoBody, color: muted, marginTop: 18, maxWidth: 720 }}>
                {A.structure.sub}
              </p>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${line}` }}>
            {A.structure.items.map((s, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '50px 1fr' : '90px 320px 1fr 90px',
                gap: isMobile ? 14 : 32,
                padding: `${isMobile ? 22 : 28}px 0`,
                borderBottom: `1px solid ${line}`,
                alignItems: 'baseline',
              }}>
                <span style={{
                  fontFamily: '"Archivo Black", sans-serif',
                  fontSize: isMobile ? 22 : 32, lineHeight: 1,
                  color: ink, letterSpacing: '-0.02em',
                }}>{s.n}</span>
                <div style={{
                  fontFamily: '"Archivo Black", sans-serif',
                  fontSize: isMobile ? 18 : 22,
                  textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.15,
                  gridColumn: isMobile ? '2 / -1' : 'auto',
                }}>{s.t}</div>
                {!isMobile && (
                  <div style={{ ...monoBody, color: muted, fontSize: 13 }}>{s.d}</div>
                )}
                {!isMobile && (
                  <div style={{ ...monoLabel, textAlign: 'right' }}>модуль</div>
                )}
                {isMobile && (
                  <div style={{
                    ...monoBody, fontSize: 12.5, color: muted,
                    gridColumn: '2 / -1', marginTop: 6,
                  }}>{s.d}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENCHMARKS */}
      <section style={{
        padding: `${sectionPadY}px 0`, background: deep,
        borderTop: `1px solid ${line}`,
      }}>
        <div style={wrap}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '120px 1fr',
            gap: isMobile ? 16 : 32,
            marginBottom: isMobile ? 28 : 48, alignItems: 'start',
          }}>
            <SectionLabel n={A.benchmarks.label} name="report fragment" />
            <div>
              <Display>{A.benchmarks.title}.</Display>
              <p style={{ ...monoBody, color: muted, marginTop: 18, maxWidth: 720 }}>
                {A.benchmarks.sub}
              </p>
            </div>
          </div>

          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            ...monoLabel, color: muted,
            paddingBottom: 12, borderBottom: `1px solid ${ink}`,
          }}>
            <span>{`>>> фрагмент отчёта · источники продаж`}</span>
            <span>стр. 23 / 64</span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1.4fr 0.9fr 0.9fr' : '2fr 1fr 1fr 1.2fr',
            background: '#0c0c0c', padding: isMobile ? '14px 16px' : '16px 24px',
            ...monoLabel, color: ink, fontSize: isMobile ? 10 : 11,
            borderBottom: `1px solid ${line}`,
          }}>
            <span>{A.benchmarks.head[0]}</span>
            <span style={{ textAlign: 'right' }}>{A.benchmarks.head[1]}</span>
            <span style={{ textAlign: 'right' }}>{A.benchmarks.head[2]}</span>
            {!isMobile && <span style={{ textAlign: 'right' }}>{A.benchmarks.head[3]}</span>}
          </div>
          {A.benchmarks.rows.map((r, i) => {
            const sg = benchGlyph[r.s];
            return (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1.4fr 0.9fr 0.9fr' : '2fr 1fr 1fr 1.2fr',
                background: i % 2 === 0 ? deep : '#0a0a0a',
                padding: isMobile ? '14px 16px' : '18px 24px',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: isMobile ? 12 : 13.5,
                color: ink, alignItems: 'center', gap: 8,
                borderBottom: `1px solid ${line}`,
              }}>
                <span>
                  {isMobile && (
                    <span style={{ marginRight: 8, color: muted }}>{sg.m}</span>
                  )}
                  {r.c}
                </span>
                <span style={{
                  textAlign: 'right', fontVariantNumeric: 'tabular-nums', fontWeight: 600,
                }}>{r.b}</span>
                <span style={{
                  textAlign: 'right', color: muted, fontVariantNumeric: 'tabular-nums',
                }}>{r.a}</span>
                {!isMobile && (
                  <span style={{ textAlign: 'right' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '6px 12px', border: `1px solid ${line}`,
                      ...monoLabel, color: ink, fontSize: 10, letterSpacing: 1,
                    }}>
                      <span>{sg.m}</span>
                      {r.note}
                    </span>
                  </span>
                )}
              </div>
            );
          })}

          <div style={{
            marginTop: 24, display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr',
            gap: isMobile ? 16 : 32, alignItems: 'start',
          }}>
            <div style={{ ...monoBody, fontSize: 11.5, color: muted }}>
              * {A.benchmarks.caption}
            </div>
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: isMobile ? 10 : 14,
              justifyContent: isMobile ? 'flex-start' : 'flex-end',
            }}>
              {Object.values(benchGlyph).map((sg, i) => (
                <span key={i} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  ...monoLabel, color: ink, fontSize: 10,
                }}>
                  <span>{sg.m}</span>
                  {sg.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CHECKLIST */}
      <section style={{ padding: `${sectionPadY}px 0`, borderTop: `1px solid ${line}` }}>
        <div style={wrap}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '120px 1fr',
            gap: isMobile ? 16 : 32,
            marginBottom: isMobile ? 28 : 48, alignItems: 'start',
          }}>
            <SectionLabel n={A.checklist.label} name="checklist" />
            <div>
              <Display>{A.checklist.title}.</Display>
              <p style={{ ...monoBody, color: muted, marginTop: 18, maxWidth: 720 }}>
                {A.checklist.sub}
              </p>
            </div>
          </div>

          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            ...monoLabel, color: muted,
            paddingBottom: 12, borderBottom: `1px solid ${ink}`,
          }}>
            <span>{`>>> фрагмент отчёта · веб-сайт`}</span>
            <span>стр. 14 / 64</span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1.4fr 0.7fr' : '1.6fr 0.6fr 2fr',
            background: '#0c0c0c', padding: isMobile ? '14px 16px' : '16px 24px',
            ...monoLabel, color: ink, fontSize: isMobile ? 10 : 11,
            borderBottom: `1px solid ${line}`,
          }}>
            <span>{A.checklist.head[0]}</span>
            <span style={{ textAlign: isMobile ? 'right' : 'center' }}>{A.checklist.head[1]}</span>
            {!isMobile && <span>{A.checklist.head[2]}</span>}
          </div>

          {A.checklist.rows.map((r, i) => {
            const sg = checkGlyph[r.s];
            return (
              <React.Fragment key={i}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1.4fr 0.7fr' : '1.6fr 0.6fr 2fr',
                  background: i % 2 === 0 ? paper : '#0c0c0c',
                  padding: isMobile ? '14px 16px' : '18px 24px',
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: isMobile ? 12 : 13.5,
                  color: ink, alignItems: 'center', gap: 8,
                  borderBottom: `1px solid ${line}`,
                }}>
                  <span>{r.f}</span>
                  <span style={{ textAlign: isMobile ? 'right' : 'center' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '5px 10px', border: `1px solid ${line}`,
                      ...monoLabel, color: ink, fontSize: 10,
                      minWidth: 56, justifyContent: 'center', letterSpacing: 1,
                    }}>
                      <span style={{ fontWeight: 800 }}>{sg.m}</span>
                      {r.v}
                    </span>
                  </span>
                  {!isMobile && (
                    <span style={{ color: muted, fontSize: 13 }}>{r.n}</span>
                  )}
                </div>
                {isMobile && (
                  <div style={{
                    padding: '0 16px 12px',
                    background: i % 2 === 0 ? paper : '#0c0c0c',
                    color: muted, fontSize: 11.5, lineHeight: 1.55,
                    fontFamily: '"JetBrains Mono", monospace',
                    borderBottom: `1px solid ${line}`,
                  }}>{r.n}</div>
                )}
              </React.Fragment>
            );
          })}

          <div style={{ ...monoBody, fontSize: 12, color: muted, marginTop: 18 }}>
            + ещё 23 пункта в полном отчёте: SEO, аналитика, юзабилити карточки, чекаут, мобильная версия, доступность.
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section style={{
        padding: `${sectionPadY}px 0`, background: deep,
        borderTop: `1px solid ${line}`,
      }}>
        <div style={wrap}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '120px 1fr',
            gap: isMobile ? 16 : 32,
            marginBottom: isMobile ? 32 : 56, alignItems: 'start',
          }}>
            <SectionLabel n={A.outcomes.label} name="outcomes" />
            <Display>{A.outcomes.title}.</Display>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          }}>
            {A.outcomes.items.map((o, i) => (
              <Cell key={i} dark style={{ padding: isMobile ? '24px 20px' : '32px 28px' }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '36px 1fr' : '56px 1fr',
                  gap: isMobile ? 14 : 20, alignItems: 'baseline',
                }}>
                  <span style={{
                    fontFamily: '"Archivo Black", sans-serif',
                    fontSize: isMobile ? 28 : 40, color: muted, lineHeight: 1,
                  }}>0{i+1}</span>
                  <div>
                    <div style={{
                      fontFamily: '"Archivo Black", sans-serif',
                      fontSize: isMobile ? 17 : 22, textTransform: 'uppercase',
                      letterSpacing: '-0.02em', lineHeight: 1.15,
                    }}>{o.t}</div>
                    <div style={{
                      ...monoBody, fontSize: isMobile ? 13 : 13, color: muted, marginTop: 12,
                    }}>{o.d}</div>
                  </div>
                </div>
              </Cell>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ padding: `${sectionPadY}px 0`, borderTop: `1px solid ${line}` }}>
        <div style={wrap}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '120px 1fr',
            gap: isMobile ? 16 : 32,
            marginBottom: isMobile ? 32 : 56, alignItems: 'start',
          }}>
            <SectionLabel n={A.process.label} name="process" />
            <div>
              <Display>{A.process.title}.</Display>
              <p style={{ ...monoBody, color: muted, marginTop: 18, maxWidth: 720 }}>
                {A.process.sub}
              </p>
            </div>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
            borderTop: `1px solid ${ink}`,
          }}>
            {A.process.steps.map((s, i) => (
              <div key={i} style={{
                padding: isMobile ? '24px 0' : '28px 24px 28px 0',
                borderRight: !isMobile && i < 3 ? `1px solid ${line}` : 'none',
                borderBottom: isMobile && i < 3 ? `1px solid ${line}` : 'none',
              }}>
                <div style={{ ...monoLabel, color: ink, fontSize: 11 }}>
                  [{String(i+1).padStart(2,'0')}] {s.day}
                </div>
                <div style={{
                  fontFamily: '"Archivo Black", sans-serif',
                  fontSize: isMobile ? 22 : 26,
                  textTransform: 'uppercase', letterSpacing: '-0.02em',
                  lineHeight: 1.1, marginTop: 16,
                }}>{s.t}</div>
                <div style={{
                  ...monoBody, fontSize: isMobile ? 13 : 12.5, color: muted, marginTop: 14,
                }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ A={A} isMobile={isMobile} sectionPadY={sectionPadY} wrap={wrap} ink={ink} muted={muted} line={line} monoBody={monoBody} monoLabel={monoLabel} />

      {/* CTA */}
      <section id="contact" style={{
        background: ink, color: paper,
        padding: `${isMobile ? 72 : 120}px 0`,
      }}>
        <div style={wrap}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr',
            gap: isMobile ? 40 : 80, alignItems: 'start',
          }}>
            {/* left — contacts */}
            <div>
              <div style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
                letterSpacing: 2, textTransform: 'uppercase', color: '#666',
                marginBottom: isMobile ? 14 : 24,
              }}>{`>>> ${A.cta.eyebrow}`}</div>
              <h2 style={{
                fontFamily: '"Archivo Black", sans-serif',
                fontSize: isMobile ? 'clamp(40px, 11vw, 56px)' : 'clamp(72px, 9vw, 144px)',
                lineHeight: 0.92, fontWeight: 900, letterSpacing: '-0.05em', margin: 0,
                textTransform: 'uppercase', color: paper,
                overflowWrap: 'anywhere',
              }}>{A.cta.title}.</h2>
              <p style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: isMobile ? 13 : 13,
                color: '#666', maxWidth: 420, marginTop: isMobile ? 20 : 32, lineHeight: 1.55,
              }}>{A.cta.sub}</p>
              <div style={{
                marginTop: isMobile ? 28 : 40, paddingTop: 24, borderTop: '1px solid #333',
                display: 'grid', gap: 14,
                fontFamily: '"JetBrains Mono", monospace', fontSize: 12,
                wordBreak: 'break-word',
              }}>
                <div><span style={{ color: '#666' }}>email →</span> {A.contact.email}</div>
                <div><span style={{ color: '#666' }}>tg →</span> {A.contact.telegram}</div>
                <div><span style={{ color: '#666' }}>tel →</span> {A.contact.phone}</div>
              </div>
            </div>

            {/* right — form */}
            {ctaStatus === 'ok' ? (
              <div style={{
                border: '1px solid #333', padding: '48px 32px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: '"JetBrains Mono", monospace', fontSize: 14,
                color: paper, textAlign: 'center', lineHeight: 1.6,
                alignSelf: 'end',
              }}>
                <div>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>✓</div>
                  Заявка получена.<br/>Свяжемся в течение часа.
                </div>
              </div>
            ) : (
              <form onSubmit={handleCtaSubmit} style={{
                display: 'grid', gap: 0, alignSelf: isMobile ? 'stretch' : 'end',
                border: '1px solid #333',
              }}>
                {A.cta.fields.map((f) => (
                  <input
                    key={f.k}
                    name={f.k}
                    placeholder={f.l}
                    required
                    value={ctaForm[f.k] || ''}
                    onChange={handleCtaChange}
                    style={{
                      padding: 18, background: 'transparent',
                      border: 0, borderBottom: '1px solid #333',
                      color: paper, fontSize: 12,
                      fontFamily: '"JetBrains Mono", monospace',
                      letterSpacing: 1, outline: 'none', width: '100%',
                      boxSizing: 'border-box',
                    }}
                  />
                ))}
                <select
                  name="service"
                  value={ctaForm.service || ''}
                  onChange={handleCtaChange}
                  style={{
                    padding: 18, background: 'transparent',
                    color: ctaForm.service ? paper : '#999',
                    border: 0, borderBottom: '1px solid #333',
                    fontSize: 12, fontFamily: '"JetBrains Mono", monospace',
                    letterSpacing: 1, outline: 'none',
                    appearance: 'none', width: '100%',
                  }}
                >
                  <option value="" disabled style={{ color: '#000' }}>{A.cta.select.l}</option>
                  {A.cta.select.options.map((o, i) => (
                    <option key={i} style={{ color: '#000' }}>{o}</option>
                  ))}
                </select>
                <textarea
                  name="message"
                  placeholder="ЧТО РАЗОБРАТЬ В ПЕРВУЮ ОЧЕРЕДЬ"
                  rows={3}
                  value={ctaForm.message || ''}
                  onChange={handleCtaChange}
                  style={{
                    padding: 18, background: 'transparent', border: 0,
                    color: paper, fontSize: 12,
                    fontFamily: '"JetBrains Mono", monospace',
                    letterSpacing: 1, outline: 'none',
                    resize: 'none', width: '100%',
                    boxSizing: 'border-box',
                  }}
                />
                {ctaStatus === 'error' && (
                  <div style={{
                    padding: '12px 18px',
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: 11, color: '#ff4444',
                    borderTop: '1px solid #333',
                  }}>
                    Ошибка отправки. Попробуйте ещё раз.
                  </div>
                )}
                <button
                  type="submit"
                  disabled={ctaStatus === 'sending'}
                  style={{
                    padding: 18, background: paper, color: ink,
                    border: 0, fontSize: 12,
                    fontFamily: '"JetBrains Mono", monospace',
                    textTransform: 'uppercase', letterSpacing: 1.5,
                    cursor: ctaStatus === 'sending' ? 'wait' : 'pointer',
                    fontWeight: 600,
                    opacity: ctaStatus === 'sending' ? 0.6 : 1,
                  }}
                >
                  {ctaStatus === 'sending' ? '[ ОТПРАВЛЯЕМ... ]' : `[ ${A.cta.button} → ]`}
                </button>
                <div style={{
                  padding: 14, fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 11, color: '#666', lineHeight: 1.55,
                  borderTop: '1px solid #333',
                }}>{A.cta.fineprint}</div>
              </form>
            )}
          </div>
        </div>
      </section>

      </div>
      <window.SiteFooter email="sale@anotherfashion.agency" year={2026} />
    </React.Fragment>
  );
};

// FAQ — separate component since it has state
const FAQ = ({ A, isMobile, sectionPadY, wrap, ink, muted, line, monoBody, monoLabel }) => {
  const [open, setOpen] = React.useState(0);
  return (
    <section style={{ padding: `${sectionPadY}px 0`, borderTop: `1px solid ${line}` }}>
      <div style={wrap}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '120px 1fr',
          gap: isMobile ? 16 : 32,
          marginBottom: isMobile ? 28 : 48, alignItems: 'start',
        }}>
          <div style={monoLabel}>[07] faq</div>
          <h2 style={{
            fontFamily: '"Archivo Black", sans-serif',
            fontSize: isMobile ? 'clamp(34px, 9vw, 48px)' : 'clamp(48px, 7vw, 112px)',
            lineHeight: 0.94, letterSpacing: '-0.04em', margin: 0, color: ink,
            fontWeight: 900, textTransform: 'uppercase',
            overflowWrap: 'anywhere',
          }}>Вопросы.</h2>
        </div>
        <div style={{ borderTop: `1px solid ${ink}` }}>
          {A.faq.map((f, i) => (
            <div key={i} style={{ borderBottom: `1px solid ${line}` }}>
              <button onClick={() => setOpen(open === i ? -1 : i)} style={{
                width: '100%', background: 'transparent', color: ink,
                border: 0, padding: `${isMobile ? 22 : 28}px 0`,
                display: 'grid',
                gridTemplateColumns: isMobile ? '40px 1fr 28px' : '70px 1fr 40px',
                gap: 14, alignItems: 'baseline', textAlign: 'left', cursor: 'pointer',
                fontFamily: '"JetBrains Mono", monospace',
              }}>
                <span style={{ ...monoLabel, color: muted }}>0{i+1}</span>
                <span style={{
                  fontFamily: '"Archivo Black", sans-serif',
                  fontSize: isMobile ? 16 : 22,
                  textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.2,
                }}>{f.q}</span>
                <span style={{
                  fontFamily: '"Archivo Black", sans-serif',
                  fontSize: isMobile ? 22 : 28, textAlign: 'right', lineHeight: 1,
                }}>{open === i ? '−' : '+'}</span>
              </button>
              {open === i && (
                <div style={{
                  paddingLeft: isMobile ? 54 : 84, paddingRight: isMobile ? 40 : 80,
                  paddingBottom: isMobile ? 22 : 28,
                  ...monoBody, color: muted,
                }}>{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

window.AuditHome = AuditHome;
