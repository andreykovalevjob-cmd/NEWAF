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

  const [form, setForm] = React.useState({ name: '', email: '', brand: '', message: '' });
  const [status, setStatus] = React.useState('idle'); // idle | sending | ok | error
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.name) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: '/' }),
      });
      const data = await res.json();
      setStatus(data.ok ? 'ok' : 'error');
    } catch { setStatus('error'); }
  };
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

  const clients = [
    { id: 'client-1', label: '2MOOD' },
    { id: 'client-2', label: 'LAVARICE' },
    { id: 'client-3', label: 'GALLEON' },
    { id: 'client-4', label: 'AURA' },
    { id: 'client-5', label: 'NOIR' },
    { id: 'client-6', label: 'STRATA' },
  ];

  // Real client logos for the PORTFOLIO block.
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

  const works = [
    { id: 'work-1', client: '2MOOD BEAUTY', service: 'D2C launch', year: '2025' },
    { id: 'work-2', client: 'LAVARICE', service: 'Brand + e-com', year: '2024' },
    { id: 'work-3', client: 'GALLEON', service: 'Performance', year: '2024' },
  ];

  // grid templates that collapse on mobile
  const capCols = isMobile ? '1fr' : (isTablet ? '1fr 1fr' : 'repeat(4, 1fr)');
  const workCols = isMobile ? '1fr' : (isTablet ? '1fr 1fr' : 'repeat(3, 1fr)');
  const clientCols = isMobile ? 'repeat(2, 1fr)' : (isTablet ? 'repeat(3, 1fr)' : 'repeat(6, 1fr)');

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
        }}>Дарим бесплатный аудит fashion-бренда до 10 июня</span>
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

      {/* REEL — full-bleed video centerpiece */}
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
          }}>Бренды,<br/>которые играют<br/>по своим правилам.</div>
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

      {/* SELECTED WORK — 2MOOD case */}
      <section style={{
        padding: `${sectionPadY}px 0`, background: '#050505',
        borderTop: `1px solid ${line}`,
      }}>
        <div style={wrap}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '120px 1fr',
            gap: isMobile ? 16 : 32,
            marginBottom: isMobile ? 32 : 56, alignItems: 'start',
          }}>
            <div style={monoLabel}>[03] selected work</div>
            <Display>Кейсы<br/>2024 — 2025.</Display>
          </div>

          {/* 2MOOD кейс */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            border: `1px solid ${line}`,
          }}>
            {/* Фото */}
            <div style={{ borderRight: isMobile ? 'none' : `1px solid ${line}`, borderBottom: isMobile ? `1px solid ${line}` : 'none' }}>
              <img
                src="/assets/cases/2mood.jpg"
                alt="2MOOD"
                style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                padding: isMobile ? '16px 18px' : '20px 24px',
                borderTop: `1px solid ${line}`,
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              }}>
                <div>
                  <div style={{
                    fontFamily: '"Archivo Black", sans-serif', fontSize: 16,
                    textTransform: 'uppercase', letterSpacing: '-0.01em', color: ink,
                  }}>2MOOD</div>
                  <div style={{ ...monoLabel, marginTop: 4, color: muted }}>D2C + Performance</div>
                </div>
                <div style={{ ...monoLabel, color: muted }}>2019 — now</div>
              </div>
            </div>

            {/* Текст + метрики */}
            <div style={{
              padding: isMobile ? 24 : 40,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 32,
            }}>
              <div>
                <div style={{ ...monoLabel, marginBottom: 16 }}>{'// о проекте'}</div>
                <p style={{
                  fontFamily: '"JetBrains Mono", monospace', fontSize: isMobile ? 13 : 14,
                  lineHeight: 1.65, color: ink, margin: '0 0 14px',
                }}>
                  2MOOD — омниканальный fashion-бренд, выросший из D2C-проекта в крупную розничную сеть. Команда 2MOOD обратилась к Another Fashion на этапе запуска онлайн-продаж.
                </p>
                <p style={{
                  fontFamily: '"JetBrains Mono", monospace', fontSize: isMobile ? 12 : 13,
                  lineHeight: 1.65, color: muted, margin: 0,
                }}>
                  С 2019 года мы выстраиваем и масштабируем систему performance-продвижения бренда: от первого интернет-магазина до мобильного приложения и сети из более чем 20 офлайн-точек. Сегодня маркетинг 2MOOD — это управляемая машина роста, соединяющая онлайн, офлайн и CRM в единую экосистему.
                </p>
              </div>

              {/* Метрики */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0,
                border: `1px solid ${line}`,
              }}>
                {[
                  { v: '×10+', k: 'рост бизнеса' },
                  { v: '×10',  k: 'рост онлайн-продаж' },
                  { v: '20+',  k: 'офлайн-магазинов' },
                  { v: '1',    k: 'единая система' },
                ].map((m, i) => (
                  <div key={i} style={{
                    padding: isMobile ? '16px 14px' : '18px 20px',
                    borderRight: i % 2 === 0 ? `1px solid ${line}` : 'none',
                    borderBottom: i < 2 ? `1px solid ${line}` : 'none',
                  }}>
                    <div style={{
                      fontFamily: '"Archivo Black", sans-serif', fontSize: isMobile ? 24 : 28,
                      fontWeight: 900, color: ink, letterSpacing: '-0.03em', lineHeight: 1,
                    }}>{m.v}</div>
                    <div style={{ ...monoLabel, fontSize: 10, marginTop: 8 }}>{m.k}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO — black banner + white logo grid (anotherfashion.agency style) */}
      <section style={{ borderTop: `1px solid ${line}` }}>
        {/* Black banner */}
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
        {/* White panel with logo grid */}
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
                fontSize: isMobile ? 13 : 13,
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
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 0, alignSelf: isMobile ? 'stretch' : 'end', border: `1px solid #333` }}>
              <input placeholder="ИМЯ" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={{
                padding: 18, background: 'transparent', border: 0, borderBottom: `1px solid #333`,
                color: paper, fontSize: 12, fontFamily: '"JetBrains Mono", monospace',
                letterSpacing: 1, outline: 'none', width: '100%',
              }}/>
              <input placeholder="EMAIL" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={{
                padding: 18, background: 'transparent', border: 0, borderBottom: `1px solid #333`,
                color: paper, fontSize: 12, fontFamily: '"JetBrains Mono", monospace',
                letterSpacing: 1, outline: 'none', width: '100%',
              }}/>
              <input placeholder="БРЕНД / КОМПАНИЯ" value={form.brand} onChange={e => setForm(f => ({ ...f, brand: e.target.value }))} style={{
                padding: 18, background: 'transparent', border: 0, borderBottom: `1px solid #333`,
                color: paper, fontSize: 12, fontFamily: '"JetBrains Mono", monospace',
                letterSpacing: 1, outline: 'none', width: '100%',
              }}/>
              <textarea placeholder="О ЧЁМ ПРОЕКТ" rows={4} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} style={{
                padding: 18, background: 'transparent', border: 0, borderBottom: `1px solid #333`,
                color: paper, fontSize: 12, fontFamily: '"JetBrains Mono", monospace',
                letterSpacing: 1, outline: 'none', resize: 'none', width: '100%',
              }}/>
              <button type="submit" disabled={status === 'sending' || status === 'ok'} style={{
                padding: 18, background: status === 'ok' ? '#1a3a1a' : paper, color: status === 'ok' ? '#4caf50' : ink,
                border: 0, fontSize: 12, fontFamily: '"JetBrains Mono", monospace',
                textTransform: 'uppercase', letterSpacing: 1.5, cursor: status === 'sending' ? 'wait' : 'pointer',
                fontWeight: 600,
              }}>
                {status === 'sending' ? '[ ОТПРАВКА... ]' : status === 'ok' ? '[ ОТПРАВЛЕНО ✓ ]' : status === 'error' ? '[ ОШИБКА — ПОПРОБУЙТЕ ЕЩЁ ]' : '[ ОТПРАВИТЬ → ]'}
              </button>
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
