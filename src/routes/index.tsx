import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [{ title: 'Trabzon Dijital Ajans — İşletmenizi Zirveye Taşıyoruz' }],
    links: [],
    scripts: [
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',
        defer: true,
      },
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js',
        defer: true,
      },
    ],
  }),
  component: LandingPage,
})

function LandingPage() {
  useEffect(() => {
    // Wait for GSAP scripts to load
    const initGSAP = () => {
      const gsap = (window as any).gsap
      const ScrollTrigger = (window as any).ScrollTrigger
      if (!gsap || !ScrollTrigger) {
        setTimeout(initGSAP, 100)
        return
      }

      gsap.registerPlugin(ScrollTrigger)

      // Hero animations
      const tl = gsap.timeline()
      tl.fromTo(
        '.hero-badge',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      )
        .fromTo(
          '.hero-title',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.3',
        )
        .fromTo(
          '.hero-sub',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          '-=0.4',
        )
        .fromTo(
          '.hero-cta',
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.5)' },
          '-=0.3',
        )

      // Floating particles animation
      gsap.to('.particle', {
        y: 'random(-30, 30)',
        x: 'random(-20, 20)',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: { each: 0.3, from: 'random' },
      })

      // Gradient orbs
      gsap.to('.orb-1', {
        x: 60,
        y: -40,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      gsap.to('.orb-2', {
        x: -50,
        y: 50,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // About section
      gsap.fromTo(
        '.about-content',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-section',
            start: 'top 75%',
          },
        },
      )
      gsap.fromTo(
        '.about-stats',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-section',
            start: 'top 75%',
          },
        },
      )

      // Discount banner
      gsap.fromTo(
        '.discount-banner',
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '.pricing-section',
            start: 'top 80%',
          },
        },
      )

      // Pricing cards
      gsap.fromTo(
        '.pricing-card',
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.pricing-cards',
            start: 'top 80%',
          },
        },
      )

      // Portfolio cards
      gsap.fromTo(
        '.portfolio-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.portfolio-section',
            start: 'top 75%',
          },
        },
      )

      // Contact section
      gsap.fromTo(
        '.contact-content',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 80%',
          },
        },
      )

      // Hover animations on pricing cards
      document.querySelectorAll('.pricing-card').forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -8,
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out',
          })
        })
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: 'power2.out' })
        })
      })

      // Hover on portfolio cards
      document.querySelectorAll('.portfolio-card').forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -6,
            scale: 1.01,
            duration: 0.3,
            ease: 'power2.out',
          })
        })
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: 'power2.out' })
        })
      })

      // WhatsApp button pulse
      gsap.to('.wa-btn', {
        boxShadow: '0 0 30px rgba(37,211,102,0.6)',
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Discount banner sparkle
      gsap.to('.discount-banner', {
        boxShadow: '0 0 40px rgba(251,146,60,0.4)',
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Nav scroll effect
      const nav = document.querySelector('.main-nav')
      ScrollTrigger.create({
        start: 'top -80',
        onUpdate: (self: any) => {
          if (nav) {
            ;(nav as HTMLElement).style.background =
              self.progress > 0
                ? 'rgba(10,10,20,0.95)'
                : 'rgba(10,10,20,0.0)'
          }
        },
      })
    }

    initGSAP()
  }, [])

  return (
    <div
      style={{
        background: '#080818',
        color: '#e2e8f0',
        fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
        overflowX: 'hidden',
        minHeight: '100vh',
      }}
    >
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        .gradient-text {
          background: linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #f472b6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .orange-text {
          background: linear-gradient(135deg, #fb923c, #f97316);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .neon-border {
          border: 1px solid rgba(56,189,248,0.3);
        }
        .neon-border:hover {
          border-color: rgba(56,189,248,0.7);
          box-shadow: 0 0 20px rgba(56,189,248,0.15);
        }
        .glass {
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .btn-primary {
          background: linear-gradient(135deg, #38bdf8, #818cf8);
          color: #fff;
          border: none;
          padding: 14px 28px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.2s;
          text-decoration: none;
          display: inline-block;
        }
        .btn-primary:hover { opacity: 0.9; transform: translateY(-2px); }
        .btn-outline {
          background: transparent;
          color: #38bdf8;
          border: 2px solid #38bdf8;
          padding: 12px 28px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          display: inline-block;
        }
        .btn-outline:hover {
          background: rgba(56,189,248,0.12);
          transform: translateY(-2px);
        }
        .section-title {
          font-size: clamp(28px, 5vw, 42px);
          font-weight: 800;
          text-align: center;
          margin-bottom: 16px;
        }
        .section-sub {
          text-align: center;
          color: #94a3b8;
          font-size: 17px;
          max-width: 560px;
          margin: 0 auto 56px;
          line-height: 1.7;
        }
        .container {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .grid-3 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }
        .grid-2 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 32px;
        }
        @media (max-width: 768px) {
          .grid-3, .grid-2 { grid-template-columns: 1fr; }
          .hero-btns { flex-direction: column; align-items: center; }
          .nav-links { display: none; }
        }
        .tag {
          background: rgba(56,189,248,0.12);
          color: #38bdf8;
          border: 1px solid rgba(56,189,248,0.3);
          padding: 4px 12px;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 600;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 0;
          font-size: 14px;
          color: #cbd5e1;
        }
        .check-icon { color: #38bdf8; font-size: 16px; }
        .strikethrough {
          text-decoration: line-through;
          color: #64748b;
          font-size: 16px;
        }
        .price-new {
          font-size: 36px;
          font-weight: 900;
          color: #f8fafc;
        }
        .popular-badge {
          background: linear-gradient(135deg, #fb923c, #f97316);
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          padding: 4px 14px;
          border-radius: 50px;
          letter-spacing: 0.5px;
        }
        .portfolio-img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          border-radius: 12px 12px 0 0;
          background: linear-gradient(135deg, #1e293b, #0f172a);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .wa-btn {
          background: linear-gradient(135deg, #25d366, #128c7e);
          color: #fff;
          border: none;
          padding: 18px 40px;
          border-radius: 60px;
          font-size: 18px;
          font-weight: 800;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          transition: transform 0.2s;
        }
        .wa-btn:hover { transform: scale(1.04); }
        .stat-card {
          text-align: center;
          padding: 28px 20px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
        }
        .stat-num {
          font-size: 40px;
          font-weight: 900;
          margin-bottom: 6px;
        }
        .stat-label { color: #94a3b8; font-size: 14px; }
        .particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .section-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(56,189,248,0.3), transparent);
          margin: 0;
        }
      `}</style>

      {/* ── NAV ── */}
      <nav
        className="main-nav"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '18px 0',
          transition: 'background 0.3s',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              fontWeight: 900,
              fontSize: '22px',
              letterSpacing: '-0.5px',
            }}
          >
            <span className="gradient-text">Dijital</span>
            <span style={{ color: '#f8fafc' }}>Trabzon</span>
          </div>
          <div
            className="nav-links"
            style={{ display: 'flex', gap: '32px', alignItems: 'center' }}
          >
            {['Fark Yaratalım', 'Paketler', 'Referanslar', 'İletişim'].map(
              (item, i) => (
                <a
                  key={item}
                  href={
                    ['#about', '#pricing', '#portfolio', '#contact'][i]
                  }
                  style={{
                    color: '#94a3b8',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: 600,
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = '#38bdf8')
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color = '#94a3b8')
                  }
                >
                  {item}
                </a>
              ),
            )}
            <a
              href="#contact"
              className="btn-primary"
              style={{ padding: '10px 22px', fontSize: '14px' }}
            >
              Teklif Al
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        id="hero"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          paddingTop: '80px',
        }}
      >
        {/* Background orbs */}
        <div
          className="orb-1"
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)',
            top: '-100px',
            right: '-100px',
            pointerEvents: 'none',
          }}
        />
        <div
          className="orb-2"
          style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(129,140,248,0.1) 0%, transparent 70%)',
            bottom: '-50px',
            left: '-80px',
            pointerEvents: 'none',
          }}
        />

        {/* Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background:
                i % 2 === 0
                  ? 'rgba(56,189,248,0.5)'
                  : 'rgba(251,146,60,0.5)',
            }}
          />
        ))}

        {/* Grid lines */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '780px' }}>
            <div
              className="hero-badge"
              style={{
                opacity: 0,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '28px',
              }}
            >
              <span className="tag">🚀 Trabzon'un Dijital Geleceği</span>
            </div>

            <h1
              className="hero-title"
              style={{
                opacity: 0,
                fontSize: 'clamp(32px, 6vw, 64px)',
                fontWeight: 900,
                lineHeight: 1.15,
                marginBottom: '24px',
                letterSpacing: '-1px',
              }}
            >
              İşletmenizi Dijitalde{' '}
              <span className="gradient-text">Zirveye Taşıyan</span> Yeni Nesil
              Ajans
            </h1>

            <p
              className="hero-sub"
              style={{
                opacity: 0,
                fontSize: 'clamp(16px, 2.5vw, 20px)',
                color: '#94a3b8',
                lineHeight: 1.75,
                marginBottom: '40px',
                maxWidth: '620px',
              }}
            >
              Trabzon esnafı için saniyeler içinde açılan, interaktif ve
              doğrudan müşteri getiren dijital altyapılar kuruyoruz.
            </p>

            <div
              className="hero-cta hero-btns"
              style={{
                opacity: 0,
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
              }}
            >
              <a href="#portfolio" className="btn-primary">
                Referanslarımızı Gör →
              </a>
              <a href="#contact" className="btn-outline">
                Bize Ulaşın
              </a>
            </div>

            <div
              style={{
                marginTop: '56px',
                display: 'flex',
                gap: '32px',
                flexWrap: 'wrap',
              }}
            >
              {[
                { n: '48s', l: 'Ortalama Yükleme Süresi' },
                { n: '%100', l: 'Mobil Uyumlu' },
                { n: '3x', l: 'Daha Fazla Müşteri' },
              ].map((s) => (
                <div key={s.n}>
                  <div
                    style={{
                      fontSize: '28px',
                      fontWeight: 900,
                      color: '#38bdf8',
                    }}
                  >
                    {s.n}
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── ABOUT ── */}
      <section
        id="about"
        className="about-section"
        style={{ padding: '100px 0' }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '64px',
              alignItems: 'center',
            }}
          >
            <div className="about-content" style={{ opacity: 0 }}>
              <span
                className="tag"
                style={{ marginBottom: '20px', display: 'inline-block' }}
              >
                Neden Biz?
              </span>
              <h2
                style={{
                  fontSize: 'clamp(26px, 4vw, 40px)',
                  fontWeight: 900,
                  marginBottom: '20px',
                  lineHeight: 1.2,
                }}
              >
                Gen-Z Enerjisi,{' '}
                <span className="gradient-text">Saha Deneyimi</span>
              </h2>
              <p
                style={{
                  color: '#94a3b8',
                  lineHeight: 1.8,
                  marginBottom: '20px',
                  fontSize: '16px',
                }}
              >
                Restoran IT altyapılarında gerçek saha deneyimi kazandık.
                Müşterinin kapıya gelmeden önce sizi nasıl araştırdığını
                biliyoruz — ve dijital varlığınızı buna göre inşa ediyoruz.
              </p>
              <p
                style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '16px' }}
              >
                Kurumsal fiyatlar değil, Trabzon'a özel çözümler. Yalnızca kod
                yazmıyoruz; işletmenize müşteri getiren bir sistem kuruyoruz.
              </p>
              <div
                style={{
                  marginTop: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                {[
                  'Hız odaklı, performans optimize edilmiş siteler',
                  'Mobil öncelikli tasarım anlayışı',
                  'Yerel işletme ihtiyaçlarını anlayan ekip',
                  'Teslimat sonrası destek garantisi',
                ].map((item) => (
                  <div key={item} className="feature-item">
                    <span className="check-icon">✦</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="about-stats"
              style={{
                opacity: 0,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
              }}
            >
              {[
                { n: '2', l: 'Tamamlanan Proje', c: '#38bdf8' },
                { n: '<1s', l: 'Sayfa Yükleme', c: '#818cf8' },
                { n: '%75', l: 'İlk 3\'e Özel İndirim', c: '#fb923c' },
                { n: '7/24', l: 'Destek', c: '#34d399' },
              ].map((s) => (
                <div key={s.l} className="stat-card">
                  <div className="stat-num" style={{ color: s.c }}>
                    {s.n}
                  </div>
                  <div className="stat-label">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── PRICING ── */}
      <section
        id="pricing"
        className="pricing-section"
        style={{ padding: '100px 0' }}
      >
        <div className="container">
          <div className="discount-banner" style={{ opacity: 0 }}>
            <div
              style={{
                background: 'linear-gradient(135deg, #ea580c, #fb923c)',
                borderRadius: '16px',
                padding: '18px 32px',
                textAlign: 'center',
                marginBottom: '48px',
                fontSize: 'clamp(16px, 3vw, 22px)',
                fontWeight: 900,
                color: '#fff',
                letterSpacing: '0.3px',
              }}
            >
              🔥 İlk 3 Müşterimize Özel{' '}
              <span
                style={{
                  background: 'rgba(255,255,255,0.25)',
                  padding: '2px 12px',
                  borderRadius: '8px',
                }}
              >
                %75 İndirim!
              </span>{' '}
              — Yerinizi Hemen Ayırtın
            </div>
          </div>

          <h2 className="section-title">
            Hizmet <span className="gradient-text">Paketlerimiz</span>
          </h2>
          <p className="section-sub">
            Her bütçeye uygun, tam kapsamlı dijital çözümler. Sözleşme yok,
            gizli ücret yok.
          </p>

          <div className="grid-3 pricing-cards">
            {/* Statik */}
            <div
              className="pricing-card glass neon-border"
              style={{ borderRadius: '20px', padding: '36px 28px' }}
            >
              <div style={{ marginBottom: '28px' }}>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#38bdf8',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '12px',
                  }}
                >
                  Statik Paket
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '12px',
                    marginBottom: '6px',
                  }}
                >
                  <span className="price-new">1.750 TL</span>
                  <span className="strikethrough">7.000 TL</span>
                </div>
                <p style={{ color: '#64748b', fontSize: '13px' }}>
                  Tek seferlik ödeme
                </p>
              </div>
              <div
                style={{
                  height: '1px',
                  background: 'rgba(255,255,255,0.06)',
                  margin: '24px 0',
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {[
                  'Temel tanıtım sayfası',
                  'Mobil uyumlu tasarım',
                  'Yüksek hız optimizasyonu',
                  'Google haritalar entegrasyonu',
                  'Sosyal medya linkleri',
                ].map((f) => (
                  <div key={f} className="feature-item">
                    <span className="check-icon">✓</span> {f}
                  </div>
                ))}
              </div>
              <a
                href="#contact"
                className="btn-outline"
                style={{ marginTop: '32px', width: '100%', textAlign: 'center' }}
              >
                Hemen Başla
              </a>
            </div>

            {/* İnteraktif */}
            <div
              className="pricing-card"
              style={{
                borderRadius: '20px',
                padding: '36px 28px',
                background: 'linear-gradient(145deg, rgba(56,189,248,0.1), rgba(129,140,248,0.06))',
                border: '1px solid rgba(56,189,248,0.4)',
                position: 'relative',
              }}
            >
              <div style={{ marginBottom: '28px' }}>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#818cf8',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '12px',
                  }}
                >
                  İnteraktif Paket
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '12px',
                    marginBottom: '6px',
                  }}
                >
                  <span className="price-new">2.500 TL</span>
                  <span className="strikethrough">10.000 TL</span>
                </div>
                <p style={{ color: '#64748b', fontSize: '13px' }}>
                  Tek seferlik ödeme
                </p>
              </div>
              <div
                style={{
                  height: '1px',
                  background: 'rgba(56,189,248,0.15)',
                  margin: '24px 0',
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {[
                  'GSAP animasyonları',
                  'Modern UI/UX tasarım',
                  'Akıcı kullanıcı deneyimi',
                  'İletişim formu entegrasyonu',
                  'Temel SEO optimizasyonu',
                  'Statik Paket içeriği dahil',
                ].map((f) => (
                  <div key={f} className="feature-item">
                    <span className="check-icon">✓</span> {f}
                  </div>
                ))}
              </div>
              <a
                href="#contact"
                className="btn-primary"
                style={{ marginTop: '32px', width: '100%', textAlign: 'center' }}
              >
                Hemen Başla
              </a>
            </div>

            {/* Premium */}
            <div
              className="pricing-card"
              style={{
                borderRadius: '20px',
                padding: '36px 28px',
                background: 'linear-gradient(145deg, rgba(251,146,60,0.12), rgba(249,115,22,0.06))',
                border: '2px solid rgba(251,146,60,0.5)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-14px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              >
                <span className="popular-badge">⭐ En Popüler</span>
              </div>
              <div style={{ marginBottom: '28px', marginTop: '8px' }}>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#fb923c',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '12px',
                  }}
                >
                  Premium Paket
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '12px',
                    marginBottom: '6px',
                  }}
                >
                  <span className="price-new">3.750 TL</span>
                  <span className="strikethrough">15.000 TL</span>
                </div>
                <p style={{ color: '#64748b', fontSize: '13px' }}>
                  Tek seferlik ödeme
                </p>
              </div>
              <div
                style={{
                  height: '1px',
                  background: 'rgba(251,146,60,0.2)',
                  margin: '24px 0',
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {[
                  '+1 Yabancı Dil (EN/DE/RU)',
                  'QR Dijital Menü Entegrasyonu',
                  'İşletmeciye Özel Yönetim Paneli',
                  'Gelişmiş SEO & Analytics',
                  'Öncelikli destek (3 ay)',
                  'İnteraktif Paket içeriği dahil',
                ].map((f) => (
                  <div key={f} className="feature-item">
                    <span style={{ color: '#fb923c' }}>✓</span>{' '}
                    <span style={{ color: '#e2e8f0' }}>{f}</span>
                  </div>
                ))}
              </div>
              <a
                href="#contact"
                style={{
                  marginTop: '32px',
                  width: '100%',
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #fb923c, #f97316)',
                  color: '#fff',
                  border: 'none',
                  padding: '14px 28px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '15px',
                  cursor: 'pointer',
                  display: 'block',
                  textDecoration: 'none',
                }}
              >
                Hemen Başla
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── PORTFOLIO ── */}
      <section
        id="portfolio"
        className="portfolio-section"
        style={{ padding: '100px 0' }}
      >
        <div className="container">
          <h2 className="section-title">
            <span className="gradient-text">Referanslarımız</span>
          </h2>
          <p className="section-sub">
            Her proje, müşterimizin dijital kimliğini sahaya taşıdığımız bir
            hikaye.
          </p>

          <div className="grid-2">
            {[
              {
                name: 'Liman Balık Restaurant',
                desc: 'Trabzon\'un köklü balık restoranı için premium menü sitesi. QR kod entegrasyonu ve rezervasyon formu.',
                tags: ['Restaurant', 'QR Menü', 'Premium'],
                color: '#38bdf8',
              },
              {
                name: 'Akçaabat Köftecisi',
                desc: 'Geleneksel lezzetleri modern dijital kimlikle buluşturan, Google\'da öne çıkan hız odaklı landing page.',
                tags: ['Yemek', 'SEO', 'Hızlı Teslimat'],
                color: '#fb923c',
              },
            ].map((project) => (
              <div
                key={project.name}
                className="portfolio-card glass neon-border"
                style={{ borderRadius: '20px', overflow: 'hidden' }}
              >
                <div
                  style={{
                    height: '220px',
                    background: `linear-gradient(135deg, #0f172a, #1e293b)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      width: '300px',
                      height: '300px',
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${project.color}22, transparent 70%)`,
                    }}
                  />
                  <span
                    style={{
                      fontSize: '64px',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    {project.name.includes('Balık') ? '🐟' : '🍖'}
                  </span>
                </div>
                <div style={{ padding: '28px' }}>
                  <h3
                    style={{
                      fontSize: '20px',
                      fontWeight: 800,
                      marginBottom: '10px',
                    }}
                  >
                    {project.name}
                  </h3>
                  <p
                    style={{
                      color: '#94a3b8',
                      lineHeight: 1.7,
                      fontSize: '14px',
                      marginBottom: '20px',
                    }}
                  >
                    {project.desc}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      gap: '8px',
                      flexWrap: 'wrap',
                      marginBottom: '24px',
                    }}
                  >
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: `${project.color}18`,
                          color: project.color,
                          border: `1px solid ${project.color}40`,
                          padding: '3px 10px',
                          borderRadius: '50px',
                          fontSize: '12px',
                          fontWeight: 600,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#contact"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: project.color,
                      textDecoration: 'none',
                      fontWeight: 700,
                      fontSize: '14px',
                      border: `1px solid ${project.color}40`,
                      padding: '10px 20px',
                      borderRadius: '8px',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.background =
                        `${project.color}15`)
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.background =
                        'transparent')
                    }
                  >
                    Canlı Siteyi İncele →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── CONTACT ── */}
      <section
        id="contact"
        className="contact-section"
        style={{ padding: '100px 0 80px' }}
      >
        <div className="container">
          <div
            className="contact-content"
            style={{ opacity: 0, textAlign: 'center', maxWidth: '680px', margin: '0 auto' }}
          >
            <span
              className="tag"
              style={{ marginBottom: '24px', display: 'inline-block' }}
            >
              ☕ Kahve İçmeye Bekleriz
            </span>
            <h2
              style={{
                fontSize: 'clamp(28px, 5vw, 48px)',
                fontWeight: 900,
                marginBottom: '20px',
                lineHeight: 1.2,
              }}
            >
              Projenizi Konuşmak için{' '}
              <span className="orange-text">Bir Mesaj Yeter</span>
            </h2>
            <p
              style={{
                color: '#94a3b8',
                fontSize: '17px',
                lineHeight: 1.75,
                marginBottom: '40px',
              }}
            >
              İşletmeniz için doğru paketi birlikte belirleyelim. Teklif almak
              tamamen ücretsiz — Trabzon kahvesi içerken projenizi konuşalım.
            </p>

            <a
              href="https://wa.me/905000000000?text=Merhaba,%20dijital%20ajans%20hizmetleriniz%20hakkında%20bilgi%20almak%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="wa-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp'tan Yazın
            </a>

            <p
              style={{
                marginTop: '24px',
                color: '#475569',
                fontSize: '14px',
              }}
            >
              Genellikle 1 saat içinde yanıt veriyoruz 🌊
            </p>

            <div
              style={{
                marginTop: '64px',
                paddingTop: '40px',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                color: '#334155',
                fontSize: '14px',
              }}
            >
              <span style={{ fontWeight: 900, fontSize: '16px' }}>
                <span className="gradient-text">Dijital</span>
                <span style={{ color: '#1e293b' }}>Trabzon</span>
              </span>
              <span>—</span>
              <span>Trabzon, Türkiye</span>
              <span>·</span>
              <span>© 2025</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
