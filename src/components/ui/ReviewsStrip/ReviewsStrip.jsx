import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Star, Quote, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import reviewsData from '../../../data/reviews.json';
import business from '../../../config/business';
import './ReviewsStrip.css';

function StarRow({ rating }) {
  return (
    <div className="rs-card__stars" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={13}
          className={i <= rating ? 'rs-card__star--filled' : 'rs-card__star--empty'}
          fill={i <= rating ? 'currentColor' : 'none'}
          stroke="currentColor"
        />
      ))}
    </div>
  );
}

const AVATAR_COLORS = [
  'hsl(4,72%,38%)',
  'hsl(220,60%,30%)',
  'hsl(160,55%,28%)',
  'hsl(35,70%,30%)',
  'hsl(265,50%,34%)',
  'hsl(190,60%,28%)',
];

export default function ReviewsStrip() {
  const reviews = reviewsData.reviews;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef(null);

  // Auto-advance every 4 seconds
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(id);
  }, [paused, reviews.length]);

  const goTo = (idx) => {
    setActive(idx);
    setPaused(true);
    setTimeout(() => setPaused(false), 8000);
  };
  const goPrev = () => goTo((active - 1 + reviews.length) % reviews.length);
  const goNext = () => goTo((active + 1) % reviews.length);

  return (
    <section className="rs-section" id="reviews" aria-label="Customer testimonials">
      <div className="container">

        {/* ── Header ── */}
        <div className="rs-header">
          <span className="section-label">Testimonials</span>
          <h2 className="rs-header__title">
            What Our Clients <span className="rs-header__accent">Say</span>
          </h2>
          <p className="rs-header__sub">
            Real upgrades. Real owners. Real <span className="text-red">{business.city}</span> roads.
          </p>
        </div>

        {/* ── Rating Bar ── */}
        <div className="rs-rating-bar">
          <div className="rs-rating-bar__score">
            <span className="rs-rating-bar__num">{reviewsData.rating}</span>
            <div className="rs-rating-bar__stars">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} size={16} fill="currentColor" stroke="currentColor" className="rs-rating-bar__star" />
              ))}
            </div>
            <span className="rs-rating-bar__label">{reviewsData.totalReviews} Google Reviews</span>
          </div>
          <div className="rs-rating-bar__divider" aria-hidden="true" />
          <p className="rs-rating-bar__tagline">
            {business.city}'s most-trusted car accessories studio for over {business.stats.yearsExperience} years.
          </p>
        </div>

        {/* ── Card Carousel ── */}
        <div
          className="rs-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          ref={trackRef}
        >
          <div
            className="rs-carousel__track"
            style={{ transform: `translateX(calc(-${active * 100}% - ${active * 1.5}rem))` }}
          >
            {reviews.map((r, i) => (
              <article
                key={r.id || i}
                className={`rs-card ${i === active ? 'rs-card--active' : ''}`}
                aria-hidden={i !== active}
              >
                <span className="rs-card__quote-icon" aria-hidden="true">
                  <Quote size={36} fill="currentColor" stroke="none" />
                </span>

                <div className="rs-card__stars-row">
                  <StarRow rating={r.rating} />
                  {r.mod && <span className="rs-card__mod">{r.mod}</span>}
                </div>

                <blockquote className="rs-card__text">"{r.text}"</blockquote>

                <footer className="rs-card__footer">
                  <div
                    className="rs-card__avatar"
                    style={{ backgroundColor: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
                    aria-hidden="true"
                  >
                    {r.initials}
                  </div>
                  <div className="rs-card__author">
                    <span className="rs-card__name">{r.name}</span>
                    <span className="rs-card__car">{r.car}</span>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </div>

        {/* ── Dot + Arrow Nav ── */}
        <div className="rs-nav">
          <button className="rs-nav__arrow" onClick={goPrev} aria-label="Previous review">
            <ChevronLeft size={18} />
          </button>

          <div className="rs-nav__dots" role="tablist" aria-label="Select review">
            {reviews.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                aria-label={`Review ${i + 1}`}
                className={`rs-nav__dot ${i === active ? 'rs-nav__dot--active' : ''}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>

          <button className="rs-nav__arrow" onClick={goNext} aria-label="Next review">
            <ChevronRight size={18} />
          </button>
        </div>

        {/* ── Footer CTA ── */}
        <div className="rs-footer">
          <Link to="/reviews" className="rs-footer__cta">
            <span>Read All Reviews</span>
            <ArrowRight size={15} />
          </Link>
        </div>

      </div>
    </section>
  );
}
