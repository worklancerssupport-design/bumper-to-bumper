import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight, Eye } from 'lucide-react';
import galleryData from '../../../data/gallery.json';
import business from '../../../config/business';
import './Gallery.css';

// Show up to six installation photographs — however many the gallery has
const FEATURED_IMAGES = galleryData.items.slice(0, 6);

export default function Gallery({ compact = false }) {
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveItem(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Nothing in the gallery yet — skip the section rather than render an empty grid
  if (FEATURED_IMAGES.length === 0) return null;

  return (
    <section className="gallery-section" id="gallery-preview" aria-label="Featured installation builds">
      <div className="container">
        <header className="gallery-section__header">
          <span className="section-label">STUDIO INSTALLATION SHOWCASE</span>
          <h2 className="gallery-section__title">
            Our <span className="gallery-section__title-accent">Craftsmanship</span>
          </h2>
          <p className="gallery-section__subtitle">
            A curated look at customer vehicle upgrades completed at our {business.location.split(',')[0]} studio in {business.city} with <span className="text-red">zero</span> wire cutting.
          </p>
        </header>

        {/* Editorial asymmetric grid — first card featured, up to six total */}
        <div className="gallery-five-grid" role="region" aria-label="Curated installation photographs">
          {FEATURED_IMAGES.map((item, index) => {
            const isFeatured = index === 0;
            return (
              <article
                key={item.id}
                className={`gallery-five-card ${isFeatured ? 'gallery-five-card--featured' : ''}`}
                onClick={() => setActiveItem(item)}
                tabIndex={0}
                role="button"
                aria-label={`Inspect ${item.title || item.category} on ${item.car || 'vehicle'}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveItem(item);
                  }
                }}
              >
                <img
                  src={item.src}
                  alt={item.alt || `${item.title} fitment on ${item.car}`}
                  className="gallery-five-card__img"
                  loading="lazy"
                />
                <div className="gallery-five-card__overlay" aria-hidden="true" />
                <div className="gallery-five-card__bottom">
                  <span className="gallery-five-card__badge" style={{color:'#fff'}}>{item.category}</span>
                  <h3 className="gallery-five-card__title" style={{color:'#fff'}}>
                    {item.title}
                  </h3>
                  {item.car && (
                    <span className="gallery-five-card__car" style={{color:'rgba(255,255,255,0.8)'}}>{item.car}</span>
                  )}
                </div>
                <div className="gallery-five-card__inspect-icon" aria-hidden="true">
                  <Eye size={16} />
                </div>
              </article>
            );
          })}
        </div>

        <div className="gallery-footer-cta">
          <Link to="/gallery" className="gallery-explore-btn">
            <span>Explore Complete Gallery</span>
            <ArrowRight size={15} className="btn-icon" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          className="gallery-lightbox"
          onClick={() => setActiveItem(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image detail modal"
        >
          <button
            type="button"
            className="gallery-lightbox__close"
            onClick={() => setActiveItem(null)}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
          <div
            className="gallery-lightbox__content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeItem.src}
              alt={activeItem.alt || activeItem.title}
              className="gallery-lightbox__img"
            />
            <div className="gallery-lightbox__caption">
              <span className="gallery-lightbox__category" style={{color:'#fff'}}>{activeItem.category}</span>
              <h3 style={{color:'#fff'}}>{activeItem.title}</h3>
              {activeItem.car && <p style={{color:'rgba(255,255,255,0.8)'}}>{activeItem.car} · {business.location.split(',')[0]} Studio</p>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
