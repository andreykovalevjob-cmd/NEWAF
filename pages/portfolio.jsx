const PortfolioPage = () => {
  const ink   = 'var(--v2-ink, #fafafa)';
  const paper = 'var(--v2-paper, #0a0a0a)';
  const muted = 'var(--v2-muted, #707070)';
  const line  = 'var(--v2-line, #1f1f1f)';

  const useIsMobile = (bp = 720) => {
    const [m, setM] = React.useState(() => typeof window !== 'undefined' && window.innerWidth < bp);
    React.useEffect(() => {
      const on = () => setM(window.innerWidth < bp);
      window.addEventListener('resize', on);
      return () => window.removeEventListener('resize', on);
    }, [bp]);
    return m;
  };

  const isMobile = useIsMobile(720);
  const isWide = !useIsMobile(1440);
  const pad = isMobile ? 20 : (isWide ? 72 : 56);

  const logos = [
    { src: '/assets/logos/12storeez.webp',      alt: '12 STOREEZ' },
    { src: '/assets/logos/2mood.webp',           alt: '2MOOD' },
    { src: '/assets/logos/lavarice.webp',        alt: 'LAVARICE' },
    { src: '/assets/logos/belleyou.webp',        alt: 'BELLE YOU' },
    { src: '/assets/logos/planta.webp',          alt: 'PLANTA' },
    { src: '/assets/logos/ageofinnocence.webp',  alt: 'AGE OF INNOCENCE' },
    { src: '/assets/logos/thekos.webp',          alt: 'THE KOS' },
    { src: '/assets/logos/pervert.webp',         alt: 'PERVERT' },
    { src: '/assets/logos/yuliawave.webp',       alt: 'YULIAWAVE' },
    { src: '/assets/logos/monochrome.webp',      alt: 'MONOCHROME' },
    { src: '/assets/logos/roseslace.webp',       alt: 'ROSES & LACE' },
    { src: '/assets/logos/rasario.webp',         alt: 'RASARIO' },
    { src: '/assets/logos/namelazz.webp',        alt: 'NAMELAZZ' },
    { src: '/assets/logos/nudestory.webp',       alt: 'NUDE STORY' },
    { src: '/assets/logos/pangaia.webp',         alt: 'PANGAIA' },
    { src: '/assets/logos/kalmanovich.webp',     alt: 'KALMANOVICH' },
    { src: '/assets/logos/davidkoma.webp',       alt: 'DAVID KOMA' },
    { src: '/assets/logos/awake.webp',           alt: 'AWAKE' },
    { src: '/assets/logos/annbeauty.webp',       alt: 'ANN BEAUTY' },
    { src: '/assets/logos/drviki.webp',          alt: 'DR.VIKI' },
    { src: '/assets/logos/tatabronc.webp',       alt: 'TATA BRONC' },
    { src: '/assets/logos/lnfamily.webp',        alt: 'LN FAMILY' },
    { src: '/assets/logos/ulyana-sergeenko.webp', alt: 'ULYANA SERGEENKO' },
    { src: '/assets/logos/azi.webp',               alt: 'AZI' },
  ];

  const mono = { fontFamily: '"JetBrains Mono", ui-monospace, monospace', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase' };
  const wrap = { width: '100%', maxWidth: 1600, margin: '0 auto', padding: `0 ${pad}px` };

  return (
    <React.Fragment>
      <window.SiteHeader active="portfolio" />

      <div style={{ background: paper, color: ink, minHeight: '100vh' }}>

        {/* HERO */}
        <section style={{ ...wrap, padding: `${isMobile ? 48 : 80}px ${pad}px ${isMobile ? 40 : 64}px` }}>
          <div style={{ ...mono, color: muted, marginBottom: isMobile ? 16 : 24 }}>// портфолио</div>
          <h1 style={{
            fontFamily: '"Archivo Black", sans-serif', fontWeight: 900,
            fontSize: isMobile ? 'clamp(48px, 14vw, 80px)' : 'clamp(80px, 10vw, 160px)',
            lineHeight: 0.92, letterSpacing: '-0.05em', margin: 0,
            textTransform: 'uppercase', color: ink,
          }}>БРЕНДЫ,<br/>С КОТОРЫМИ<br/>МЫ РАБОТАЕМ.</h1>
          <div style={{
            marginTop: isMobile ? 24 : 40,
            borderTop: `1px solid ${line}`, paddingTop: isMobile ? 20 : 28,
            ...mono, color: muted,
          }}>
            {logos.length}+ брендов в портфолио · fashion, beauty, D2C
          </div>
        </section>

        {/* ЛОГОТИПЫ */}
        <section style={{ borderTop: `1px solid ${line}`, background: '#ffffff', padding: `${isMobile ? 56 : 96}px 0` }}>
          <div style={{ ...wrap, padding: `0 ${isMobile ? 20 : 64}px`, maxWidth: 1760 }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              columnGap: isMobile ? 8 : 12,
              rowGap: isMobile ? 16 : 24,
            }}>
              {logos.map((l, i) => (
                <div key={i} style={{
                  background: '#fff',
                  border: '1px solid #ebebeb',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: isMobile ? '20px 16px' : '32px 24px',
                  height: isMobile ? 140 : 200,
                }}>
                  <img
                    src={l.src} alt={l.alt}
                    style={{ maxWidth: '100%', maxHeight: isMobile ? 80 : 120, objectFit: 'contain', filter: 'grayscale(1)' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: ink, color: paper, padding: `${isMobile ? 64 : 112}px 0` }}>
          <div style={{ ...wrap }}>
            <div style={{ ...mono, color: '#666', marginBottom: isMobile ? 14 : 24 }}>// работать с нами</div>
            <h2 style={{
              fontFamily: '"Archivo Black", sans-serif', fontWeight: 900,
              fontSize: isMobile ? 'clamp(36px, 11vw, 64px)' : 'clamp(56px, 7vw, 112px)',
              lineHeight: 0.9, letterSpacing: '-0.05em', margin: 0,
              textTransform: 'lowercase', color: paper,
            }}>ваш бренд<br/>следующий.</h2>
            <div style={{ marginTop: isMobile ? 28 : 40, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a href="/audit.html" style={{
                padding: '16px 28px', background: paper, color: ink,
                fontFamily: '"JetBrains Mono", monospace', fontSize: 12,
                textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600,
                textDecoration: 'none', border: `1px solid ${paper}`,
              }}>[ получить аудит → ]</a>
              <a href="/contact.html" style={{
                padding: '16px 28px', color: paper,
                fontFamily: '"JetBrains Mono", monospace', fontSize: 12,
                textTransform: 'uppercase', letterSpacing: 1.5,
                textDecoration: 'none', border: '1px solid #333',
              }}>[ написать нам ]</a>
            </div>
          </div>
        </section>

      </div>

      <window.SiteFooter email="sale@anotherfashion.agency" year={2026} />
    </React.Fragment>
  );
};

window.PortfolioPage = PortfolioPage;
