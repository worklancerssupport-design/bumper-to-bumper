import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, Instagram, Phone } from 'lucide-react';

export default function MainHeader({ onOpenSearch, onOpenMobileMenu }) {
  const location = useLocation();

  const isHomeActive = location.pathname === '/';
  const isExteriorActive = location.pathname.includes('/exterior');
  const isInteriorActive = location.pathname.includes('/interior');
  const isGalleryActive = location.pathname.startsWith('/gallery');
  const isReviewsActive = location.pathname.startsWith('/reviews');
  const isAboutActive = location.pathname.startsWith('/about');
  const isContactActive = location.pathname.startsWith('/contact');

  return (
    <div className="header-main-row">
      <div className="container header-main-row__inner">

        {/* ── Left: Brand Identity ──────────────────────────── */}
        <Link to="/" className="brand-badge" aria-label="Bumper To Bumper Car Accessories Home">
          <div className="brand-badge__mark" aria-hidden="true">
            <span className="brand-badge__mark-b">B</span>
            <span className="brand-badge__mark-dot">·</span>
            <span className="brand-badge__mark-b">B</span>
          </div>
          <div className="brand-badge__text">
            <span className="brand-badge__title"><span style={{color:'#e53e3e'}}>BUMPER</span> TO BUMPER</span>
            <span className="brand-badge__sub">CAR ACCESSORIES</span>
          </div>
        </Link>

        {/* ── Center: Direct Navigation (Accessories Split into Exterior & Interior) ── */}
        <nav className="header-main-nav" aria-label="Primary Navigation">
          <ul className="header-main-nav__list">
            {/* 1. Home */}
            <li className="header-main-nav__item">
              <Link
                to="/"
                className={`header-main-nav__link ${isHomeActive ? 'header-main-nav__link--active' : ''}`}
                aria-current={isHomeActive ? 'page' : undefined}
              >
                <span>Home</span>
                {isHomeActive && <span className="header-main-nav__indicator" aria-hidden="true" />}
              </Link>
            </li>

            {/* 2. Exterior Accessories */}
            <li className="header-main-nav__item">
              <Link
                to="/exterior-car-accessories-chennai"
                className={`header-main-nav__link ${isExteriorActive ? 'header-main-nav__link--active' : ''}`}
                title="Exterior Car Accessories in Chennai"
                aria-current={isExteriorActive ? 'page' : undefined}
              >
                <span>Exterior</span>
                {isExteriorActive && <span className="header-main-nav__indicator" aria-hidden="true" />}
              </Link>
            </li>

            {/* 3. Interior Accessories */}
            <li className="header-main-nav__item">
              <Link
                to="/interior-car-accessories-chennai"
                className={`header-main-nav__link ${isInteriorActive ? 'header-main-nav__link--active' : ''}`}
                title="Interior Car Accessories in Chennai"
                aria-current={isInteriorActive ? 'page' : undefined}
              >
                <span>Interior</span>
                {isInteriorActive && <span className="header-main-nav__indicator" aria-hidden="true" />}
              </Link>
            </li>

            {/* 4. Gallery */}
            <li className="header-main-nav__item">
              <Link
                to="/gallery"
                className={`header-main-nav__link ${isGalleryActive ? 'header-main-nav__link--active' : ''}`}
                aria-current={isGalleryActive ? 'page' : undefined}
              >
                <span>Gallery</span>
                {isGalleryActive && <span className="header-main-nav__indicator" aria-hidden="true" />}
              </Link>
            </li>

            {/* 5. Reviews */}
            <li className="header-main-nav__item">
              <Link
                to="/reviews"
                className={`header-main-nav__link ${isReviewsActive ? 'header-main-nav__link--active' : ''}`}
                aria-current={isReviewsActive ? 'page' : undefined}
              >
                <span>Reviews</span>
                {isReviewsActive && <span className="header-main-nav__indicator" aria-hidden="true" />}
              </Link>
            </li>

            {/* 6. About Us */}
            <li className="header-main-nav__item">
              <Link
                to="/about"
                className={`header-main-nav__link ${isAboutActive ? 'header-main-nav__link--active' : ''}`}
                aria-current={isAboutActive ? 'page' : undefined}
              >
                <span>About Us</span>
                {isAboutActive && <span className="header-main-nav__indicator" aria-hidden="true" />}
              </Link>
            </li>

            {/* 6. Contact */}
            <li className="header-main-nav__item">
              <Link
                to="/contact"
                className={`header-main-nav__link ${isContactActive ? 'header-main-nav__link--active' : ''}`}
                aria-current={isContactActive ? 'page' : undefined}
              >
                <span>Contact</span>
                {isContactActive && <span className="header-main-nav__indicator" aria-hidden="true" />}
              </Link>
            </li>
          </ul>
        </nav>

        {/* ── Right: Action Controls (Search, Instagram, Phone, Mobile Toggle) ── */}
        <div className="header-main-controls">
          {/* Search Trigger */}
          <button
            type="button"
            className="header-icon-btn header-icon-btn--search"
            onClick={onOpenSearch}
            aria-label="Search accessories catalogue"
            title="Search accessories catalogue"
          >
            <Search size={18} aria-hidden="true" />
          </button>

          {/* Instagram Account Link */}
          <a
            href="https://www.instagram.com/bumpertobumpercaraccessories/"
            target="_blank"
            rel="noopener noreferrer"
            className="header-icon-btn header-icon-btn--ig"
            aria-label="Visit our Instagram"
            title="Visit our Instagram (@bumpertobumpercaraccessories)"
          >
            <Instagram size={18} aria-hidden="true" />
          </a>

          {/* Phone / Call Direct Link */}
          <a
            href="tel:9789550006"
            className="header-icon-btn header-icon-btn--phone"
            aria-label="Call Bumper To Bumper Car Accessories"
            title="Call Bumper To Bumper Car Accessories (9789550006)"
          >
            <Phone size={18} aria-hidden="true" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="header-icon-btn header-icon-btn--toggle"
            onClick={onOpenMobileMenu}
            aria-label="Open mobile navigation menu"
          >
            <Menu size={20} aria-hidden="true" />
          </button>
        </div>

      </div>
    </div>
  );
}
