// ContactPage — страница контактов / заявки.
// Визуальная система: paper #0a0a0a, Archivo Black + JetBrains Mono, hairline #1f1f1f.

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

const ContactPage = () => {
  const ink   = 'var(--v2-ink, #fafafa)';
  const paper = 'var(--v2-paper, #0a0a0a)';
  const muted = 'var(--v2-muted, #707070)';
  const line  = 'var(--v2-line, #1f1f1f)';

  const { isMobile, isTablet } = useViewport();
  const pad = isMobile ? 20 : (isTablet ? 36 : 56);

  const wrap = {
    width: '100%', maxWidth: 1600, margin: '0 auto', padding: `0 ${pad}px`,
  };
  const monoLabel = {
    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
    fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: muted,
  };

  // form state
  const [form, setForm] = React.useState({});
  const [status, setStatus] = React.useState('idle'); // idle | sending | ok | error

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          source: '/contact',
          date: new Date().toLocaleString('ru-RU'),
        }),
      });
      setStatus(res.ok ? 'ok' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const inputStyle = {
    width: '100%',
    background: '#141414',
    border: '1px solid #333333',
    borderRadius: 2,
    color: ink,
    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
    fontSize: isMobile ? 14 : 15,
    padding: '14px 16px',
    outline: 'none',
    transition: 'border-color 0.2s',
    display: 'block',
  };

  const labelStyle = {
    ...monoLabel,
    display: 'block',
    marginBottom: 6,
    marginTop: 28,
  };

  return (
    <div style={{
      width: '100%', maxWidth: 1600, margin: '0 auto',
      background: paper, color: ink,
      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
      overflowX: 'hidden',
      minHeight: '100vh',
    }}>

      {typeof window.SiteHeader !== 'undefined' && <window.SiteHeader active="contacts" />}

      {/* HERO */}
      <section style={{ padding: `${isMobile ? 64 : 96}px 0 ${isMobile ? 48 : 72}px` }}>
        <div style={wrap}>
          <div style={{ ...monoLabel, marginBottom: 20 }}>[контакты]</div>
          <h1 style={{
            fontFamily: '"Archivo Black", "Helvetica Neue", sans-serif',
            fontSize: isMobile ? 'clamp(40px, 11vw, 60px)' : 'clamp(64px, 8vw, 120px)',
            lineHeight: 0.92,
            letterSpacing: '-0.04em',
            margin: 0,
            color: ink,
            fontWeight: 900,
            textTransform: 'uppercase',
          }}>
            Оставить<br />заявку
          </h1>
        </div>
      </section>

      <div style={{ borderTop: `1px solid ${line}` }} />

      {/* FORM + CONTACTS */}
      <section style={{ padding: `${isMobile ? 48 : 80}px 0 ${isMobile ? 64 : 120}px` }}>
        <div style={{
          ...wrap,
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 56 : 80,
          alignItems: 'start',
        }}>

          {/* LEFT — FORM */}
          <div>
            <div style={{ ...monoLabel, marginBottom: 24 }}>заполнить форму</div>

            {status === 'ok' ? (
              <div style={{
                border: `1px solid ${line}`,
                padding: 32,
              }}>
                <div style={{
                  fontFamily: '"Archivo Black", sans-serif',
                  fontSize: isMobile ? 22 : 28,
                  textTransform: 'uppercase',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  marginBottom: 12,
                }}>
                  Заявка принята.
                </div>
                <div style={{ ...monoLabel, color: muted, textTransform: 'none', letterSpacing: 0, fontSize: 13 }}>
                  Свяжемся с вами в ближайшее время.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <label style={labelStyle}>имя</label>
                <input
                  style={inputStyle}
                  name="name"
                  placeholder="Ваше имя"
                  onChange={handleChange}
                  onFocus={e => e.target.style.borderColor = '#707070'}
                  onBlur={e => e.target.style.borderColor = '#333333'}
                />

                <label style={labelStyle}>телефон</label>
                <input
                  style={inputStyle}
                  name="phone"
                  placeholder="+7 xxx xxx xx xx"
                  onChange={handleChange}
                  onFocus={e => e.target.style.borderColor = '#707070'}
                  onBlur={e => e.target.style.borderColor = '#333333'}
                />

                <label style={labelStyle}>email</label>
                <input
                  style={inputStyle}
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  onChange={handleChange}
                  onFocus={e => e.target.style.borderColor = '#707070'}
                  onBlur={e => e.target.style.borderColor = '#333333'}
                />

                <label style={labelStyle}>бренд / компания</label>
                <input
                  style={inputStyle}
                  name="brand"
                  placeholder="Название бренда"
                  onChange={handleChange}
                  onFocus={e => e.target.style.borderColor = '#707070'}
                  onBlur={e => e.target.style.borderColor = '#333333'}
                />

                <label style={labelStyle}>сообщение</label>
                <textarea
                  style={{ ...inputStyle, resize: 'none', minHeight: 100 }}
                  name="message"
                  rows={4}
                  placeholder="Расскажите о задаче..."
                  onChange={handleChange}
                  onFocus={e => e.target.style.borderColor = '#707070'}
                  onBlur={e => e.target.style.borderColor = '#333333'}
                />

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  style={{
                    marginTop: 40,
                    background: ink,
                    color: paper,
                    border: 'none',
                    padding: isMobile ? '16px 32px' : '18px 48px',
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: 13,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    cursor: status === 'sending' ? 'wait' : 'pointer',
                    opacity: status === 'sending' ? 0.6 : 1,
                    transition: 'opacity 0.2s',
                  }}
                >
                  {status === 'sending' ? 'Отправка...' : 'Отправить →'}
                </button>

                {status === 'error' && (
                  <p style={{ ...monoLabel, marginTop: 16, color: '#e55' }}>
                    Ошибка. Попробуйте ещё раз или напишите в WhatsApp.
                  </p>
                )}
              </form>
            )}
          </div>

          {/* RIGHT — CONTACTS */}
          <div>
            <div style={{ ...monoLabel, marginBottom: 24 }}>или напишите напрямую</div>

            <a
              href="https://api.whatsapp.com/send/?phone=79895921739&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                border: `1px solid ${line}`,
                padding: isMobile ? 24 : 32,
                color: ink,
                textDecoration: 'none',
                marginBottom: 16,
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#fafafa'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#1f1f1f'}
            >
              <div style={{ ...monoLabel, marginBottom: 12 }}>WhatsApp</div>
              <div style={{
                fontFamily: '"Archivo Black", sans-serif',
                fontSize: isMobile ? 22 : 28,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}>
                Написать<br />в WhatsApp →
              </div>
            </a>

            <div style={{ border: `1px solid ${line}`, padding: isMobile ? 24 : 32, marginBottom: 16 }}>
              <div style={{ ...monoLabel, marginBottom: 12 }}>email</div>
              <a
                href="mailto:audit@anotherfashion.agency"
                style={{
                  color: ink,
                  textDecoration: 'none',
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: isMobile ? 13 : 14,
                  letterSpacing: 0.5,
                }}
              >
                audit@anotherfashion.agency
              </a>
            </div>

            <div style={{ border: `1px solid ${line}`, padding: isMobile ? 24 : 32 }}>
              <div style={{ ...monoLabel, marginBottom: 12 }}>режим работы</div>
              <div style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: isMobile ? 13 : 14,
                lineHeight: 1.7,
                color: ink,
              }}>
                Пн–Пт: 10:00 — 19:00 МСК<br />
                Ответим в течение рабочего дня
              </div>
            </div>
          </div>

        </div>
      </section>

      <div style={{ borderTop: `1px solid ${line}` }} />

      {typeof window.SiteFooter !== 'undefined' && <window.SiteFooter />}

    </div>
  );
};

window.ContactPage = ContactPage;
