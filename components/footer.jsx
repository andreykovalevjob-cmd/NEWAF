// SiteFooter — общий футер для всех страниц.
// Использование на странице: <window.SiteFooter email="sale@anotherfashion.agency" />
(function () {
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

  const FOOTER_LINKS = [
    { l: 'главная',   h: '/' },
    { l: 'аудит',     h: '/audit' },
    { l: 'портфолио', h: 'https://anotherfashion.agency/our-portfolio' },
    { l: 'контакты',  h: 'https://anotherfashion.agency/contact' },
  ];

  window.SiteFooter = function SiteFooter({ email = 'sale@anotherfashion.agency', year = 2026 }) {
    const ink   = 'var(--v2-ink, #fafafa)';
    const paper = 'var(--v2-paper, #0a0a0a)';
    const muted = 'var(--v2-muted, #707070)';
    const line  = 'var(--v2-line, #1f1f1f)';

    const isMobile = useIsMobile(720);
    const isWide   = !useIsMobile(1440);
    const pad  = isMobile ? 20 : (isWide ? 72 : 56);
    const wrap = { width: '100%', maxWidth: 1600, margin: '0 auto', padding: `0 ${pad}px` };

    // ── JivoChat
    React.useEffect(() => {
      if (document.querySelector('script[src*="jivo"]')) return;
      const s = document.createElement('script');
      s.src = '//code.jivo.ru/widget/isaZ2kUJKB';
      s.async = true;
      document.body.appendChild(s);
    }, []);

    return (
      <section style={{ background: paper, padding: '40px 0 0', borderTop: `1px solid ${line}` }}>
        <div style={wrap}>
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            gap: isMobile ? 20 : 0,
            fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: muted,
          }}>
            <div>
              <div style={{ wordBreak: 'break-word' }}>{email}</div>
              <div style={{ marginTop: 4 }}>{`// © another fashion agency, ${year}`}</div>
            </div>
            <div style={{
              display: 'flex', gap: isMobile ? 16 : 32,
              flexWrap: 'wrap',
            }}>
              {FOOTER_LINKS.map((l, i) => (
                <a key={i} href={l.h} style={{ color: 'inherit', textDecoration: 'none' }}>
                  [{l.l}]
                </a>
              ))}
            </div>
          </div>
        </div>
        <div style={{
          fontFamily: '"Archivo Black", sans-serif',
          fontSize: isMobile ? 'clamp(56px, 22vw, 120px)' : 'clamp(120px, 13vw, 220px)',
          letterSpacing: '-0.05em', lineHeight: 0.85,
          textAlign: 'center', marginTop: isMobile ? 32 : 60, color: ink,
          paddingBottom: 20, textTransform: 'lowercase',
          overflowWrap: 'anywhere',
        }}>another fashion.</div>
      </section>
    );
  };
})();
