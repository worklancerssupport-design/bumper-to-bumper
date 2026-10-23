import { Link } from 'react-router-dom';
import { ChevronRight, Phone, ShieldCheck, Wrench, Award, CheckCircle } from 'lucide-react';
import business from '../../../config/business';
import catalog from '../../../data/catalog.json';
import './PremiumHero.css';

export default function PremiumHero() {
  return (
    <section className="premium-hero" aria-label={`${business.name} — ${business.city}'s premier automotive studio`}>
      {/* Background imagery with sophisticated dark gradient */}
      <div className="premium-hero__bg" aria-hidden="true">
        <img
          src="/images/hero_engine.jpg"
          alt={`${business.name} High-Performance Automotive Components`}
          className="premium-hero__bg-img"
          loading="eager"
          fetchpriority="high"
        />
        <div className="premium-hero__overlay" />
      </div>

      <div className="premium-hero__content">
        <article className="premium-hero__copy">
          <div className="premium-hero__badge">
            <span className="premium-hero__badge-dot" />
            <span>PRECISION RETROFIT &amp; ACCESSORY STUDIO · {business.location.toUpperCase()}</span>
          </div>

          <h1 className="premium-hero__title">
            Upgrade Your Drive.<br />
            Built Around Your <span className="premium-hero__title-accent">Style</span>.
          </h1>

          <p className="premium-hero__lead">
            Explore car accessories and vehicle <span className="text-red">upgrades</span> designed to complement your style, comfort, and driving experience. From bi-LED lighting, 360° cameras, and Android touchscreens to bespoke seat covers and damping — crafted with zero wire cutting.
          </p>

          <div className="premium-hero__actions">
            <Link to="/exterior-car-accessories-chennai" className="premium-hero__btn premium-hero__btn--primary">
              <span>Explore Accessories</span>
              <ChevronRight size={16} className="premium-hero__btn-icon" />
            </Link>

            <Link to="/contact" className="premium-hero__btn premium-hero__btn--secondary">
              <span>Get Free Quote</span>
            </Link>

            <a
              href={business.callHref}
              className="premium-hero__hotline-link"
              aria-label="Call store"
            >
              <span className="premium-hero__hotline-icon"><Phone size={14} /></span>
              <span className="premium-hero__hotline-text">
                <small>Direct Call</small>
                <strong>{business.phone}</strong>
              </span>
            </a>
          </div>

          {/* Quick Trust Highlights */}
          <div className="premium-hero__highlights">
            <div className="premium-hero__highlight-item">
              <CheckCircle size={15} className="premium-hero__highlight-icon" />
              <span>100% Plug-and-Play Couplers</span>
            </div>
            <div className="premium-hero__highlight-item">
              <CheckCircle size={15} className="premium-hero__highlight-icon" />
              <span>Preserves Factory Warranty</span>
            </div>
            <div className="premium-hero__highlight-item">
              <CheckCircle size={15} className="premium-hero__highlight-icon" />
              <span>{business.stats.yearsExperience}+ Years Craftsmanship</span>
            </div>
          </div>
        </article>
      </div>

      {/* Brand strip */}
      <div className="premium-hero__brand-strip" aria-label="Car brands we upgrade">
        <span className="premium-hero__brand-strip-label">ENGINEERED FOR ALL LEADING MARQUES:</span>
        <ul className="premium-hero__brands">
          {catalog.carBrands.map((brand) => (
            <li key={brand.slug}>{brand.name.toUpperCase()}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
