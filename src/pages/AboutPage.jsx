import { Helmet } from 'react-helmet-async';
import business, { fillTokens } from '../config/business';
import faqsData from '../data/faqs.json';
import aboutData from '../data/about.json';
import Breadcrumbs from '../components/ui/Breadcrumbs/Breadcrumbs';
import CTASection from '../components/ui/CTASection/CTASection';
import FAQ from '../components/ui/FAQ/FAQ';
import ProcessJourney from '../components/sections/ProcessJourney/ProcessJourney';
import './AboutPage.css';
import {
  MapPin,
  Navigation,
  Clock,
  Phone,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';

const standards = aboutData.standards;
const rangeGroups = aboutData.rangeGroups;

export default function AboutPage() {
  const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'About Us' }];
  const whatsappMessage = encodeURIComponent(
    `Hello ${business.name}, I would like to visit your studio at ${business.location} for car upgrades.`
  );
  const whatsappLink = `https://wa.me/${business.whatsapp}?text=${whatsappMessage}`;

  return (
    <>
      <Helmet>
        <title>{`About ${business.name} | ${business.location} | ${business.stats.yearsExperience}+ Years`}</title>
        <meta name="description" content={`Learn about ${business.name} in ${business.location} — ${business.stats.yearsExperience}+ years of experience serving ${business.stats.clientsServed}+ car owners with genuine accessories, zero wire-cutting installation, and showroom-quality fitment.`} />
        <link rel="canonical" href={`${business.siteUrl}/about`} />
        <meta property="og:title" content={`About ${business.name} | ${business.location}`} />
        <meta property="og:description" content={`${business.name} — ${business.city}'s premier automotive accessories & retrofit studio. ${business.stats.yearsExperience}+ years experience, ${business.stats.clientsServed}+ vehicles enhanced.`} />
      </Helmet>

      <div className="about-breadcrumb-wrap">
        <div className="container"><Breadcrumbs items={breadcrumbs} /></div>
      </div>

      {/* HERO */}
      <section className="about-hero" aria-labelledby="about-hero-title">
        <div className="about-hero__content">
          <span className="section-label">AUTOMOTIVE HERITAGE &amp; RETROFIT STUDIO</span>
          <h1 id="about-hero-title" className="about-hero__title">
            {business.city}'s Premier Car<br /><span className="about-hero__title-accent text-red">Accessories</span><br />Destination
          </h1>
          <p className="about-hero__subtitle">
            {business.name} at {business.address} — delivering precision automotive <span className="text-red">retrofits</span>, exterior lighting, interior luxury, and certified professional installation.
          </p>
        </div>
      </section>

      {/* STORY + STATS */}
      <section className="about-story" aria-labelledby="about-story-title">
        <div className="container">
          <header className="about-story__header">
            <span className="section-label">Our Story &amp; Craftsmanship</span>
            <h2 id="about-story-title" className="about-story__title">
              Your Car.
              <br />
              Our <span className="text-red">Expertise</span>.
            </h2>
          </header>

          <div className="about-story__grid">
            <div className="about-story__media">
              <img
                src="/images/about/showroom-upgrade.jpg"
                alt={fillTokens(aboutData.story.imageAlt)}
                className="about-story__img"
                loading="lazy"
              />
              <span className="about-story__caption">{fillTokens(aboutData.story.caption)}</span>
            </div>

            <div className="about-story__text">
              {aboutData.story.paragraphs.map((paragraph) => (
                <p key={paragraph}>{fillTokens(paragraph)}</p>
              ))}

              <div className="about-story__stats">
                {[
                  { num: `${business.stats.yearsExperience}+`, label: 'Years of Experience' },
                  { num: `${business.stats.clientsServed}+`, label: 'Vehicles Enhanced' },
                  { num: `${business.stats.accessoryCategories}+`, label: 'Accessory Categories' },
                ].map((s, i) => (
                  <div className="about-story__stat" key={i}>
                    <span className="about-story__stat-num">{s.num}</span>
                    <span className="about-story__stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STANDARDS */}
      <section className="about-standards" aria-labelledby="about-standards-title">
        <div className="container">
          <header className="about-standards__header">
            <span className="section-label">Engineering Standards</span>
            <h2 id="about-standards-title" className="about-standards__title">
              Why Choose <span className="text-red">Us</span>?
            </h2>
            <p className="about-standards__subtitle">
              {business.city}'s trusted destination for precision car modification, certified plug-and-play <span className="text-red">fitment</span>, and transparent service.
            </p>
          </header>

          <div className="about-standards__grid">
            {standards.map((item) => (
              <article className="about-standards__card" key={item.num}>
                <span className="about-standards__num">{item.num}</span>
                <h3 className="about-standards__card-title">{item.title}</h3>
                <p className="about-standards__card-desc">{fillTokens(item.desc)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* RANGE */}
      <section className="about-range" aria-labelledby="about-range-title">
        <div className="container">
          <header className="about-range__header">
            <span className="section-label">Core Specializations</span>
            <h2 id="about-range-title" className="about-range__title">
              Our Accessory <span className="text-red">Range</span>
            </h2>
          </header>

          <div className="about-range__grid">
            {rangeGroups.map((group, i) => (
              <article className="about-range__group" key={i}>
                <h3 className="about-range__group-title">{group.title}</h3>
                <ul className="about-range__list">
                  {group.items.map((item, j) => (
                    <li className="about-range__item" key={j}>
                      <span className="about-range__dot" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <ProcessJourney />

      {/* VISIT */}
      <section className="about-visit" aria-labelledby="about-visit-title">
        <div className="container">
          <header className="about-visit__header">
            <span className="section-label">Studio Directions</span>
            <h2 id="about-visit-title" className="about-visit__title">
              Visit Our <span className="text-red">Studio</span>
            </h2>
            <p className="about-visit__subtitle">
              {fillTokens(aboutData.visitIntro)}
            </p>
          </header>

          <div className="about-visit__grid">
            <article className="about-visit__card">
              <header className="about-visit__card-header">
                <span className="about-visit__pin" aria-hidden="true">
                  <MapPin size={22} />
                </span>
                <div>
                  <h3 className="about-visit__name">{business.name}</h3>
                  <span className="about-visit__area">{business.location}</span>
                </div>
              </header>

              <ul className="about-visit__details">
                <li className="about-visit__detail">
                  <Navigation size={16} className="about-visit__detail-icon" aria-hidden="true" />
                  <div>
                    <span className="about-visit__detail-label">Studio Address</span>
                    <p>{business.address}</p>
                    <span className="about-visit__detail-meta">Landmark: {business.landmark}</span>
                  </div>
                </li>
                <li className="about-visit__detail">
                  <Clock size={16} className="about-visit__detail-icon" aria-hidden="true" />
                  <div>
                    <span className="about-visit__detail-label">Working Hours</span>
                    <p>{business.hours.weekdays.days}: {business.hours.weekdays.open} – {business.hours.weekdays.close}</p>
                    <p>{business.hours.sunday.days}: {business.hours.sunday.open} – {business.hours.sunday.close}</p>
                  </div>
                </li>
                <li className="about-visit__detail">
                  <Phone size={16} className="about-visit__detail-icon" aria-hidden="true" />
                  <div>
                    <span className="about-visit__detail-label">Direct Hotline</span>
                    <p><a href={business.callHref}>{business.phone}</a></p>
                  </div>
                </li>
              </ul>

              <div className="about-visit__actions">
                <a
                  href={business.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-visit__btn"
                >
                  <span>Get Directions</span>
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-visit__btn"
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </article>

            <div className="about-visit__map">
              <iframe
                src={business.mapUrl}
                title={`${business.name} location map — ${business.location}`}
                className="about-visit__map-iframe"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="about-faq" aria-labelledby="about-faq-title">
        <div className="container">
          <header className="about-faq__header">
            <span className="section-label">Common Questions</span>
            <h2 id="about-faq-title" className="about-faq__title">
              About {business.name}
            </h2>
          </header>
          <div className="about-faq__wrap">
            <FAQ faqs={faqsData.about} />
          </div>
        </div>
      </section>

      <CTASection
        title={<>Visit Us in {business.location.split(',')[0]}, <span className="text-red">{business.city}</span></>}
        subtitle={<>Come in with your car or WhatsApp your requirements and our specialists will help you choose the right <span className="text-red">accessories</span>.</>}
        primaryCta={{ label: 'Contact Us', href: '/contact' }}
        whatsappMessage={`Hi ${business.name}, I would like to know more about your car accessories.`}
        dark={true}
      />
    </>
  );
}
