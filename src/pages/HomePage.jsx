import { Helmet } from 'react-helmet-async';
import Hero from '../components/sections/Hero/Hero';
import AccessoriesSection from '../components/sections/AccessoriesSection/AccessoriesSection';
import WorkEthicsSection from '../components/sections/WorkEthics/WorkEthicsSection';
import CountUpStats from '../components/ui/CountUpStats/CountUpStats';
import ReviewsStrip from '../components/ui/ReviewsStrip/ReviewsStrip';
import Gallery from '../components/sections/Gallery/Gallery';
import FAQSection from '../components/sections/FAQSection/FAQSection';
import ContactSection from '../components/sections/ContactSection/ContactSection';
import business, { to24h } from '../config/business';

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'AutoPartsStore',
  name: business.name,
  description: `${business.tagline} — premium automotive accessories, bi-LED lighting, Android infotainment, 360° cameras, custom seat covers, and zero wire-cutting installation in ${business.location}.`,
  url: business.siteUrl,
  image: `${business.siteUrl}/images/home/hero.jpg`,
  telephone: business.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: business.street,
    addressLocality: business.location,
    addressRegion: business.state,
    postalCode: business.pincode,
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: business.geo.latitude,
    longitude: business.geo.longitude,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: to24h(business.hours.weekdays.open),
      closes: to24h(business.hours.weekdays.close),
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: to24h(business.hours.sunday.open),
      closes: to24h(business.hours.sunday.close),
    },
  ],
  sameAs: [business.social.instagram, business.social.youtube].filter(Boolean),
};

export default function HomePage() {
  const pageTitle = `${business.name} | ${business.location} | Premium Auto Studio & Upgrades`;
  const pageDescription = `${business.name} in ${business.location} — ${business.stats.yearsExperience}+ years experience, ${business.stats.clientsServed}+ car upgrades. Bi-LED headlights, Android touchscreens, 360° cameras, custom leather seats, and 7D mats with zero wire cutting. Call ${business.phone}.`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={business.siteUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={business.siteUrl} />
        <meta property="og:image" content="/images/home/hero.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>

      {/* 01. Cinematic Hero with Hovering Vehicle Background & 6-Model Switcher */}
      <Hero />

      {/* 02. Top-Tier Accessories & Upgrades (Immediately Below Hero) */}
      <AccessoriesSection />

      {/* 03. Quality Accessories. Honest Service. (SEO Content & Work Ethics) */}
      <WorkEthicsSection />

      {/* 04. Studio Craftsmanship & Guarantees */}
      <CountUpStats />

      {/* 05. Customer Testimonials */}
      <ReviewsStrip />

      {/* 06. Installation Gallery (Exactly 5 Curated Photographs) */}
      <Gallery compact={true} />

      {/* 07. Frequently Asked Questions */}
      <FAQSection />

      {/* 08. Studio Consultation & Quote Section */}
      <ContactSection />
    </>
  );
}
