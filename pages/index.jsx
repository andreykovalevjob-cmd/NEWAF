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
  const [form, setForm] = React.useState({ name: '', email: '', brand: '', message: '' });
  const [status, setStatus] = React.useState('idle');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.name) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: '/index' }),
      });
      const data = await res.json();
      setStatus(data.ok ? 'ok' : 'error');
    } catch { setStatus('error'); }
  };
  const isTablet = useIsMobile(1024) && !isMobile;
  const pad = isMobile ? 20 : 56;
  const sectionPadY = isMobile ? 56 : 96;

  const wrap = { width: '100%', maxWidth: 1240, margin: '0 auto', padding: `0 ${pad}px` };
  const monoLabel = {
    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
    fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: muted,
  };

  const capabilities = [
    { n: '01', t: 'D2C-стратегия', d: 'Запуск и развитие собственных каналов продаж для fashion- и beauty-брендов.' },
    { n: '02', t: 'Бренд-консалтинг', d: 'Позиционирование, архитектура, тон коммуникации, визуальная система.' },
    { n: '03', t: 'Performance', d: 'Контекст, таргет, SEO, SMM. Метрики и регулярная оптимизация.' },
    { n: '04', t: 'Контент', d: 'Лукбуки, видеореклама, кампейны, social-контент.' },
  ];

  const clients = [
    { label: '2MOOD' }, { label: 'LAVARICE' }, { label: 'GALLEON' },
    { label: 'AURA' }, { label: 'NOIR' }, { label: 'STRATA' },
  ];

  const works = [
    { client: '2MOOD BEAUTY', service: 'D2C launch', year: '2025' },
    { client: 'LAVARICE', service: 'Brand + e-com', year: '2024' },
    { client: 'GALLEON', service: 'Performance', year: '2024' },
  ];

  const capCols = isMobile ? '1fr' : (isTablet ? '1fr 1fr' : 'repeat(4, 1fr)');
  const workCols = isMobile ? '1fr' : (isTablet ? '1fr 1fr' : 'repeat(3, 1fr)');
  const clientCols = isMobile ? 'repeat(2, 1fr)' : (isTablet ? 'repeat(3, 1fr)' : 'repeat(6, 1fr)');

  const [menuOpen, setMenuOpen] = React.useState(false);

  const navLinks = [
    { label: '[аудит]', href: '/audit' },
    { label: '[о нас]', href: '/about' },
    { label: '[услуги]', href: '/services' },
    { label: '[оставить заявку]', href: '#contact' },
    { label: '[статьи/кейсы]', href: '/cases' },
    { label: '[инвесторам]', href: '/investors' },
    { label: '[портфолио]', href: '/our-portfolio' },
  ];

  return (
    <div style={{
      width: '100%', maxWidth: 1600, margin: '0 auto',
      background: paper, color: ink,
      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
      overflowX: 'hidden',
    }}>

      {/* TOP BANNER */}
      <div style={{
        background: ink, color: paper, textAlign: 'center',
        padding: '10px 20px', position: 'relative',
        fontFamily: '"JetBrains Mono", monospace', fontSize: 12, letterSpacing: 0.5,
      }}>
        ДЛЯ ЗАПИСИ НА ЭКСПРЕСС АУДИТ ОСТАВЬТЕ ЗАЯВКУ{' '}
        <a href="/audit#audit-form" style={{ color: paper, fontWeight: 700, textDecoration: 'underline' }}>ТУТ</a>
        <button onClick={() => {}} style={{
          position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
          background: 'transparent', border: 'none', color: paper, fontSize: 18, cursor: 'pointer',
        }}>×</button>
      </div>

      {/* HEADER */}
      <header style={{
        padding: `${isMobile ? 16 : 20}px ${pad}px`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: `1px solid ${line}`, gap: 16, position: 'relative',
      }}>
        <a href="/" style={{ textDecoration: 'none', color: ink }}>
          <div style={{
            fontFamily: '"Archivo Black", sans-serif',
            fontSize: 14, letterSpacing: '-0.02em', textTransform: 'uppercase',
            lineHeight: 1.2,
          }}>
            ANOTHER<br/>FASHION<br/>AGENCY
          </div>
        </a>

        {isMobile ? (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: 'transparent', border: `1px solid ${line}`,
            color: ink, padding: '8px 14px', cursor: 'pointer',
            fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
          }}>
            {menuOpen ? '✕' : '☰'}
          </button>
        ) : (
          <nav style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {navLinks.map((l, i) => (
              <a key={i} href={l.href} style={{
                color: ink, textDecoration: 'none',
                fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
                letterSpacing: 0.5,
              }}>{l.label}</a>
            ))}
            <a href="https://wa.me/74950000000" style={{
              padding: '8px 16px', border: `1px solid ${ink}`,
              color: ink, textDecoration: 'none',
              fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
              letterSpacing: 1,
            }}>WhatsApp</a>
          </nav>
        )}

        {isMobile && menuOpen && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0,
            background: paper, border: `1px solid ${line}`,
            zIndex: 100, padding: '16px 20px',
            display: 'flex', flexDirection: 'column', gap: 16,
          }}>
            {navLinks.map((l, i) => (
              <a key={i} href={l.href} onClick={() => setMenuOpen(false)} style={{
                color: ink, textDecoration: 'none',
                fontFamily: '"JetBrains Mono", monospace', fontSize: 13,
              }}>{l.label}</a>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section style={{ ...wrap, padding: `${isMobile ? 40 : 64}px ${pad}px ${isMobile ? 56 : 80}px` }}>
        <div style={{ ...monoLabel, marginBottom: isMobile ? 20 : 32, fontSize: isMobile ? 10 : 11 }}>
          {isMobile ? '>>> independent · since 2011' : '>>> independent agency · fashion · beauty · since 2011'}
        </div>
        <h1 style={{
          fontFamily: '"Archivo Black", sans-serif',
          fontSize: isMobile ? 'clamp(56px, 18vw, 96px)' : 'clamp(96px, 12.5vw, 200px)',
          lineHeight: 0.88, letterSpacing: '-0.05em', margin: 0, color: ink,
          fontWeight: 900, textTransform: 'lowercase',
        }}>another<br/>fashion.</h1>
        <div style={{
          marginTop: isMobile ? 32 : 48, display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
          gap: isMobile ? 24 : 32,
          borderTop: `1px solid ${line}`, paddingTop: isMobile ? 24 : 32, alignItems: 'start',
        }}>
          <p style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: isMobile ? 13 : 14, lineHeight: 1.55, color: ink, margin: 0,
            gridColumn: isMobile ? 'auto' : 'span 2', maxWidth: 640,
          }}>
            Независимое агентство для fashion- и beauty-брендов. Стратегия, D2C-каналы, бренд-коммуникация, performance. Делаем брендам собственную продажу — без зависимости от маркетплейсов.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: isMobile ? 'stretch' : 'flex-end' }}>
            <a href="#contact" style={{
              padding: '14px 22px', background: ink, color: paper,
              border: `1px solid ${ink}`, fontSize: 12,
              fontFamily: '"JetBrains Mono", monospace', textTransform: 'uppercase',
              letterSpacing: 1.5, fontWeight: 600, textDecoration: 'none', textAlign: 'center',
            }}>[ начать проект → ]</a>
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
          animation: 'marquee 30s linear infinite',
        }}>
          {Array.from({length: 8}).map((_, i) => (
            <span key={i}>STRATEGY · D2C · BRAND · PERFORMANCE · CONTENT · 2011→ &nbsp;&nbsp;</span>
          ))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
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
                lineHeight: 0.98, letterSpacing: '-0.03em', margin: 0, color: ink,
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

      {/* CAPABILITIES */}
      <section style={{ padding: `${sectionPadY}px 0`, borderTop: `1px solid ${line}` }}>
        <div style={wrap}>
          <div style={{
            display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '120px 1fr',
            gap: isMobile ? 16 : 32, marginBottom: isMobile ? 32 : 56, alignItems: 'start',
          }}>
            <div style={monoLabel}>[02] capabilities</div>
            <h2 style={{
              fontFamily: '"Archivo Black", sans-serif',
              fontSize: isMobile ? 48 : 'clamp(64px, 7vw, 112px)',
              lineHeight: 0.92, letterSpacing: '-0.04em', margin: 0, color: ink,
              fontWeight: 900, textTransform: 'uppercase',
            }}>Что мы<br/>делаем.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: capCols }}>
            {capabilities.map((c) => (
              <div key={c.n} style={{
                border: `1px solid ${line}`, padding: isMobile ? '24px 20px' : '32px 24px',
                background: paper, minHeight: isMobile ? 'auto' : 300,
              }}>
                <div style={{
                  fontFamily: '"Archivo Black", sans-serif',
                  fontSize: isMobile ? 48 : 64, lineHeight: 1, color: ink,
                }}>{c.n}</div>
                <div style={{
                  fontFamily: '"Archivo Black", sans-serif', fontSize: isMobile ? 16 : 18,
                  textTransform: 'uppercase', marginTop: isMobile ? 16 : 28,
                  lineHeight: 1.15, letterSpacing: '-0.01em', color: ink,
                }}>{c.t}</div>
                <div style={{ fontSize: isMobile ? 13 : 12, lineHeight: 1.55, color: muted, marginTop: 12 }}>{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section style={{ padding: `${sectionPadY}px 0`, background: '#050505', borderTop: `1px solid ${line}` }}>
        <div style={wrap}>
          <div style={{
            display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '120px 1fr',
            gap: isMobile ? 16 : 32, marginBottom: isMobile ? 32 : 56, alignItems: 'start',
          }}>
            <div style={monoLabel}>[03] selected work</div>
            <h2 style={{
              fontFamily: '"Archivo Black", sans-serif',
              fontSize: isMobile ? 48 : 'clamp(64px, 7vw, 112px)',
              lineHeight: 0.92, letterSpacing: '-0.04em', margin: 0, color: ink,
              fontWeight: 900, textTransform: 'uppercase',
            }}>Кейсы<br/>2024 — 2025.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: workCols, gap: 0 }}>
            {works.map((w, i) => (
              <div key={i} style={{ border: `1px solid ${line}` }}>
                <div style={{
                  width: '100%', aspectRatio: '4 / 5', background: '#111',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ ...monoLabel, color: '#333', fontSize: 13 }}>{w.client}</span>
                </div>
                <div style={{
                  padding: isMobile ? '16px 18px' : '20px 24px',
                  borderTop: `1px solid ${line}`,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10,
                }}>
                  <div>
                    <div style={{
                      fontFamily: '"Archivo Black", sans-serif', fontSize: 16,
                      textTransform: 'uppercase', letterSpacing: '-0.01em', color: ink,
                    }}>{w.client}</div>
                    <div style={{ ...monoLabel, marginTop: 4, color: muted }}>{w.service}</div>
                  </div>
                  <div style={{ ...monoLabel, color: muted }}>{w.year}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section style={{ padding: `${isMobile ? 40 : 64}px 0`, borderTop: `1px solid ${line}` }}>
        <div style={wrap}>
          <div style={{ ...monoLabel, marginBottom: isMobile ? 20 : 32 }}>{`// our clients`}</div>
          <div style={{ display: 'grid', gridTemplateColumns: clientCols, borderTop: `1px solid ${line}` }}>
            {clients.map((c, i) => (
              <div key={i} style={{
                padding: isMobile ? '24px 12px' : '32px 16px',
                borderBottom: `1px solid ${line}`, borderRight: `1px solid ${line}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                minHeight: isMobile ? 80 : 100,
              }}>
                <span style={{
                  fontFamily: '"Archivo Black", sans-serif',
                  fontSize: isMobile ? 13 : 15, letterSpacing: 1,
                  color: muted, textTransform: 'uppercase',
                }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / CONTACT */}
      <section id="contact" style={{ background: ink, color: paper, padding: `${isMobile ? 72 : 120}px 0` }}>
        <div style={wrap}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr',
            gap: isMobile ? 40 : 80, alignItems: 'start',
          }}>
            <div>
              <div style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
                letterSpacing: 2, textTransform: 'uppercase', color: '#666', marginBottom: isMobile ? 14 : 24,
              }}>{`>>> начать проект`}</div>
              <h2 style={{
                fontFamily: '"Archivo Black", sans-serif',
                fontSize: isMobile ? 'clamp(48px, 14vw, 80px)' : 'clamp(72px, 9vw, 144px)',
                lineHeight: 0.88, fontWeight: 900, letterSpacing: '-0.05em', margin: 0,
                textTransform: 'uppercase', color: paper,
              }}>Напишите<br/>нам.</h2>
              <p style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 13,
                color: '#666', maxWidth: 380, marginTop: isMobile ? 20 : 32, lineHeight: 1.55,
              }}>Расскажите о вашем бренде — мы соберём команду и предложим стратегию за 5 рабочих дней.</p>
              <div style={{
                marginTop: isMobile ? 28 : 40, paddingTop: 24, borderTop: '1px solid #333',
                display: 'grid', gap: 14,
                fontFamily: '"JetBrains Mono", monospace', fontSize: 12, wordBreak: 'break-word',
              }}>
                <div><span style={{ color: '#666' }}>email →</span> sale@anotherfashion.agency</div>
                <div><span style={{ color: '#666' }}>tg →</span> @anotherfashion</div>
              </div>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 0, alignSelf: isMobile ? 'stretch' : 'end', border: '1px solid #333' }}>
              <input placeholder="ИМЯ" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={{
                padding: 18, background: 'transparent', border: 0, borderBottom: '1px solid #333',
                color: paper, fontSize: 12, fontFamily: '"JetBrains Mono", monospace',
                letterSpacing: 1, outline: 'none', width: '100%',
              }}/>
              <input placeholder="EMAIL" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={{
                padding: 18, background: 'transparent', border: 0, borderBottom: '1px solid #333',
                color: paper, fontSize: 12, fontFamily: '"JetBrains Mono", monospace',
                letterSpacing: 1, outline: 'none', width: '100%',
              }}/>
              <input placeholder="БРЕНД / КОМПАНИЯ" value={form.brand} onChange={e => setForm(f => ({ ...f, brand: e.target.value }))} style={{
                padding: 18, background: 'transparent', border: 0, borderBottom: '1px solid #333',
                color: paper, fontSize: 12, fontFamily: '"JetBrains Mono", monospace',
                letterSpacing: 1, outline: 'none', width: '100%',
              }}/>
              <textarea placeholder="О ЧЁМ ПРОЕКТ" rows={4} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} style={{
                padding: 18, background: 'transparent', border: 0, borderBottom: '1px solid #333',
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

      {/* FOOTER */}
      <section style={{ background: paper, padding: '40px 0 0', borderTop: `1px solid ${line}` }}>
        <div style={wrap}>
          <div style={{
            display: 'flex', flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between', gap: isMobile ? 20 : 0,
            fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: muted,
          }}>
            <div>
              <div style={{ wordBreak: 'break-word' }}>sale@anotherfashion.agency</div>
              <div style={{ marginTop: 4 }}>// © another fashion agency, 2025</div>
            </div>
            <div style={{ display: 'flex', gap: isMobile ? 16 : 32, flexWrap: 'wrap' }}>
              {navLinks.map((l, i) => (
                <a key={i} href={l.href} style={{ color: 'inherit', textDecoration: 'none' }}>{l.label}</a>
              ))}
            </div>
          </div>
        </div>
        <div style={{
          fontFamily: '"Archivo Black", sans-serif',
          fontSize: isMobile ? 'clamp(56px, 22vw, 120px)' : 'clamp(120px, 13vw, 220px)',
          letterSpacing: '-0.05em', lineHeight: 0.85, textAlign: 'center',
          marginTop: isMobile ? 32 : 60, color: ink, paddingBottom: 20, textTransform: 'lowercase',
        }}>another fashion.</div>
      </section>
    </div>
  );
};

window.Home = Home;
