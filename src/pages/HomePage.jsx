import { Helmet } from 'react-helmet-async';
import Hero from '../components/sections/Hero/Hero';
import AccessoriesSection from '../components/sections/AccessoriesSection/AccessoriesSection';
import WorkEthicsSection from '../components/sections/WorkEthics/WorkEthicsSection';
import CountUpStats from '../components/ui/CountUpStats/CountUpStats';
import ReviewsStrip from '../components/ui/ReviewsStrip/ReviewsStrip';
import Gallery from '../components/sections/Gallery/Gallery';
import FAQSection from '../components/sections/FAQSection/FAQSection';
import ContactSection from '../components/sections/ContactSection/ContactSection';
import business from '../data/business.json';

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'AutoPartsStore',
  name: business.name,
  description: 'Premium automotive accessories, bi-LED lighting, Android infotainment, 360° cameras, custom seat covers, and zero wire-cutting installation in Adambakkam, Chennai.',
  url: business.siteUrl,
  image: 'https://bumpertobumpercaraccessories.com/images/cars/jeep_compass.jpg',
  telephone: business.phoneHref || '9789550006',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Shop No. 1, Survey.No 27/2A, The ARK, Shop, Jawaharlal Nehru Salai, Usha Nagar, Vanuvampet',
    addressLocality: 'Adambakkam, Chennai',
    addressRegion: 'Tamil Nadu',
    postalCode: '600091',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 12.9863,
    longitude: 80.1983,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '21:30',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: '10:30',
      closes: '19:00',
    },
  ],
  sameAs: [business.instagram].filter(Boolean),
};

export default function HomePage() {
  const pageTitle = `${business.name} | Adambakkam, Chennai | Premium Auto Studio & Upgrades`;
  const pageDescription = `${business.name} in Adambakkam, Chennai — 15+ years experience, 1000+ car upgrades. Bi-LED headlights, Android touchscreens, 360° cameras, custom leather seats, and 7D mats with zero wire cutting. Call ${business.phoneHref || '9789550006'}.`;

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
        <meta property="og:image" content="/images/cars/jeep_compass.jpg" />
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
