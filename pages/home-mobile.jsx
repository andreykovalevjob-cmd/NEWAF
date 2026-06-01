// Mobile-first home — designed for 360-430px viewports. Stretches up to 640 max.

const HomeMobile = () => {
  const ink = 'var(--v2-ink, #fafafa)';
  const paper = 'var(--v2-paper, #0a0a0a)';
  const muted = 'var(--v2-muted, #707070)';
  const line = 'var(--v2-line, #1f1f1f)';

  const mono = {
    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
    letterSpacing: 1, textTransform: 'uppercase',
  };
  const display = {
    fontFamily: '"Archivo Black", "Helvetica Neue", sans-serif',
    letterSpacing: '-0.04em', textTransform: 'uppercase',
    margin: 0, color: ink, fontWeight: 900, lineHeight: 0.92,
  };

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

  const pad = 20;
  const wrap = { padding: `0 ${pad}px` };
  const section = { padding: `56px 0` };

  return (
    <React.Fragment>
      <window.SiteHeader active="audit" />
      <div data-screen-label="Home · Mobile" style={{
        width: '100%', maxWidth: 640, margin: '0 auto',
        background: paper, color: ink,
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        overflowX: 'hidden',
        minHeight: '100vh',
        position: 'relative',
      }}>

        {/* ANNOUNCEMENT BAR */}
        <div style={{
          background: ink, color: paper, padding: `9px ${pad}px`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 10, borderBottom: `1px solid ${ink}`,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%', background: paper, flexShrink: 0,
          }} />
          <span style={{
            ...mono, fontSize: 10, color: paper, letterSpacing: 0.4,
            textAlign: 'center', flexShrink: 1, textTransform: 'uppercase',
          }}>Бесплатный аудит до 1 июня</span>
          <a href="#contact" style={{
            ...mono, fontSize: 9, color: paper, textDecoration: 'underline',
            textUnderlineOffset: 3, flexShrink: 0,
          }}>[ получить → ]</a>
        </div>

        {/* HERO */}
        <section style={{ ...wrap, padding: `36px ${pad}px 48px` }}>
          <div style={{ ...mono, fontSize: 10, color: muted, marginBottom: 24 }}>
            {`>>> independent · since 2011`}
          </div>
          <h1 style={{
            ...display, fontSize: 'clamp(64px, 22vw, 120px)',
            textTransform: 'lowercase', lineHeight: 0.86, letterSpacing: '-0.05em',
          }}>another<br/>fashion.</h1>
          <p style={{
            marginTop: 28, fontSize: 14, lineHeight: 1.55, color: ink,
            fontFamily: '"JetBrains Mono", monospace',
          }}>
            Независимое агентство для fashion- и beauty-брендов. Стратегия, D2C-каналы, бренд-коммуникация, performance. Делаем брендам собственную продажу — без зависимости от маркетплейсов.
          </p>
          <div style={{ marginTop: 28, display: 'grid', gap: 10 }}>
            <a href="#contact" style={{
              ...mono, fontSize: 12, padding: '16px 22px',
              background: ink, color: paper, fontWeight: 600,
              letterSpacing: 1.5, textDecoration: 'none', textAlign: 'center',
              border: `1px solid ${ink}`,
            }}>[ начать проект → ]</a>
            <a href="index.html" style={{
              ...mono, fontSize: 11, padding: '14px 22px',
              color: ink, border: `1px solid ${line}`,
              letterSpacing: 1.5, textDecoration: 'none', textAlign: 'center',
            }}>[ d2c.landing → ]</a>
          </div>
        </section>

        {/* MARQUEE */}
        <div style={{
          borderTop: `1px solid ${line}`, borderBottom: `1px solid ${line}`,
          padding: '12px 0', overflow: 'hidden',
        }}>
          <div style={{
            ...display, fontSize: 14, letterSpacing: 3,
            whiteSpace: 'nowrap', display: 'flex', gap: 32,
            animation: 'marq 30s linear infinite',
          }}>
            {Array.from({length: 8}).map((_, i) => (
              <span key={i}>STRATEGY · D2C · BRAND · PERFORMANCE · CONTENT · 2011→</span>
            ))}
          </div>
          <style>{`@keyframes marq { from { transform: translateX(0)} to { transform: translateX(-50%)} }`}</style>
        </div>

        {/* MANIFESTO */}
        <section style={{ ...section, ...wrap, paddingLeft: pad, paddingRight: pad }}>
          <div style={{ ...mono, fontSize: 10, color: muted, marginBottom: 16 }}>[01] manifesto</div>
          <h2 style={{
            ...display, fontSize: 'clamp(28px, 8.5vw, 44px)', lineHeight: 1.05,
            letterSpacing: '-0.03em',
          }}>
            Бренд — не товар<br/>на полке.<br/>
            <span style={{ color: muted }}>Это прямая связь</span> с тем, кто его носит.
          </h2>
          <p style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 13, lineHeight: 1.65, color: muted, marginTop: 24,
          }}>
            Мы строим бренды, у которых есть своя аудитория, свой голос и свой канал продаж. Без посредников, без алгоритмов, без зависимости от чьих-то комиссий.
          </p>
        </section>

        {/* REEL */}
        <section style={{
          position: 'relative', width: '100%', background: '#000',
          borderTop: `1px solid ${line}`, borderBottom: `1px solid ${line}`,
          aspectRatio: '9 / 16', overflow: 'hidden',
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
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 25%, transparent 60%, rgba(0,0,0,0.7) 100%)',
          }}/>
          <div style={{
            position: 'absolute', top: 14, left: 14, right: 14, zIndex: 2,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            ...mono, fontSize: 10, color: '#fafafa',
          }}>
            <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: '#ff3b1f', boxShadow: '0 0 8px #ff3b1f',
              }}/>
              REC
            </span>
            <span style={{ opacity: 0.7 }}>[ REEL / 2025 ]</span>
          </div>
          <div style={{
            position: 'absolute', left: 16, right: 16, bottom: 22, zIndex: 2,
            color: '#fafafa',
          }}>
            <div style={{ ...mono, fontSize: 10, opacity: 0.7, letterSpacing: 2, marginBottom: 10 }}>// showreel</div>
            <div style={{ ...display, fontSize: 'clamp(28px, 9vw, 44px)', lineHeight: 0.96, letterSpacing: '-0.03em' }}>
              Бренды,<br/>которые делают<br/>свою игру.
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section style={section}>
          <div style={wrap}>
            <div style={{ ...mono, fontSize: 10, color: muted, marginBottom: 16 }}>[02] capabilities</div>
            <h2 style={{ ...display, fontSize: 'clamp(40px, 12vw, 64px)' }}>Что мы<br/>делаем.</h2>
          </div>
          <div style={{ marginTop: 32, borderTop: `1px solid ${line}` }}>
            {capabilities.map((cap) => (
              <div key={cap.n} style={{
                ...wrap, padding: `24px ${pad}px`, borderBottom: `1px solid ${line}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
                  <div style={{ ...display, fontSize: 40, lineHeight: 1 }}>{cap.n}</div>
                  <div style={{ ...display, fontSize: 17, letterSpacing: '-0.01em', flex: 1 }}>{cap.t}</div>
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.55, color: muted, marginTop: 12 }}>{cap.d}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SELECTED WORK — 2MOOD CASE */}
        <section style={{ ...section, borderTop: `1px solid ${line}` }}>
          <div style={wrap}>
            <div style={{ ...mono, fontSize: 10, color: muted, marginBottom: 16 }}>[03] selected work</div>
            <h2 style={{ ...display, fontSize: 'clamp(40px, 12vw, 64px)', marginBottom: 32 }}>
              Кейсы<br/>2024 — 2025.
            </h2>

            {/* Photo — full width */}
            <div style={{
              width: '100%', aspectRatio: '3 / 4',
              overflow: 'hidden', background: '#1a1a1a',
              marginBottom: 28,
            }}>
              <img
                src={'/' + c.img}
                alt={c.client}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={e => { e.target.style.display = 'none'; }}
              />
            </div>

            {/* Title */}
            <h3 style={{
              ...display, fontSize: 'clamp(36px, 11vw, 52px)',
              letterSpacing: '-0.03em', marginBottom: 20,
            }}>{c.client}</h3>

            {/* Text */}
            <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 13, lineHeight: 1.65, color: ink, marginBottom: 14 }}>{c.text1}</p>
            <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 13, lineHeight: 1.65, color: ink, marginBottom: 14 }}>{c.text2}</p>
            <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 13, lineHeight: 1.65, color: ink, marginBottom: 0 }}>{c.text3}</p>

            {/* Divider */}
            <div style={{ width: '100%', height: 1, background: line, margin: '28px 0' }} />

            {/* Metrics 2x2 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {c.metrics.map((m, i) => (
                <div key={i}>
                  <div style={{
                    fontFamily: '"Archivo Black", sans-serif',
                    fontSize: 32, fontWeight: 900, letterSpacing: '-0.03em',
                    color: ink, lineHeight: 1, marginBottom: 8,
                  }}>{m.n}</div>
                  <div style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: 10, color: muted, lineHeight: 1.4,
                    textTransform: 'uppercase', letterSpacing: 0.5,
                  }}>{m.l}</div>
                </div>
              ))}
            </div>

            {/* Nav arrows */}
            <div style={{ display: 'flex', gap: 12, marginTop: 28, alignItems: 'center' }}>
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
              <span style={{ ...mono, fontSize: 10, color: muted }}>
                {String(caseIdx + 1).padStart(2, '0')} / {String(cases.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section style={{ borderTop: `1px solid ${line}` }}>
          <div style={{
            background: paper, color: ink,
            padding: `36px ${pad}px`,
            textAlign: 'center', borderBottom: `1px solid ${line}`,
          }}>
            <div style={{ ...mono, fontSize: 10, color: muted, marginBottom: 12 }}>{`// our clients`}</div>
            <h2 style={{
              ...display, color: ink,
              fontSize: 'clamp(34px, 11vw, 56px)',
              letterSpacing: '-0.04em', textTransform: 'uppercase',
              margin: 0, lineHeight: 0.95,
            }}>ПОРТФОЛИО</h2>
          </div>
          <div style={{ background: '#ffffff', padding: '56px 0' }}>
            <div style={{ padding: `0 ${pad}px` }}>
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
                columnGap: 8, rowGap: 16, alignItems: 'center', justifyItems: 'center',
              }}>
                {LOGOS.map((l, i) => (
                  <div key={i} style={{
                    width: '100%', height: 140,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '0 4px',
                  }}>
                    <img
                      src={'/' + l.src}
                      alt={l.alt}
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
        <section id="contact" style={{ background: ink, color: paper, padding: '64px 0' }}>
          <div style={wrap}>
            <div style={{
              ...mono, fontSize: 10, color: '#666',
              marginBottom: 14, letterSpacing: 2,
            }}>{`>>> начать проект`}</div>
            <h2 style={{
              ...display, color: paper, fontSize: 'clamp(48px, 16vw, 84px)',
              letterSpacing: '-0.05em', lineHeight: 0.88,
            }}>Напишите<br/>нам.</h2>
            <p style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 13,
              color: '#666', marginTop: 22, lineHeight: 1.55,
            }}>Расскажите о вашем бренде — мы соберём команду и предложим стратегию за 5 рабочих дней.</p>
            <div style={{
              marginTop: 26, paddingTop: 22, borderTop: `1px solid #333`,
              display: 'grid', gap: 14,
              fontFamily: '"JetBrains Mono", monospace', fontSize: 12,
              wordBreak: 'break-word',
            }}>
              <div><span style={{ color: '#666' }}>email →</span> sale@anotherfashion.agency</div>
              <div><span style={{ color: '#666' }}>tg →</span> @anotherfashion</div>
              <div><span style={{ color: '#666' }}>tel →</span> +7 (495) 000-00-00</div>
            </div>
            <form style={{ marginTop: 28, display: 'grid', gap: 0, border: `1px solid #333` }}>
              {['ИМЯ', 'EMAIL', 'БРЕНД / КОМПАНИЯ'].map((p, i) => (
                <input key={i} placeholder={p} style={{
                  padding: 18, background: 'transparent',
                  border: 0, borderBottom: `1px solid #333`,
                  color: paper, fontSize: 14, fontFamily: '"JetBrains Mono", monospace',
                  letterSpacing: 1, outline: 'none', width: '100%',
                }}/>
              ))}
              <textarea placeholder="О ЧЁМ ПРОЕКТ" rows={4} style={{
                padding: 18, background: 'transparent', border: 0,
                color: paper, fontSize: 14, fontFamily: '"JetBrains Mono", monospace',
                letterSpacing: 1, outline: 'none', resize: 'none', width: '100%',
              }}/>
              <button type="button" style={{
                padding: 20, background: paper, color: ink,
                border: 0, fontSize: 13, fontFamily: '"JetBrains Mono", monospace',
                textTransform: 'uppercase', letterSpacing: 1.5, cursor: 'pointer',
                fontWeight: 600,
              }}>[ ОТПРАВИТЬ → ]</button>
            </form>
          </div>
        </section>

      </div>
      <window.SiteFooter email="sale@anotherfashion.agency" year={2026} />
    </React.Fragment>
  );
};

window.HomeMobile = HomeMobile;
