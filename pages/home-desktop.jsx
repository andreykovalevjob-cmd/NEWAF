// Home — agency homepage in the V2 brutalist system. Fully responsive.

const useIsMobile = (bp = 720) => {
  const [m, setM] = React.useState(() =>
    typeof window !== 'undefined' && window.innerWidth < bp
  );
  React.useEffect(() => {
    const on = () => setM(window.innerWidth < bp);
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, [bp]);
  return m;
};

const Home = () => {
  const ink = 'var(--v2-ink, #fafafa)';
  const paper = 'var(--v2-paper, #0a0a0a)';
  const muted = 'var(--v2-muted, #707070)';
  const line = 'var(--v2-line, #1f1f1f)';

  const isMobile = useIsMobile(720);
  const isTablet = useIsMobile(1024) && !isMobile;
  const isWide   = !useIsMobile(1440);
  const pad = isMobile ? 20 : (isWide ? 72 : 56);
  const sectionPadY = isMobile ? 56 : (isWide ? 120 : 96);

  const wrap = { width: '100%', maxWidth: 1680, margin: '0 auto', padding: `0 ${pad}px` };
  const monoLabel = {
    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
    fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: muted,
  };
  const Display = ({ children, style }) => (
    <h2 style={{
      fontFamily: '"Archivo Black", "Helvetica Neue", sans-serif',
      fontSize: isMobile ? 48 : 'clamp(64px, 7vw, 112px)',
      lineHeight: 0.92,
      letterSpacing: '-0.04em', margin: 0, color: ink, fontWeight: 900,
      textTransform: 'uppercase', ...style,
    }}>{children}</h2>
  );
  const Cell = ({ children, style }) => (
    <div style={{
      border: `1px solid ${line}`, padding: isMobile ? 20 : 28, background: paper, ...style,
    }}>{children}</div>
  );

  const capabilities = [
    { n: '01', t: 'D2C-стратегия', d: 'Запуск и развитие собственных каналов продаж для fashion- и beauty-брендов.' },
    { n: '02', t: 'Бренд-консалтинг', d: 'Позиционирование, архитектура, тон коммуникации, визуальная система.' },
    { n: '03', t: 'Performance', d: 'Контекст, таргет, SEO, SMM. Метрики и регулярная оптимизация.' },
    { n: '04', t: 'Контент', d: 'Лукбуки, видеореклама, кампейны, social-контент.' },
  ];

  const LOGOS = [
    { src: 'assets/logos/12storeez.webp',      alt: '12 STOREEZ' },
    { src: 'assets/logos/belleyou.webp',       alt: 'Belle YOU' },
    { src: 'assets/logos/2mood.webp',          alt: '2MOOD' },
    { src: 'assets/logos/lavarice.webp',       alt: 'LAVARICE' },
    { src: 'assets/logos/planta.webp',         alt: 'PLANTA' },
    { src: 'assets/logos/ageofinnocence.webp', alt: 'Age of Innocence' },
    { src: 'assets/logos/thekos.webp',         alt: 'THE KOS' },
    { src: 'assets/logos/pervert.webp',        alt: 'PERVERT' },
    { src: 'assets/logos/yuliawave.webp',      alt: 'YULIAWAVE' },
    { src: 'assets/logos/monochrome.webp',     alt: 'MONOCHROME' },
    { src: 'assets/logos/roseslace.webp',      alt: 'ROSES & LACE' },
    { src: 'assets/logos/rasario.webp',        alt: 'RASARIO' },
    { src: 'assets/logos/nudestory.webp',      alt: 'NUDE STORY' },
    { src: 'assets/logos/pangaia.webp',        alt: 'PANGAIA' },
    { src: 'assets/logos/awake.webp',          alt: 'A.W.A.K.E. MODE' },
    { src: 'assets/logos/davidkoma.webp',      alt: 'DAVID KOMA' },
    { src: 'assets/logos/lnfamily.webp',       alt: 'LN FAMILY' },
    { src: 'assets/logos/namelazz.webp',       alt: 'NAMELAZZ' },
    { src: 'assets/logos/kalmanovich.webp',    alt: 'KALMANOVICH' },
    { src: 'assets/logos/tatabronc.webp',      alt: 'TATABRONC' },
    { src: 'assets/logos/annbeauty.webp',      alt: 'ANNBEAUTY' },
    { src: 'assets/logos/drviki.webp',         alt: 'DR.VIKI' },
  ];

  const cases = [
    {
      id: 'case-2mood',
      client: '2MOOD',
      img: 'assets/cases/2mood.webp',
      text1: '2MOOD — омниканальный fashion-бренд, выросший из D2C-проекта в крупную розничную сеть. Команда 2MOOD обратилась к Shifted на этапе запуска онлайн-продаж.',
      text2: 'С 2019 года мы выстраиваем и масштабируем систему performance-продвижения бренда: от первого интернет-магазина до мобильного приложения и сети из более чем 20 офлайн-точек.',
      text3: 'Сегодня маркетинг 2MOOD — это управляемая машина роста, соединяющая онлайн, офлайн и CRM в единую экосистему.',
      metrics: [
        { n: '10x', l: 'Рост бизнеса относительно стартовой точки' },
        { n: '10x', l: 'Кратный рост онлайн-продаж' },
        { n: '20+', l: 'Оффлайн-магазинов, поддержанных digital-маркетингом' },
        { n: '1',   l: 'Единая performance-система: трафик, CRM, приложение, розница' },
      ],
    },
  ];

  const [caseIdx, setCaseIdx] = React.useState(0);
  const c = cases[caseIdx];
  const capCols = isMobile ? '1fr' : (isTablet ? '1fr 1fr' : 'repeat(4, 1fr)');

  return (
    <React.Fragment>
      <window.SiteHeader active="audit" />
      <div data-screen-label="Home" style={{
        width: '100%', maxWidth: 1600, margin: '0 auto',
        background: paper, color: ink,
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        overflowX: 'hidden',
      }}>

        {/* ANNOUNCEMENT BAR */}
        <div style={{
          background: ink, color: paper, padding: `${isMobile ? 9 : 11}px ${pad}px`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: isMobile ? 10 : 18, borderBottom: `1px solid ${ink}`,
        }}>
          <span style={{
            width: isMobile ? 6 : 7, height: isMobile ? 6 : 7, borderRadius: '50%',
            background: paper, flexShrink: 0,
          }} />
          <span style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: isMobile ? 11 : 13, color: paper, letterSpacing: 0.4,
            textAlign: 'center', textTransform: 'uppercase', flexShrink: 1,
          }}>Дарим бесплатный аудит fashion-бренда до 1 июня</span>
          {!isMobile && (
            <>
              <span style={{ ...monoLabel, fontSize: 10, color: '#888', flexShrink: 0 }}>
                · осталось мест: 4
              </span>
              <a href="#contact" style={{
                ...monoLabel, fontSize: 10, color: paper, textDecoration: 'underline',
                textUnderlineOffset: 4, flexShrink: 0, marginLeft: 4,
              }}>[ получить → ]</a>
            </>
          )}
          {isMobile && (
            <a href="#contact" style={{
              ...monoLabel, fontSize: 9, color: paper, textDecoration: 'underline',
              textUnderlineOffset: 3, flexShrink: 0,
            }}>[ получить → ]</a>
          )}
        </div>

        {/* HERO */}
        <section style={{ ...wrap, padding: `${isMobile ? 40 : 64}px ${pad}px ${isMobile ? 56 : 80}px` }}>
          <div style={{ ...monoLabel, marginBottom: isMobile ? 20 : 32, fontSize: isMobile ? 10 : 11 }}>
            {isMobile ? '>>> independent · since 2011' : '>>> independent agency · fashion · beauty · since 2011'}
          </div>
          <h1 style={{
            fontFamily: '"Archivo Black", sans-serif',
            fontSize: isMobile ? 'clamp(56px, 18vw, 96px)' : 'clamp(96px, 12.5vw, 200px)',
            lineHeight: 0.88,
            letterSpacing: '-0.05em', margin: 0, color: ink, fontWeight: 900,
            textTransform: 'lowercase',
          }}>another<br/>fashion.</h1>
          <div style={{
            marginTop: isMobile ? 32 : 48,
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
            gap: isMobile ? 24 : 32,
            borderTop: `1px solid ${line}`, paddingTop: isMobile ? 24 : 32, alignItems: 'start',
          }}>
            <p style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: isMobile ? 13 : 14, lineHeight: 1.55,
              color: ink, margin: 0,
              gridColumn: isMobile ? 'auto' : 'span 2',
              maxWidth: 640,
            }}>
              Независимое агентство для fashion- и beauty-брендов. Стратегия, D2C-каналы, бренд-коммуникация, performance. Делаем брендам собственную продажу — без зависимости от маркетплейсов.
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
              }}>[ начать проект → ]</a>
              <a href="index.html" style={{
                padding: '12px 22px', color: ink, border: `1px solid ${line}`,
                fontSize: 11, fontFamily: '"JetBrains Mono", monospace',
                textTransform: 'uppercase', letterSpacing: 1.5, textDecoration: 'none',
                textAlign: 'center',
              }}>[ d2c.landing → ]</a>
            </div>
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
            {Array.from({length: 8}).map((_, i) => (
              <span key={i}>STRATEGY · D2C · BRAND · PERFORMANCE · CONTENT · 2011→</span>
            ))}
          </div>
        </section>

        {/* MANIFESTO */}
        <section style={{ padding: `${sectionPadY}px 0` }}>
          <div style={wrap}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '120px 1fr',
              gap: isMobile ? 16 : 32, alignItems: 'start',
            }}>
              <div style={monoLabel}>[01] manifesto</div>
              <div style={{ maxWidth: 920 }}>
                <h2 style={{
                  fontFamily: '"Archivo Black", sans-serif',
                  fontSize: isMobile ? 32 : 'clamp(40px, 4.8vw, 76px)',
                  lineHeight: 0.98,
                  letterSpacing: '-0.03em', margin: 0, color: ink,
                  textTransform: 'uppercase',
                }}>
                  Бренд — это не товар на полке.<br/>
                  Это <span style={{ color: muted }}>прямая связь</span> с тем, кто его носит.
                </h2>
                <p style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: isMobile ? 13 : 14, lineHeight: 1.65,
                  color: muted, marginTop: isMobile ? 20 : 32, maxWidth: 720,
                }}>
                  Мы строим бренды, у которых есть своя аудитория, свой голос и свой канал продаж. Без посредников, без алгоритмов, без зависимости от чьих-то комиссий.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* REEL */}
        <section style={{
          position: 'relative', width: '100%', background: '#000',
          borderTop: `1px solid ${line}`, borderBottom: `1px solid ${line}`,
          aspectRatio: isMobile ? '4 / 5' : '16 / 9', overflow: 'hidden',
        }}>
          <video
            src={(window.__resources && window.__resources.reel) || "assets/reel.mp4"}
            autoPlay muted loop playsInline
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%', objectFit: 'cover',
              filter: 'contrast(1.05) saturate(0.95)',
            }}
          />
          <div style={{
            position: 'absolute', top: isMobile ? 14 : 24, left: isMobile ? 14 : 24, zIndex: 2,
            fontFamily: '"JetBrains Mono", monospace', fontSize: isMobile ? 9 : 11,
            letterSpacing: 1.5, textTransform: 'uppercase', color: '#fafafa',
            display: 'flex', gap: 10, alignItems: 'center',
          }}>
            <span style={{
              display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
              background: '#ff3b1f', boxShadow: '0 0 8px #ff3b1f',
            }} />
            {isMobile ? 'REC' : 'REC · LIVE FROM THE FLOOR'}
          </div>
          <div style={{
            position: 'absolute', top: isMobile ? 14 : 24, right: isMobile ? 14 : 24, zIndex: 2,
            fontFamily: '"JetBrains Mono", monospace', fontSize: isMobile ? 9 : 11,
            letterSpacing: 1.5, textTransform: 'uppercase', color: '#fafafa', opacity: 0.7,
          }}>[ REEL / 2025 ]</div>
          <div style={{
            position: 'absolute',
            left: isMobile ? 16 : 32, right: isMobile ? 16 : 'auto',
            bottom: isMobile ? 16 : 32, zIndex: 2,
            color: '#fafafa', maxWidth: 760,
          }}>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: isMobile ? 9 : 11,
              letterSpacing: 2, textTransform: 'uppercase', opacity: 0.7,
              marginBottom: isMobile ? 10 : 16,
            }}>// showreel</div>
            <div style={{
              fontFamily: '"Archivo Black", sans-serif',
              fontSize: isMobile ? 28 : 'clamp(36px, 4.5vw, 72px)', lineHeight: 0.95,
              letterSpacing: '-0.03em', textTransform: 'uppercase',
            }}>Бренды,<br/>которые делают<br/>свою собственную игру.</div>
          </div>
          {!isMobile && (
            <div style={{
              position: 'absolute', right: 32, bottom: 32, zIndex: 2,
              fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
              letterSpacing: 1.2, color: '#fafafa', opacity: 0.5,
              textAlign: 'right', lineHeight: 1.6,
            }}>
              ANOTHER FASHION AGENCY<br/>
              INDEPENDENT · 14 YEARS<br/>
              ━━━━━━━━━━━━━
            </div>
          )}
        </section>

        {/* CAPABILITIES */}
        <section style={{ padding: `${sectionPadY}px 0` }}>
          <div style={wrap}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '120px 1fr',
              gap: isMobile ? 16 : 32,
              marginBottom: isMobile ? 32 : 56, alignItems: 'start',
            }}>
              <div style={monoLabel}>[02] capabilities</div>
              <Display>Что мы<br/>делаем.</Display>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: capCols }}>
              {capabilities.map((c, i) => (
                <Cell key={c.n} style={{
                  padding: isMobile ? '24px 20px' : '32px 24px',
                  minHeight: isMobile ? 'auto' : 300,
                }}>
                  <div style={{
                    fontFamily: '"Archivo Black", sans-serif',
                    fontSize: isMobile ? 48 : 64, lineHeight: 1,
                  }}>{c.n}</div>
                  <div style={{
                    fontFamily: '"Archivo Black", sans-serif',
                    fontSize: isMobile ? 16 : 18,
                    textTransform: 'uppercase', marginTop: isMobile ? 16 : 28, lineHeight: 1.15,
                    letterSpacing: '-0.01em',
                  }}>{c.t}</div>
                  <div style={{
                    fontSize: isMobile ? 13 : 12, lineHeight: 1.55,
                    color: muted, marginTop: 12,
                  }}>{c.d}</div>
                </Cell>
              ))}
            </div>
          </div>
        </section>

        {/* SELECTED WORK — 2MOOD CASE */}
        <section style={{
          padding: `${sectionPadY}px 0`,
          borderTop: `1px solid ${line}`,
        }}>
          <div style={wrap}>
            {/* Section header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '120px 1fr',
              gap: isMobile ? 16 : 32,
              marginBottom: isMobile ? 40 : 64, alignItems: 'start',
            }}>
              <div style={monoLabel}>[03] selected work</div>
              <Display>Кейсы<br/>2024 — 2025.</Display>
            </div>

            {/* Case card */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? 32 : 64,
              alignItems: 'start',
            }}>
              {/* Photo */}
              <div style={{
                width: '100%',
                aspectRatio: isMobile ? '3 / 4' : '3 / 4',
                overflow: 'hidden',
                background: '#1a1a1a',
              }}>
                <img
                  src={'/' + c.img}
                  alt={c.client}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover', display: 'block',
                  }}
                  onError={e => { e.target.style.display = 'none'; }}
                />
              </div>

              {/* Content */}
              <div style={{ paddingTop: isMobile ? 0 : 8 }}>
                <h3 style={{
                  fontFamily: '"Archivo Black", sans-serif',
                  fontSize: isMobile ? 36 : 'clamp(40px, 3.5vw, 56px)',
                  fontWeight: 900, letterSpacing: '-0.03em',
                  textTransform: 'uppercase', color: ink,
                  margin: '0 0 24px 0',
                }}>{c.client}</h3>

                <p style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: isMobile ? 13 : 14, lineHeight: 1.65,
                  color: ink, margin: '0 0 16px 0',
                }}>{c.text1}</p>
                <p style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: isMobile ? 13 : 14, lineHeight: 1.65,
                  color: ink, margin: '0 0 16px 0',
                }}>{c.text2}</p>
                <p style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: isMobile ? 13 : 14, lineHeight: 1.65,
                  color: ink, margin: 0,
                }}>{c.text3}</p>

                {/* Divider */}
                <div style={{
                  width: '100%', height: 1,
                  background: line,
                  margin: `${isMobile ? 28 : 36}px 0`,
                }} />

                {/* Metrics */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: isMobile ? 16 : 20,
                }}>
                  {c.metrics.map((m, i) => (
                    <div key={i}>
                      <div style={{
                        fontFamily: '"Archivo Black", sans-serif',
                        fontSize: isMobile ? 28 : 'clamp(28px, 2.5vw, 40px)',
                        fontWeight: 900, letterSpacing: '-0.03em',
                        color: ink, lineHeight: 1, marginBottom: 8,
                      }}>{m.n}</div>
                      <div style={{
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: isMobile ? 10 : 11,
                        color: muted, lineHeight: 1.4,
                        textTransform: 'uppercase', letterSpacing: 0.5,
                      }}>{m.l}</div>
                    </div>
                  ))}
                </div>

                {/* Nav arrows */}
                <div style={{
                  display: 'flex', gap: 16, marginTop: isMobile ? 28 : 36,
                  alignItems: 'center',
                }}>
                  <button
                    onClick={() => setCaseIdx((caseIdx - 1 + cases.length) % cases.length)}
                    style={{
                      background: 'transparent', border: `1px solid ${line}`,
                      color: ink, width: 44, height: 44,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', fontSize: 18,
                      fontFamily: '"JetBrains Mono", monospace',
                    }}
                  >←</button>
                  <button
                    onClick={() => setCaseIdx((caseIdx + 1) % cases.length)}
                    style={{
                      background: 'transparent', border: `1px solid ${line}`,
                      color: ink, width: 44, height: 44,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', fontSize: 18,
                      fontFamily: '"JetBrains Mono", monospace',
                    }}
                  >→</button>
                  <span style={{ ...monoLabel, fontSize: 10 }}>
                    {String(caseIdx + 1).padStart(2, '0')} / {String(cases.length).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PORTFOLIO */}
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
              fontFamily: '"Archivo Black", "Helvetica Neue", sans-serif',
              fontSize: isMobile ? 'clamp(34px, 10vw, 56px)' : 'clamp(56px, 7vw, 112px)',
              fontWeight: 900, letterSpacing: '-0.04em', margin: 0,
              textTransform: 'uppercase', color: ink, lineHeight: 0.95,
            }}>ПОРТФОЛИО</h2>
          </div>
          <div style={{ background: '#ffffff', padding: `${isMobile ? 48 : 96}px 0` }}>
            <div style={{ ...wrap, padding: `0 ${isMobile ? 20 : 64}px`, maxWidth: 1760 }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                columnGap: isMobile ? 8 : 12,
                rowGap: isMobile ? 16 : 24,
                alignItems: 'center', justifyItems: 'center',
              }}>
                {LOGOS.map((l, i) => (
                  <div key={i} style={{
                    width: '100%',
                    height: isMobile ? 160 : 220,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: isMobile ? '0 4px' : '0 6px',
                  }}>
                    <img
                      src={'/' + l.src}
                      alt={l.alt}
                      loading="lazy"
                      style={{
                        width: '100%', height: '100%',
                        objectFit: 'contain', display: 'block',
                      }}
                    />
                  </div>
                ))}
              </div>
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
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr',
              gap: isMobile ? 40 : 80, alignItems: 'start',
            }}>
              <div>
                <div style={{
                  fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
                  letterSpacing: 2, textTransform: 'uppercase', color: '#666',
                  marginBottom: isMobile ? 14 : 24,
                }}>{`>>> начать проект`}</div>
                <h2 style={{
                  fontFamily: '"Archivo Black", sans-serif',
                  fontSize: isMobile ? 'clamp(48px, 14vw, 80px)' : 'clamp(72px, 9vw, 144px)',
                  lineHeight: 0.88,
                  fontWeight: 900, letterSpacing: '-0.05em', margin: 0,
                  textTransform: 'uppercase', color: paper,
                }}>Напишите<br/>нам.</h2>
                <p style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 13,
                  color: '#666', maxWidth: 380, marginTop: isMobile ? 20 : 32, lineHeight: 1.55,
                }}>Расскажите о вашем бренде — мы соберём команду и предложим стратегию за 5 рабочих дней.</p>
                <div style={{
                  marginTop: isMobile ? 28 : 40, paddingTop: 24, borderTop: `1px solid #333`,
                  display: 'grid', gap: 14,
                  fontFamily: '"JetBrains Mono", monospace', fontSize: 12,
                  wordBreak: 'break-word',
                }}>
                  <div><span style={{ color: '#666' }}>email →</span> sale@anotherfashion.agency</div>
                  <div><span style={{ color: '#666' }}>tg →</span> @anotherfashion</div>
                  <div><span style={{ color: '#666' }}>tel →</span> +7 (495) 000-00-00</div>
                </div>
              </div>
              <form style={{ display: 'grid', gap: 0, alignSelf: isMobile ? 'stretch' : 'end', border: `1px solid #333` }}>
                {['ИМЯ', 'EMAIL', 'БРЕНД / КОМПАНИЯ'].map((p, i) => (
                  <input key={i} placeholder={p} style={{
                    padding: 18, background: 'transparent',
                    border: 0, borderBottom: `1px solid #333`,
                    color: paper, fontSize: 12, fontFamily: '"JetBrains Mono", monospace',
                    letterSpacing: 1, outline: 'none', width: '100%',
                  }}/>
                ))}
                <textarea placeholder="О ЧЁМ ПРОЕКТ" rows={4} style={{
                  padding: 18, background: 'transparent', border: 0,
                  color: paper, fontSize: 12, fontFamily: '"JetBrains Mono", monospace',
                  letterSpacing: 1, outline: 'none', resize: 'none', width: '100%',
                }}/>
                <button type="button" style={{
                  padding: 18, background: paper, color: ink,
                  border: 0, fontSize: 12, fontFamily: '"JetBrains Mono", monospace',
                  textTransform: 'uppercase', letterSpacing: 1.5, cursor: 'pointer',
                  fontWeight: 600,
                }}>[ ОТПРАВИТЬ → ]</button>
              </form>
            </div>
          </div>
        </section>

      </div>
      <window.SiteFooter email="sale@anotherfashion.agency" year={2026} />
    </React.Fragment>
  );
};

window.HomeDesktop = Home;
