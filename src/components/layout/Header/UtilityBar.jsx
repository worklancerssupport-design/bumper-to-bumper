import { Phone, Instagram } from 'lucide-react';
import business from '../../../config/business';

export default function UtilityBar() {
  const phoneDisplay = business.phone;

  return (
    <div className="header-utility-bar" role="region" aria-label="Store contact bar">
      <div className="container header-utility-bar__inner">
        {/* Left: Direct Hotline */}
        <div className="header-utility-bar__left">
          <a
            href={business.callHref}
            className="header-utility-bar__item header-utility-bar__phone"
            aria-label={`Call ${business.name} at ${phoneDisplay}`}
          >
            <Phone size={12} className="header-utility-bar__icon" aria-hidden="true" />
            <span className="header-utility-bar__text">
              <span className="header-utility-bar__label">HOTLINE:</span>{' '}
              <strong>{phoneDisplay}</strong>
            </span>
          </a>
        </div>

        {/* Right: Instagram & Location */}
        <div className="header-utility-bar__right">
          <span className="header-utility-bar__item header-utility-bar__location">
            <span>{business.landmark}</span>
          </span>

          <span className="header-utility-bar__sep" aria-hidden="true">|</span>

          <a
            href={business.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="header-utility-bar__item header-utility-bar__instagram"
            aria-label={`${business.name} on Instagram`}
          >
            <Instagram size={12} className="header-utility-bar__icon" aria-hidden="true" />
            <span className="header-utility-bar__text">Instagram</span>
          </a>
        </div>
      </div>
    </div>
  );
}
