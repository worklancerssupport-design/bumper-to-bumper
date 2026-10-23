import { ShieldCheck, CheckCircle2, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import business from '../../../data/business.json';
import './WorkEthicsSection.css';

export default function WorkEthicsSection() {
  const phoneHref = business.phoneHref || '9789550006';

  return (
    <section className="work-ethics-section" aria-labelledby="ethics-heading">
      <div className="container">
        <div className="work-ethics-grid">

          {/* Left Column: Authentic Showroom/Store Photography */}
          <div className="work-ethics-media">
            <div className="work-ethics-media__frame">
              <img
                src="/images/about/about-showroom-upgrade.jpg"
                alt="Bumper To Bumper Car Accessories Showroom and Installation Bay in Adambakkam Chennai"
                className="work-ethics-media__img"
                loading="lazy"
              />
              <div className="work-ethics-media__badge">
                <span className="work-ethics-media__badge-title">15+ Years</span>
                <span className="work-ethics-media__badge-sub">Chennai Automotive Excellence</span>
              </div>
            </div>
          </div>

          {/* Right Column: SEO Content About Work Ethics & Customer Approach */}
          <div className="work-ethics-content">
            <span className="work-ethics-eyebrow">OUR COMMITMENT &amp; VALUES</span>
            <h2 id="ethics-heading" className="work-ethics-title">
              Quality Accessories. <span className="work-ethics-title-accent">Honest</span> Service.
            </h2>
            <p className="work-ethics-subtitle">
              Transparent guidance and OEM-grade fitment standards designed for your peace of <span className="text-red">mind</span>.
            </p>

            <div className="work-ethics-text">
              <p>
                At <strong>Bumper To Bumper Car Accessories</strong>, we believe choosing accessories for your vehicle should be straightforward, transparent, and informed. As a trusted <strong>car accessories shop in Adambakkam, Chennai</strong>, located at The ARK on Jawaharlal Nehru Salai near Vanuvampet, we focus on helping car owners explore suitable products, understand fitment options, and select upgrades tailored to their personal preferences.
              </p>
              <p>
                Our approach emphasizes clear communication, attention to product details, and a customer-first experience. Whether you are looking for premium <strong>interior car accessories</strong> like customized leather seat covers and ambient lighting, or durable <strong>exterior car accessories</strong> such as bi-LED headlights, spoilers, and body styling, our team aims to make your upgrade journey effortless.
              </p>
            </div>

            {/* Core Values Bullet Highlights */}
            <div className="work-ethics-highlights">
              <div className="work-ethics-highlight-item">
                <CheckCircle2 size={18} className="work-ethics-highlight-icon" aria-hidden="true" />
                <div>
                  <strong>Genuine Product Selection</strong>
                  <p>Handpicked accessories for high durability and OEM compatibility across Chennai vehicles.</p>
                </div>
              </div>

              <div className="work-ethics-highlight-item">
                <CheckCircle2 size={18} className="work-ethics-highlight-icon" aria-hidden="true" />
                <div>
                  <strong>Zero Pressure Guidance</strong>
                  <p>Transparent advice without aggressive upselling — you choose what fits your vehicle and budget.</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="work-ethics-actions">
              <Link to="/about" className="work-ethics-btn-primary">
                <span>Learn About Our Studio</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>

              <a href={`tel:${phoneHref}`} className="work-ethics-phone-link">
                <Phone size={14} className="work-ethics-phone-icon" aria-hidden="true" />
                <span>Call {business.phone || '9789550006'}</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
