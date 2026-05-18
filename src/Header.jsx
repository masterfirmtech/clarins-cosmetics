import React, { useState, useEffect } from "react";
import "./Header.css";

const CATEGORIES = ["All", "Skincare", "Makeup", "Fragrance", "Body", "Men"];

export default function Header({
  cartCount = 0,
  onCartClick,
  searchTerm,
  onSearchChange,
  activeCategory,
  onCategoryChange,
}) {
  const [scrolled,   setScrolled] = useState(false);
  const [mobileOpen, setMobile]   = useState(false);
  const [searchOpen, setSearch]   = useState(false);
  const [cartBump,   setBump]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (cartCount > 0) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 300);
      return () => clearTimeout(t);
    }
  }, [cartCount]);

  return (
    <header className={`hdr${scrolled ? " hdr--scrolled" : ""}`}>

      {/* Announcement */}
      <div className="hdr__ann">
        <span className="hdr__ann-gem">◆</span>
        <div className="hdr__ann-items">
          <span>Free delivery on orders over ₦50,000</span>
          <span className="hdr__ann-sep">·</span>
          <span>100% Authentic Clarins</span>
          <span className="hdr__ann-sep">·</span>
          <span>Plant science since 1954</span>
        </div>
        <span className="hdr__ann-gem">◆</span>
      </div>

      {/* Search slide-down */}
      <div className={`hdr__search-bar${searchOpen ? " hdr__search-bar--open" : ""}`}>
        <div className="hdr__search-inner">
          <span className="hdr__search-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/>
            </svg>
          </span>
          <input
            className="hdr__search-input"
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            autoFocus={searchOpen}
          />
          <button className="hdr__search-close" onClick={() => { setSearch(false); onSearchChange(""); }}>✕</button>
        </div>
      </div>

      {/* Main row */}
      <div className="hdr__main">

        {/* Logo */}
        <div className="hdr__logo">
          <span className="hdr__logo-word">Clarins</span>
          <span className="hdr__logo-rule" />
          <span className="hdr__logo-sub">Nigeria</span>
        </div>

        {/* Centre nav — desktop only — connected to App state */}
        <nav className="hdr__nav">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`hdr__nav-btn${activeCategory === cat ? " hdr__nav-btn--active" : ""}`}
              onClick={() => onCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </nav>

        {/* Right icons */}
        <div className="hdr__actions">
          <button className="hdr__icon-btn" onClick={() => setSearch(true)} aria-label="Search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/>
            </svg>
          </button>
          <button className="hdr__icon-btn" aria-label="Wishlist">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <button className="hdr__icon-btn" aria-label="Account">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </button>
          <button
            className={`hdr__icon-btn hdr__cart-btn${cartBump ? " hdr__cart-btn--bump" : ""}`}
            onClick={onCartClick}
            aria-label="Cart"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {cartCount > 0 && <span className="hdr__cart-badge">{cartCount}</span>}
          </button>
          <button className="hdr__icon-btn hdr__hamburger" onClick={() => setMobile(!mobileOpen)} aria-label="Menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              {mobileOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`hdr__mobile${mobileOpen ? " hdr__mobile--open" : ""}`}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className="hdr__mobile-item"
            onClick={() => { onCategoryChange(cat); setMobile(false); }}
          >
            {cat}
          </button>
        ))}
      </div>

    </header>
  );
}