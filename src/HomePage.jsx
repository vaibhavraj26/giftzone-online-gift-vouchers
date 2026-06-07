import { useEffect, useRef } from 'react';
import './HomePage.css';

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 8,
  duration: 6 + Math.random() * 6,
  size: 4 + Math.random() * 6,
  color: i % 3 === 0 ? '#f5c842' : i % 3 === 1 ? '#ec4899' : '#9333ea',
}));

export default function HomePage({ onGetStarted }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty('--mx', `${x * 20}px`);
      el.style.setProperty('--my', `${y * 20}px`);
    };
    el.addEventListener('mousemove', handleMouseMove);
    return () => el.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="homepage" ref={heroRef}>
      {/* Animated Background Particles */}
      <div className="particles">
        {PARTICLES.map(p => (
          <span key={p.id} className="particle" style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
          }} />
        ))}
      </div>

      {/* Ambient Glow Orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-logo">
          <span className="logo-icon">🎁</span>
          <span className="logo-text">Gift<span className="logo-accent">Zone</span></span>
        </div>
        <div className="nav-links">
          <a href="#" className="nav-link">Shop</a>
          <a href="#" className="nav-link">Categories</a>
          <a href="#" className="nav-link">Deals</a>
          <button className="nav-cta" onClick={onGetStarted}>
            Send a Gift
          </button>
        </div>
      </nav>

      {/* Main Hero Content */}
      <main className="hero-content">
        {/* Left Section */}
        <div className="hero-left">
          {/* <div className="badge-row">
            <span className="badge">
              <span className="badge-dot" />
              India's #1 Gift Platform
            </span>
          </div> */}

          <h1 className="hero-heading">
            Give the<br />
            <span className="heading-gradient">Perfect Gift</span><br />
            Every Time
          </h1>

          <p className="hero-subtitle">
            Send digital gift cards to your loved ones instantly. Choose from ₹500, ₹1,000, or ₹2,000 — redeemable at 500+ top brands.
          </p>

          {/* Feature Chips */}
          <div className="feature-chips">
            <span className="chip">⚡ Instant Delivery</span>
            <span className="chip">🔒 100% Secure</span>
            <span className="chip">🎨 Custom Message</span>
          </div>

          {/* CTA Buttons */}
          <div className="cta-group">
            <button className="btn-primary" onClick={onGetStarted} id="send-gift-cta">
              <span>Send a Gift Card</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button className="btn-secondary">
              Explore All Gifts
            </button>
          </div>

          {/* Stats Row */}
          <div className="stats-row">
            <div className="stat">
              <span className="stat-value">2M+</span>
              <span className="stat-label">Happy Gifters</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-value">500+</span>
              <span className="stat-label">Partner Brands</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-value">4.9★</span>
              <span className="stat-label">App Rating</span>
            </div>
          </div>
        </div>

        {/* Right Section — Floating Card Visual */}
        <div className="hero-right">
          {/* Decorative rings — scattered background layer */}
          <div className="deco-ring" />
          <div className="deco-ring deco-ring-2" />
          <div className="deco-ring deco-ring-3" />
          <div className="deco-ring deco-ring-4" />
          <div className="deco-ring deco-ring-5" />
          <div className="deco-ring deco-ring-6" />
          <div className="deco-ring deco-ring-7" />
          <div className="deco-ring deco-ring-8" />
          <div className="deco-ring deco-ring-9" />

          <div className="card-scene">
            {/* Main Gift Card */}
            <div className="hero-card main-card">
              <img src="/giftcard_bg.png" alt="GiftZone Gift Card" className="card-bg-img" />
              <div className="card-overlay">
                <div className="card-top-row">
                  <span className="card-brand">🎁 GiftZone</span>
                  <span className="card-type">GIFT CARD</span>
                </div>
                <div className="card-amount-display">₹1,000</div>
                <div className="card-message">
                  🎂 Wishing you a wonderful birthday — treat yourself to something amazing!
                </div>
                <div className="card-bottom-row">
                  <div>
                    <div className="card-label">For</div>
                    <div className="card-name">Priya Sharma</div>
                  </div>
                  <div className="card-chip">
                    <div className="chip-inner" />
                  </div>
                </div>
              </div>
              <div className="card-shimmer" />
            </div>
          </div>

          {/* Mini floating occasion cards — positioned in hero-right, clear of center card */}
          <div className="mini-card mini-card-1">
            <div className="mini-card-inner">
              <span>🎂</span>
              <span className="mini-card-text">Happy Birthday!</span>
            </div>
          </div>

          <div className="mini-card mini-card-2">
            <div className="mini-card-inner">
              <span>💍</span>
              <span className="mini-card-text">Congratulations!</span>
            </div>
          </div>

          <div className="mini-card mini-card-3">
            <div className="mini-card-inner">
              <span>🎉</span>
              <span className="mini-card-text">Happy Festival!</span>
            </div>
          </div>

          <div className="mini-card mini-card-4">
            <div className="mini-card-inner">
              <span>🙏</span>
              <span className="mini-card-text">Thank You!</span>
            </div>
          </div>

          <div className="mini-card mini-card-5">
            <div className="mini-card-inner">
              <span>❤️</span>
              <span className="mini-card-text">With Love</span>
            </div>
          </div>

          <div className="mini-card mini-card-6">
            <div className="mini-card-inner">
              <span>🎓</span>
              <span className="mini-card-text">Graduation!</span>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Banner Strip */}
      <div className="brand-strip">
        <div className="strip-inner">
          {['Amazon', 'Flipkart', 'Myntra', 'Swiggy', 'Zomato', 'Nykaa', 'BookMyShow', 'MakeMyTrip', 'Ajio', 'Tata Cliq'].map(b => (
            <span key={b} className="brand-name">{b}</span>
          ))}
          {['Amazon', 'Flipkart', 'Myntra', 'Swiggy', 'Zomato', 'Nykaa', 'BookMyShow', 'MakeMyTrip', 'Ajio', 'Tata Cliq'].map(b => (
            <span key={b + '_dup'} className="brand-name">{b}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
