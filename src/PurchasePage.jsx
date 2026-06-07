import { useState, useRef, useEffect } from 'react';
import './PurchasePage.css';

const DENOMINATIONS = [
  { value: 500,  label: '₹500',   theme: 'silver',   emoji: '✨' },
  { value: 1000, label: '₹1,000', theme: 'gold',     emoji: '💎' },
  { value: 2000, label: '₹2,000', theme: 'platinum', emoji: '👑' },
  { value: 'custom', label: 'Custom', theme: 'custom', emoji: '✏️' },
];

const OCCASION_MESSAGES = {
  birthday: "Wishing you a wonderful birthday! 🎂 This gift is just for you — shop something special!",
  wedding: "Congratulations on your big day! 💍 May your new journey be filled with joy!",
  festival: "Wishing you a joyful celebration! 🎉 A little something to make this festive season extra special!",
  thankyou: "Thank you so much for everything! 🙏 This is a small token of my appreciation!",
  custom: "",
};

export default function PurchasePage({ onBack }) {
  const [denomination, setDenomination] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [occasion, setOccasion] = useState('birthday');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [cardFlipping, setCardFlipping] = useState(false);
  const prevDenom = useRef(denomination);
  const customInputRef = useRef(null);

  // When denomination changes, animate the card
  useEffect(() => {
    const activeDenom = isCustom ? 'custom' : denomination;
    if (prevDenom.current !== activeDenom) {
      setCardFlipping(true);
      const t = setTimeout(() => setCardFlipping(false), 600);
      prevDenom.current = activeDenom;
      return () => clearTimeout(t);
    }
  }, [denomination, isCustom]);

  // Focus custom input when custom card selected
  useEffect(() => {
    if (isCustom && customInputRef.current) {
      customInputRef.current.focus();
    }
  }, [isCustom]);

  // Auto-fill message on occasion change
  useEffect(() => {
    if (occasion !== 'custom') {
      setMessage(OCCASION_MESSAGES[occasion]);
    }
  }, [occasion]);

  // Effective amount shown everywhere
  const effectiveAmount = isCustom ? (parseInt(customAmount) || 0) : denomination;
  const selectedDenom = isCustom
    ? { theme: 'custom', emoji: '✏️' }
    : DENOMINATIONS.find(d => d.value === denomination);

  const validate = () => {
    const e = {};
    if (isCustom) {
      const amt = parseInt(customAmount);
      if (!customAmount || isNaN(amt)) e.customAmount = 'Please enter an amount';
      else if (amt < 100) e.customAmount = 'Minimum amount is ₹100';
      else if (amt > 50000) e.customAmount = 'Maximum amount is ₹50,000';
    }
    if (!recipientName.trim()) e.recipientName = 'Recipient name is required';
    if (!recipientEmail.trim() || !/\S+@\S+\.\S+/.test(recipientEmail)) e.recipientEmail = 'Valid email required';
    if (!senderName.trim()) e.senderName = 'Your name is required';
    if (!message.trim()) e.message = 'Please add a personal message';
    return e;
  };

  const handleSend = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setRecipientName('');
    setRecipientEmail('');
    setSenderName('');
    setMessage('');
    setDenomination(1000);
    setCustomAmount('');
    setIsCustom(false);
    setOccasion('birthday');
  };

  if (submitted) {
    return (
      <div className="purchase-page success-page">
        <div className="success-bg">
          <div className="success-orb s-orb-1" />
          <div className="success-orb s-orb-2" />
        </div>
        <div className="success-card">
          <div className="success-confetti">
            {Array.from({length: 20}).map((_, i) => (
              <span key={i} className="confetti-piece" style={{
                left: `${Math.random()*100}%`,
                animationDelay: `${Math.random()*2}s`,
                background: ['#f5c842','#ec4899','#9333ea','#22d3ee'][i%4],
              }} />
            ))}
          </div>
          <div className="success-icon">🎁</div>
          <h2 className="success-title">Gift Card Sent!</h2>
          <p className="success-subtitle">
            Your ₹{effectiveAmount.toLocaleString()} gift card has been sent to <strong>{recipientName}</strong> at <strong>{recipientEmail}</strong>.
          </p>

          {/* Mini Preview */}
          <div className={`preview-card preview-card--${selectedDenom.theme} success-preview`}>
            <img src="/giftcard_bg.png" alt="card" className="preview-bg" />
            <div className="preview-overlay">
              <div className="preview-top">
                <span className="preview-brand">🎁 GiftZone</span>
                <span className="preview-badge">GIFT CARD</span>
              </div>
              <div className="preview-center">
                <div className="preview-amount">₹{effectiveAmount.toLocaleString()}</div>
              </div>
              {message && (
                <div className="card-message">
                  {message}
                </div>
              )}
              <div className="preview-bottom">
                <div>
                  <div className="preview-label">For</div>
                  <div className="preview-name">{recipientName || 'Your Friend'}</div>
                </div>
                <div>
                  <div className="preview-label">From</div>
                  <div className="preview-name">{senderName || 'You'}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="success-actions">
            <button className="btn-gold" onClick={handleReset}>Send Another Gift</button>
            <button className="btn-outline-white" onClick={onBack}>Back to Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="purchase-page">
      {/* Background */}
      <div className="purchase-bg">
        <div className="purchase-orb p-orb-1" />
        <div className="purchase-orb p-orb-2" />
        <div className="purchase-orb p-orb-3" />
      </div>

      {/* Top Bar */}
      <div className="purchase-topbar">
        <button className="back-btn" onClick={onBack} id="back-to-home">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Back
        </button>
        <div className="topbar-logo">
          <span>🎁</span>
          <span className="logo-text">Gift<span className="logo-accent">Zone</span></span>
        </div>
        <div className="topbar-right">
          <span className="secure-badge">🔒 Secure Checkout</span>
        </div>
      </div>

      {/* Main Layout */}
      <div className="purchase-layout">

        {/* LEFT — Form */}
        <div className="form-panel">
          <div className="form-header">
            <h1 className="form-title">Send a Gift Card</h1>
            <p className="form-subtitle">Fill in the details and we'll deliver it instantly</p>
          </div>

          <form onSubmit={handleSend} className="gift-form" noValidate>

            {/* Step 1: Choose Amount */}
            <div className="form-section">
              <div className="section-label">
                <span className="step-num">1</span>
                Choose Amount
              </div>
              <div className="denom-grid">
                {DENOMINATIONS.map(d => (
                  <button
                    key={d.value}
                    type="button"
                    className={`denom-card ${
                      d.value === 'custom'
                        ? isCustom ? 'denom-card--active denom-card--custom' : 'denom-card--custom'
                        : !isCustom && denomination === d.value ? `denom-card--active denom-card--${d.theme}` : `denom-card--${d.theme}`
                    }`}
                    onClick={() => {
                      if (d.value === 'custom') {
                        setIsCustom(true);
                      } else {
                        setIsCustom(false);
                        setDenomination(d.value);
                      }
                    }}
                    id={`denom-${d.value}`}
                  >
                    <span className="denom-emoji">{d.emoji}</span>
                    <span className="denom-amount">{d.label}</span>
                    {((d.value === 'custom' && isCustom) || (!isCustom && denomination === d.value)) && (
                      <span className="denom-check">✓</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Custom amount input — shown when custom is selected */}
              {isCustom && (
                <div className={`custom-amount-row ${errors.customAmount ? 'input-group--error' : ''}`}>
                  <div className="custom-amount-input-wrap">
                    <span className="custom-rupee">₹</span>
                    <input
                      ref={customInputRef}
                      id="customAmount"
                      type="number"
                      min="100"
                      max="50000"
                      placeholder="Enter amount (₹100 – ₹50,000)"
                      value={customAmount}
                      onChange={e => setCustomAmount(e.target.value)}
                      className="custom-amount-input"
                    />
                  </div>
                  {errors.customAmount && <span className="error-msg">{errors.customAmount}</span>}
                  <p className="custom-amount-hint">Min ₹100 · Max ₹50,000</p>
                </div>
              )}
            </div>

            {/* Step 2: Recipient */}
            <div className="form-section">
              <div className="section-label">
                <span className="step-num">2</span>
                Recipient Details
              </div>
              <div className="input-row">
                <div className={`input-group ${errors.recipientName ? 'input-group--error' : ''}`}>
                  <label htmlFor="recipientName">Recipient's Name</label>
                  <div className="input-wrapper">
                    <span className="input-icon">👤</span>
                    <input
                      id="recipientName"
                      type="text"
                      placeholder="e.g. Priya Sharma"
                      value={recipientName}
                      onChange={e => setRecipientName(e.target.value)}
                    />
                  </div>
                  {errors.recipientName && <span className="error-msg">{errors.recipientName}</span>}
                </div>
                <div className={`input-group ${errors.recipientEmail ? 'input-group--error' : ''}`}>
                  <label htmlFor="recipientEmail">Recipient's Email</label>
                  <div className="input-wrapper">
                    <span className="input-icon">✉️</span>
                    <input
                      id="recipientEmail"
                      type="email"
                      placeholder="priya@example.com"
                      value={recipientEmail}
                      onChange={e => setRecipientEmail(e.target.value)}
                    />
                  </div>
                  {errors.recipientEmail && <span className="error-msg">{errors.recipientEmail}</span>}
                </div>
              </div>
              <div className={`input-group ${errors.senderName ? 'input-group--error' : ''}`}>
                <label htmlFor="senderName">Your Name (Sender)</label>
                <div className="input-wrapper">
                  <span className="input-icon">💌</span>
                  <input
                    id="senderName"
                    type="text"
                    placeholder="e.g. Rahul"
                    value={senderName}
                    onChange={e => setSenderName(e.target.value)}
                  />
                </div>
                {errors.senderName && <span className="error-msg">{errors.senderName}</span>}
              </div>
            </div>

            {/* Step 3: Message */}
            <div className="form-section">
              <div className="section-label">
                <span className="step-num">3</span>
                Personal Message
              </div>
              <div className="occasion-pills">
                {Object.keys(OCCASION_MESSAGES).map(occ => (
                  <button
                    key={occ}
                    type="button"
                    className={`occ-pill ${occasion === occ ? 'occ-pill--active' : ''}`}
                    onClick={() => setOccasion(occ)}
                  >
                    {occ === 'birthday' ? '🎂 Birthday' :
                     occ === 'wedding' ? '💍 Wedding' :
                     occ === 'festival' ? '🎉 Festival' :
                     occ === 'thankyou' ? '🙏 Thank You' : '✍️ Custom'}
                  </button>
                ))}
              </div>
              <div className={`input-group ${errors.message ? 'input-group--error' : ''}`}>
                <div className="input-wrapper">
                  <textarea
                    id="message"
                    rows="3"
                    placeholder="Write your heartfelt message here..."
                    value={message}
                    onChange={e => { setMessage(e.target.value); setOccasion('custom'); }}
                  />
                </div>
                <div className="char-count">{message.length}/200</div>
                {errors.message && <span className="error-msg">{errors.message}</span>}
              </div>
            </div>

            <button type="submit" className="send-btn" id="send-gift-card-btn">
              <span>🎁 Send Gift Card</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
              </svg>
            </button>
          </form>
        </div>

        {/* RIGHT — Preview */}
        <div className="preview-panel">
          <div className="preview-header">
            <span className="preview-label-tag">Live Preview</span>
          </div>

          <div className={`preview-card-wrapper ${cardFlipping ? 'card-flip-anim' : ''}`}>
            <div className={`preview-card preview-card--${selectedDenom.theme}`}>
              <img src="/giftcard_bg.png" alt="Gift Card" className="preview-bg" />
              <div className="preview-shimmer" />
              <div className="preview-overlay">
                <div className="preview-top">
                  <span className="preview-brand">🎁 GiftZone</span>
                  <span className="preview-badge">GIFT CARD</span>
                </div>
                <div className="preview-center">
                  <div className="preview-amount">₹{effectiveAmount > 0 ? effectiveAmount.toLocaleString() : '—'}</div>
                </div>
                {message && (
                  <div className="card-message">
                    {message}
                  </div>
                )}
                <div className="preview-bottom">
                  <div>
                    <div className="preview-label">For</div>
                    <div className="preview-name">{recipientName || 'Your Friend'}</div>
                  </div>
                  <div>
                    <div className="preview-label">From</div>
                    <div className="preview-name">{senderName || 'You'}</div>
                  </div>
                  <div className="preview-chip">
                    <div className="preview-chip-inner" />
                  </div>
                </div>
              </div>
            </div>

            {/* Glow based on theme */}
            <div className={`card-glow card-glow--${selectedDenom.theme}`} />
          </div>

          {/* Message Preview */}
          {message && (
            <div className="message-preview">
              <div className="msg-quote">"</div>
              <p className="msg-text">{message}</p>
            </div>
          )}

          {/* Summary */}
          <div className="order-summary">
            <div className="summary-row">
              <span>Gift Value</span>
              <span className="summary-value">₹{effectiveAmount > 0 ? effectiveAmount.toLocaleString() : '—'}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Charges</span>
              <span className="summary-free">FREE</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>₹{effectiveAmount > 0 ? effectiveAmount.toLocaleString() : '—'}</span>
            </div>
          </div>

          <div className="preview-trust">
            <span>🔒 Secured by 256-bit SSL</span>
            <span>•</span>
            <span>⚡ Instant Delivery</span>
            <span>•</span>
            <span>🔄 Easy Refund</span>
          </div>
        </div>
      </div>
    </div>
  );
}
