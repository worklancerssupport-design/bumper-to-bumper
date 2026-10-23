import { Helmet } from 'react-helmet-async';
import business, { fillTokens } from '../config/business';
import Breadcrumbs from '../components/ui/Breadcrumbs/Breadcrumbs';
import CTASection from '../components/ui/CTASection/CTASection';
import reviewsData from '../data/reviews.json';
import './ReviewsPage.css';
import { Star, ExternalLink, Quote } from 'lucide-react';

function StarRating({ rating }) {
  return (
    <div className="star-rating" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={16}
          className={i <= rating ? 'star--filled' : 'star--empty'}
          fill={i <= rating ? 'currentColor' : 'none'}
          stroke="currentColor"
        />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Reviews' }];
  const totalCount = reviewsData.reviews.length;

  return (
    <>
      <Helmet>
        <title>{`Customer Reviews | ${business.siteName}`}</title>
        <meta name="description" content={`See what customers say about ${business.name}, ${business.location}. ${business.stats.yearsExperience}+ years of serving car owners with genuine accessories and professional zero wire-cutting installation.`} />
        <link rel="canonical" href={`${business.siteUrl}/reviews`} />
        <meta property="og:title" content={`Reviews | ${business.siteName}`} />
        <meta property="og:description" content={`Customer reviews for ${business.name}, ${business.location}.`} />
      </Helmet>

      <div className="reviews-breadcrumb-wrap">
        <div className="container"><Breadcrumbs items={breadcrumbs} /></div>
      </div>

      <section className="reviews-hero section--dark">
        <div className="reviews-hero__overlay" />
        <div className="container reviews-hero__content">
          <span className="section-label">Customer Feedback</span>
          <h1 className="reviews-hero__title">
            What Our <span className="reviews-hero__title-accent">Customers</span> Say
          </h1>
          <p className="reviews-hero__subtitle">
            We have been serving car owners in {business.city} for over {business.stats.yearsExperience} years.
            Here is what some of our customers have shared about their <span className="text-red">experience</span>.
          </p>

          <div className="reviews-stats">
            <div className="reviews-stat reviews-stat--featured">
              <span className="reviews-stat__value">
                {reviewsData.rating}
                <span className="reviews-stat__suffix">/5</span>
              </span>
              <span className="reviews-stat__label">Average Rating</span>
              <div className="reviews-stat__stars" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={16} fill="currentColor" stroke="currentColor" />
                ))}
              </div>
            </div>
            <div className="reviews-stat">
              <span className="reviews-stat__value">{reviewsData.totalReviews}</span>
              <span className="reviews-stat__label">{fillTokens(reviewsData.totalReviewsLabel)}</span>
            </div>
            <div className="reviews-stat">
              <span className="reviews-stat__value">{totalCount}</span>
              <span className="reviews-stat__label">Reviews Below</span>
            </div>
          </div>
        </div>
      </section>

      <section className="reviews-grid-section">
        <div className="container">
          <div className="reviews-grid">
            {reviewsData.reviews.map((review, i) => (
              <article className="review-card" key={review.id || i}>
                <span className="review-card__quote" aria-hidden="true">
                  <Quote size={48} fill="currentColor" stroke="none" />
                </span>
                <div className="review-card__header">
                  <div
                    className="review-card__avatar"
                    style={{ backgroundColor: `hsl(${(i * 47) % 360}, 65%, 35%)` }}
                    aria-hidden="true"
                  >
                    {review.initials}
                  </div>
                  <div className="review-card__meta">
                    <div className="review-card__name">{review.name}</div>
                    {review.car && (
                      <div className="review-card__car">{review.car}</div>
                    )}
                  </div>
                </div>

                <StarRating rating={review.rating} />

                {review.mod && (
                  <span className="review-card__mod">{review.mod}</span>
                )}

                <p className="review-card__text">{review.text}</p>
              </article>
            ))}
          </div>

          <div className="reviews-google-cta">
            {business.googleReviewsUrl ? (
              <a
                href={business.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                <ExternalLink size={18} />
                View Our Google Reviews
              </a>
            ) : (
              <p className="reviews-google-cta__placeholder">
                Configure <code>googleReviewsUrl</code> in <code>src/config/business.js</code> to add a link to your Google Business reviews.
              </p>
            )}
          </div>
        </div>
      </section>

      <CTASection
        title={<>Ready to Experience Our <span className="text-red">Service</span>?</>}
        subtitle={<>Visit our studio at {business.landmark}, {business.location} or WhatsApp your <span className="text-red">requirements</span>.</>}
        primaryCta={{ label: 'Contact Us', href: '/contact' }}
        whatsappMessage={`Hello ${business.name}, I would like to enquire about your car accessories.`}
        dark={true}
      />
    </>
  );
}
