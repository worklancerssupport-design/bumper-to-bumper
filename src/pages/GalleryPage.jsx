import { useState, useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import business from '../data/business.json';
import Breadcrumbs from '../components/ui/Breadcrumbs/Breadcrumbs';
import CTASection from '../components/ui/CTASection/CTASection';
import galleryData from '../data/gallery.json';
import './GalleryPage.css';
import { X, ChevronRight } from 'lucide-react';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = useMemo(
    () => (activeCategory === 'All'
      ? galleryData.items
      : galleryData.items.filter((i) => i.category === activeCategory)),
    [activeCategory]
  );

  const counts = useMemo(() => {
    const map = { All: galleryData.items.length };
    galleryData.items.forEach((i) => {
      map[i.category] = (map[i.category] || 0) + 1;
    });
    return map;
  }, []);

  const openLightbox = useCallback((item) => setLightbox(item), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Gallery' }];

  return (
    <>
      <Helmet>
        <title>Car Accessories Gallery | Bumper To Bumper Car Accessories Chennai</title>
        <meta name="description" content="View our gallery of car accessory installations — custom seat covers, ambient lighting, infotainment systems, bi-LED fog lights, 360° cameras, and audio setups at Bumper To Bumper Car Accessories, Adambakkam, Chennai." />
        <link rel="canonical" href={`${business.siteUrl}/gallery`} />
        <meta property="og:title" content="Gallery | Bumper To Bumper Car Accessories Chennai" />
        <meta property="og:description" content="Car accessories and customization gallery — Bumper To Bumper Car Accessories, Adambakkam, Chennai." />
      </Helmet>

      <div className="gallery-breadcrumb-wrap">
        <div className="container"><Breadcrumbs items={breadcrumbs} /></div>
      </div>

      <section className="gallery-hero">
        <div className="gallery-hero__content">
          <span className="section-label">Our Work</span>
          <h1 className="gallery-hero__title">
            Installation <span className="gallery-hero__title-accent"><br/>Gallery</span>
          </h1>
          <p className="gallery-hero__subtitle">
            A curated look at the work that has come through our workshop — exterior
            accessories, interior customisation, lighting, infotainment, audio, and
            cameras, fitted with care on every <span className="text-red">car</span>.
          </p>

          <div className="gallery-stats">
            <div className="gallery-stat">
              <span className="gallery-stat__value">{galleryData.items.length}+</span>
              <span className="gallery-stat__label">Installations Completed</span>
            </div>
            <div className="gallery-stat">
              <span className="gallery-stat__value">{galleryData.categories.length - 1}</span>
              <span className="gallery-stat__label">Accessory Categories</span>
            </div>
            <div className="gallery-stat">
              <span className="gallery-stat__value">{business.stats.yearsExperience}+</span>
              <span className="gallery-stat__label">Years of Excellence</span>
            </div>
          </div>
        </div>
      </section>

      <section className="gallery-filters-section">
        <div className="container">
          <div className="gallery-filters" role="tablist" aria-label="Gallery categories">
            {galleryData.categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={`gallery-filter ${activeCategory === cat ? 'gallery-filter--active' : ''}`}
              >
                <span className="gallery-filter__label">{cat}</span>
                <span className="gallery-filter__count">{counts[cat] ?? 0}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="gallery-grid-section">
        <div className="container">
          <p className="gallery-grid__meta" aria-live="polite">
            <span className="gallery-grid__count">{filtered.length}</span>
            <span className="gallery-grid__label">
              {activeCategory === 'All' ? 'total projects' : `in ${activeCategory}`}
            </span>
          </p>

          {filtered.length > 0 ? (
            <div className="gallery-grid">
              {filtered.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className={`gallery-card ${item.featured ? 'gallery-card--featured' : ''}`}
                  onClick={() => openLightbox(item)}
                  aria-label={`View ${item.title || item.alt}`}
                >
                  <span className="gallery-card__media">
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      className="gallery-card__img"
                    />
                  </span>
                  {(item.title || item.car) && (
                    <span className="gallery-card__body">
                      {item.title && (
                        <span className="gallery-card__title" style={{color:'#fff'}}>{item.title}</span>
                      )}
                      <span className="gallery-card__meta">
                        {item.car && <span className="gallery-card__car" style={{color:'rgba(255,255,255,0.8)'}}>{item.car}</span>}
                        {item.car && item.category && <span className="gallery-card__sep" aria-hidden="true">·</span>}
                        {item.category && <span className="gallery-card__cat" style={{color:'rgba(255,255,255,0.8)'}}>{item.category}</span>}
                      </span>
                    </span>
                  )}
                  <span className="gallery-card__cta" aria-hidden="true">
                    View <ChevronRight size={14} className="gallery-card__cta-icon" />
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="gallery-empty">
              <p className="gallery-empty__text">No projects in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      <CTASection
        title={<>Want This On Your <span className="text-red">Car</span>?</>}
        subtitle={<>Visit Bumper To Bumper Car Accessories in Adambakkam, Chennai, or send us a message with your car model and the <span className="text-red">accessory</span> you are looking for.</>}
        primaryCta={{ label: 'Book Fitment Slot', href: '/contact' }}
        whatsappMessage="Hi Bumper To Bumper Car Accessories, I would like to enquire about an accessory I saw in your gallery."
        dark={true}
      />

      {lightbox && (
        <div
          className="gallery-lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <button
            type="button"
            className="gallery-lightbox__close"
            onClick={closeLightbox}
            aria-label="Close image viewer"
          >
            <X size={22} />
          </button>
          <div className="gallery-lightbox__inner" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="gallery-lightbox__img"
            />
            {(lightbox.title || lightbox.car) && (
              <p className="gallery-lightbox__caption">
                {lightbox.title && <span className="gallery-lightbox__title" style={{color:'#fff'}}>{lightbox.title}</span>}
                {lightbox.title && lightbox.car && <span className="gallery-lightbox__sep" aria-hidden="true"> · </span>}
                {lightbox.car && <span className="gallery-lightbox__car" style={{color:'rgba(255,255,255,0.8)'}}>{lightbox.car}</span>}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
