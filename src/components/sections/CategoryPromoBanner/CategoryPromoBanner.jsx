import { Link } from 'react-router-dom';
import { Lightbulb, Music, Eye, Armchair, Shield, Gauge, Sparkles, ChevronRight, ArrowRight } from 'lucide-react';
import './CategoryPromoBanner.css';

const categories = [
  {
    icon: Lightbulb,
    label: 'Headlights & Lighting',
    count: '6 Upgrades',
    link: '/exterior-car-accessories-chennai',
  },
  {
    icon: Music,
    label: 'Car Audio & Infotainment',
    count: '5 Systems',
    link: '/interior-car-accessories-chennai',
  },
  {
    icon: Eye,
    label: '360° Cameras & AI Dashcams',
    count: '2 Systems',
    link: '/interior-car-accessories-chennai',
  },
  {
    icon: Armchair,
    label: 'Custom Leather Seat Covers',
    count: 'Bespoke Fit',
    link: '/interior-car-accessories-chennai',
  },
  {
    icon: Sparkles,
    label: '18-Zone Ambient Lighting',
    count: 'App Controlled',
    link: '/interior-car-accessories-chennai',
  },
  {
    icon: Shield,
    label: 'Armor & Body Protection',
    count: '6 Defensive Upgrades',
    link: '/exterior-car-accessories-chennai',
  },
  {
    icon: Gauge,
    label: 'Spoilers, Bumpers & Styling',
    count: 'Aerodynamics',
    link: '/exterior-car-accessories-chennai',
  },
];

export default function CategoryPromoBanner() {
  return (
    <section className="cat-promo-section" aria-label="Automotive Categories and Retrofit Studio">
      <div className="container">
        <div className="cat-promo-grid">

          {/* ── Left Category Sidebar (Inspired by reference screenshot) ── */}
          <aside className="cat-sidebar" aria-label="Product category directory">
            <div className="cat-sidebar-header">
              <span className="cat-sidebar-header-icon">☰</span>
              <h3 className="cat-sidebar-title">BROWSE <span className="text-red">CATEGORIES</span></h3>
            </div>

            <ul className="cat-sidebar-list">
              {categories.map((cat, idx) => {
                const Icon = cat.icon;
                return (
                  <li key={idx} className="cat-sidebar-item">
                    <Link to={cat.link} className="cat-sidebar-link">
                      <span className="cat-sidebar-icon-box">
                        <Icon size={16} />
                      </span>
                      <div className="cat-sidebar-info">
                        <span className="cat-sidebar-name">{cat.label}</span>
                        <span className="cat-sidebar-count">{cat.count}</span>
                      </div>
                      <ChevronRight size={14} className="cat-sidebar-chevron" />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="cat-sidebar-footer">
              <Link to="/contact" className="cat-sidebar-quote-link">
                <span>Looking for a custom build?</span>
                <strong>Enquire on WhatsApp &rarr;</strong>
              </Link>
            </div>
          </aside>

          {/* ── Right Large Promotional Showcase Banner ── */}
          <div className="cat-promo-banner">
            <div className="cat-promo-banner-bg" aria-hidden="true">
              <img
                src="/images/promo_studio.jpg"
                alt="Bumper To Bumper Precision Automotive Retrofit Workshop"
                className="cat-promo-banner-img"
                loading="lazy"
              />
              <div className="cat-promo-banner-overlay" />
            </div>

            <div className="cat-promo-banner-content">
              <div className="cat-promo-badge">
                <span className="cat-promo-badge-tag">EXPERT RETROFIT STUDIO</span>
                <span className="cat-promo-badge-location">ADAMBAKKAM, CHENNAI</span>
              </div>

              <h2 className="cat-promo-banner-title">
                PROFESSIONAL AUTOMOTIVE <br />
                UPGRADES &amp; <span className="cat-promo-cyan-accent">ACCESSORIES</span>
              </h2>

              <p className="cat-promo-banner-desc">
                Elevate your vehicle with showroom-grade craftsmanship. From razor-sharp bi-LED projector headlights and 360° surround vision to 18-zone symphony ambient lighting and custom bucket-fit leather upholstery — installed with 100% plug-and-play couplers that protect your <span className="text-red">factory</span> warranty.
              </p>

              <div className="cat-promo-banner-actions">
                <Link to="/exterior-car-accessories-chennai" className="btn btn-primary cat-promo-btn-primary">
                  <span>Explore All Products</span>
                  <ArrowRight size={16} className="btn-icon" />
                </Link>

                <Link to="/contact" className="btn btn-secondary cat-promo-btn-secondary">
                  <span>Book Studio Slot</span>
                </Link>
              </div>

              <div className="cat-promo-banner-features">
                <div className="cat-promo-feature">
                  <strong>Zero Wire Cutting</strong>
                  <span>OEM Plug &amp; Play</span>
                </div>
                <div className="cat-promo-feature-sep" />
                <div className="cat-promo-feature">
                  <strong>Genuine Warranty</strong>
                  <span>100% Authenticity</span>
                </div>
                <div className="cat-promo-feature-sep" />
                <div className="cat-promo-feature">
                  <strong>15+ Years</strong>
                  <span>Chennai Master Technicians</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
