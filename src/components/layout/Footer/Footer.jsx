import { Link } from 'react-router-dom';
import { Instagram, MapPin, Phone, Clock, Mail, ShieldCheck } from 'lucide-react';
import business from '../../../data/business.json';
import exteriorData from '../../../data/products/exterior.json';
import interiorData from '../../../data/products/interior.json';
import './Footer.css';

const categoryRoutes = {
  exterior: '/exterior-car-accessories-chennai',
  interior: '/interior-car-accessories-chennai',
};

const popularUpgrades = [
  ...exteriorData.items.filter(p => p.showInFooter || ['fog-light-fog-projector', 'headlight-led-upgrade', 'drl-headlight-fog'].includes(p.slug)),
  ...interiorData.items.filter(p => p.showInFooter || ['ambient-lights', 'premium-car-seat-covers', 'infotainment-systems'].includes(p.slug)),
].slice(0, 8);

export default function Footer() {
  const phoneDisplay = business.phone || '+91 97895 50006';
  const phoneHref = business.phoneHref || '9789550006';
  const instaUrl = business.instagram || 'https://www.instagram.com/bumpertobumpercaraccessories/';

  return (
    <footer className="footer">
      <div className="container">

        {/* ── Trust Banner Strip above footer columns ────────── */}
        <div className="footer-trust-banner">
          <div className="footer-trust-item">
            <span className="footer-trust-icon">★</span>
            <div>
              <strong>15+ Years Experience</strong>
              <p>Trusted by 1,000+ vehicle owners in Chennai</p>
            </div>
          </div>
          <div className="footer-trust-item">
            <span className="footer-trust-icon"><ShieldCheck size={20} /></span>
            <div>
              <strong>Zero Wire-Cutting Fitment</strong>
              <p>100% plug &amp; play couplers protect warranty</p>
            </div>
          </div>
          <div className="footer-trust-item">
            <span className="footer-trust-icon">📍</span>
            <div>
              <strong>Prime Adambakkam Studio</strong>
              <p>The ARK, Jawaharlal Nehru Salai, Chennai</p>
            </div>
          </div>
        </div>

        {/* ── Footer Grid ───────────────────────────────────── */}
        <div className="footer-grid">

          <div className="footer-col footer-col--brand">
            <div className="footer-brand">
              <Link to="/" className="footer-logo" aria-label="Bumper To Bumper Car Accessories">
                <img
                  src="/logo.svg"
                  alt="Bumper To Bumper Car Accessories"
                  className="footer-logo-img"
                  width="240"
                  height="46"
                />
              </Link>
              <p className="footer-desc">
                Chennai's premier automotive accessories and retrofit studio. Precision OEM fitment, zero wire-cutting craftsmanship, and over 15 years of dedication to enhancing every drive.
              </p>
              <div className="footer-socials" aria-label="Social media links">
                <a
                  href={instaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link footer-social-link--ig"
                  aria-label="Follow Bumper To Bumper on Instagram"
                >
                  <Instagram size={17} />
                  <span>@bumpertobumpercaraccessories</span>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">Studio <span className="text-red">Navigation</span></h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/exterior-car-accessories-chennai">Exterior Upgrades</Link></li>
              <li><Link to="/interior-car-accessories-chennai">Interior Styling</Link></li>
              <li><Link to="/gallery">Gallery Showcase</Link></li>
              <li><Link to="/about">About Studio</Link></li>
              <li><Link to="/reviews">Customer Reviews</Link></li>
              <li><Link to="/contact">Contact &amp; Location</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">Popular <span className="text-red">Upgrades</span></h3>
            <ul className="footer-links">
              {popularUpgrades.map(p => (
                <li key={p.id}>
                  <Link to={`${categoryRoutes[p.category]}/${p.slug}`}>
                    {p.navName || p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col footer-col--contact">
            <h3 className="footer-col-title">Studio <span className="text-red">Location</span></h3>
            <ul className="footer-contact-list">
              <li>
                <div className="footer-contact-item">
                  <span className="footer-contact-item-icon"><MapPin size={15} /></span>
                  <div className="footer-contact-item-body">
                    <span className="footer-contact-item-label">Address</span>
                    <span className="footer-contact-item-value">{business.address}</span>
                  </div>
                </div>
              </li>
              <li>
                <a href={`tel:${phoneHref}`} className="footer-contact-item">
                  <span className="footer-contact-item-icon"><Phone size={15} /></span>
                  <div className="footer-contact-item-body">
                    <span className="footer-contact-item-label">Phone &amp; WhatsApp (Click to Call)</span>
                    <span className="footer-contact-item-value footer-contact-phone">{phoneDisplay}</span>
                  </div>
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="footer-contact-item">
                  <span className="footer-contact-item-icon"><Mail size={15} /></span>
                  <div className="footer-contact-item-body">
                    <span className="footer-contact-item-label">Email Enquiry</span>
                    <span className="footer-contact-item-value">{business.email}</span>
                  </div>
                </a>
              </li>
              <li>
                <div className="footer-contact-item">
                  <span className="footer-contact-item-icon"><Clock size={15} /></span>
                  <div className="footer-contact-item-body">
                    <span className="footer-contact-item-label">Opening Hours</span>
                    <span className="footer-contact-item-value">{business.hours.weekdays.days}: {business.hours.weekdays.open} – {business.hours.weekdays.close}</span>
                    <span className="footer-contact-item-value">{business.hours.sunday.days}: {business.hours.sunday.open} – {business.hours.sunday.close}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* ── Footer Bottom Bar ──────────────────────────────── */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Bumper To Bumper Car Accessories. All rights reserved.</p>
          <div className="footer-bottom-meta">
            <span>Vanuvampet, Adambakkam</span>
            <span className="footer-bottom-meta-sep">·</span>
            <span>Chennai, Tamil Nadu</span>
            <span className="footer-bottom-meta-sep">·</span>
            <span className="footer-bottom-tagline">Automotive Upgrades &amp; Customization</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
