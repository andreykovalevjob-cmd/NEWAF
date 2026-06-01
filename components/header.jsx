// SiteHeader — общая шапка для всех страниц (desktop + mobile overlay).
// Использование: <window.SiteHeader active="audit" />

(function () {
  const NAV = [
    { id: 'audit',     l: 'аудит',         h: '/audit' },
    { id: 'about',     l: 'о нас',         h: '/company' },
    { id: 'services',  l: 'услуги',        h: '/Services', dropdown: [
      { l: 'Вывод на зарубежные рынки',    h: '/worldwide' },
      { l: 'Маркетинг для fashion бренда', h: '/marketing' },
      { l: 'Создание контента',            h: '/content-creation' },
      { l: 'Запуск интернет-магазина',     h: '/web' },
      { l: 'Построение команды (HR)',      h: '/hrr' },
    ]},
    { id: 'portfolio', l: 'портфолио',     h: 'https://anotherfashion.agency/our-portfolio' },
    { id: 'contacts',  l: 'контакты',      h: 'https://anotherfashion.agency/contact' },
  ];
  const WHATSAPP = 'https://api.whatsapp.com/send/?phone=79895921739';

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

  window.SiteHeader = function SiteHeader({ active }) {
    const ink   = 'var(--v2-ink, #fafafa)';
    const paper = 'var(--v2-paper, #0a0a0a)';
    const muted = 'var(--v2-muted, #707070)';
    const line  = 'var(--v2-line, #1f1f1f)';

    const isMobile = useIsMobile(720);
    const isWide   = !useIsMobile(1440);
    const pad = isMobile ? 20 : (isWide ? 72 : 56);
    const [openDrop, setOpenDrop] = React.useState(null);
    const [menu, setMenu] = React.useState(false);

    const monoLabel = {
      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
      fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: muted,
    };
    const mono = monoLabel;
    const display = {
      fontFamily: '"Archivo Black", "Helvetica Neue", sans-serif',
      fontWeight: 900,
    };

    return (
      <React.Fragment>
        <header style={{
          width: '100%', maxWidth: 1600, margin: '0 auto',
          padding: `${isMobile ? 16 : 22}px ${pad}px`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderBottom: `1px solid ${line}`, gap: 16, background: paper,
          position: 'sticky', top: 0, zIndex: 60,
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <a href="/" style={{
              fontFamily: '"Archivo Black", sans-serif',
              fontSize: isMobile ? 16 : 18,
              letterSpacing: '-0.04em', textTransform: 'lowercase',
              color: ink, textDecoration: 'none',
            }}>another fashion</a>
            {!isMobile && <span style={{ ...monoLabel, fontSize: 10 }}>/agency</span>}
          </div>

          {!isMobile ? (
            <nav style={{
              display: 'flex', gap: 22, alignItems: 'center',
              ...monoLabel, color: ink, fontSize: 11,
            }}>
              {NAV.map((n, i) => (
                n.dropdown ? (
                  <span key={i}
                    onMouseEnter={() => setOpenDrop(i)}
                    onMouseLeave={() => setOpenDrop(null)}
                    style={{ position: 'relative' }}
                  >
                    <a href={n.h} style={{
                      color: 'inherit', textDecoration: (active === n.id && n.id !== 'audit') ? 'underline' : 'none',
                      textUnderlineOffset: 5,
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                    }}>[{n.l}]<span style={{ fontSize: 8, opacity: 0.5 }}>▾</span></a>
                    {openDrop === i && (
                      <div style={{
                        position: 'absolute', top: '100%', left: -12, marginTop: 0,
                        background: paper, border: `1px solid ${line}`,
                        minWidth: 280, padding: '6px 0', zIndex: 80,
                        boxShadow: '0 12px 36px rgba(0,0,0,0.6)',
                      }}>
                        {n.dropdown.map((d, j) => (
                          <a key={j} href={d.h} style={{
                            display: 'block', padding: '10px 18px',
                            color: ink, fontSize: 11, textTransform: 'none',
                            letterSpacing: 0.5, textDecoration: 'none',
                            fontFamily: '"JetBrains Mono", monospace',
                          }}>· {d.l}</a>
                        ))}
                      </div>
                    )}
                  </span>
                ) : (
                  <a key={i} href={n.h} style={{
                    color: 'inherit',
                    textDecoration: (active === n.id && n.id !== 'audit') ? 'underline' : 'none',
                    textUnderlineOffset: 5,
                  }}>[{n.l}]</a>
                )
              ))}
              <a href={WHATSAPP} target="_blank" rel="noopener" style={{
                padding: '8px 14px', background: ink, color: paper,
                fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
                letterSpacing: 1.2, textTransform: 'uppercase',
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
                gap: 6, fontWeight: 600,
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%', background: '#25d366',
                }} />
                WhatsApp
              </a>
            </nav>
          ) : (
            <button onClick={() => setMenu(true)} style={{
              padding: '8px 14px', border: `1px solid ${line}`, color: ink,
              background: 'transparent', ...monoLabel, fontSize: 10, cursor: 'pointer',
            }}>[ меню ]</button>
          )}
        </header>

        {/* Мобильный overlay-навигатор */}
        {isMobile && menu && (
          <div style={{
            position: 'fixed', inset: 0, background: paper, zIndex: 100,
            display: 'flex', flexDirection: 'column', overflowY: 'auto',
          }}>
            <div style={{
              padding: `16px ${pad}px`, borderBottom: `1px solid ${line}`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              position: 'sticky', top: 0, background: paper,
            }}>
              <div style={{ ...display, fontSize: 17, textTransform: 'lowercase', letterSpacing: '-0.04em', color: ink }}>
                another fashion.
              </div>
              <button onClick={() => setMenu(false)} aria-label="закрыть" style={{
                background: 'transparent', border: `1px solid ${line}`, color: ink,
                padding: '8px 14px', ...mono, fontSize: 10, cursor: 'pointer',
              }}>[ закрыть × ]</button>
            </div>
            <nav style={{ padding: `28px ${pad}px 20px`, display: 'grid', gap: 0 }}>
              {NAV.map((n, i) => (
                <React.Fragment key={i}>
                  {n.dropdown ? (
                    <button onClick={() => setOpenDrop(openDrop === i ? null : i)} style={{
                      background: 'transparent', border: 0, color: ink, cursor: 'pointer',
                      padding: '14px 0', textAlign: 'left',
                      borderBottom: `1px solid ${line}`,
                      ...display, fontSize: 22, letterSpacing: '-0.02em', textTransform: 'lowercase',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    }}>
                      <span>{n.l}.</span>
                      <span style={{ ...mono, fontSize: 11, color: muted }}>
                        {openDrop === i ? '−' : `+ ${n.dropdown.length}`}
                      </span>
                    </button>
                  ) : (
                    <a href={n.h} onClick={() => setMenu(false)} style={{
                      color: ink, textDecoration: 'none', padding: '14px 0',
                      borderBottom: `1px solid ${line}`,
                      ...display, fontSize: 22, letterSpacing: '-0.02em', textTransform: 'lowercase',
                    }}>{n.l}.</a>
                  )}
                  {n.dropdown && openDrop === i && (
                    <div style={{ display: 'grid', padding: '8px 0' }}>
                      {n.dropdown.map((d, j) => (
                        <a key={j} href={d.h} onClick={() => setMenu(false)} style={{
                          color: muted, textDecoration: 'none', padding: '10px 0 10px 14px',
                          ...mono, fontSize: 11, letterSpacing: 0.5, textTransform: 'none',
                          borderBottom: `1px solid ${line}`,
                        }}>· {d.l}</a>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              ))}
              <a href={WHATSAPP} target="_blank" rel="noopener" style={{
                marginTop: 24, padding: '16px 22px', background: ink, color: paper,
                ...mono, fontSize: 12, letterSpacing: 1.5, textDecoration: 'none',
                textAlign: 'center', fontWeight: 600,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#25d366' }} />
                [ WhatsApp → ]
              </a>
            </nav>
            <div style={{
              marginTop: 'auto', padding: `24px ${pad}px`,
              borderTop: `1px solid ${line}`,
              ...mono, fontSize: 11, color: muted,
            }}>
              sale@anotherfashion.agency<br/>// © another fashion agency, 2026
            </div>
          </div>
        )}
      </React.Fragment>
    );
  };
})();