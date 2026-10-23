import { Phone, Instagram } from 'lucide-react';
import business from '../../../data/business.json';

export default function UtilityBar() {
  const instagramUrl = business.instagram || 'https://www.instagram.com/bumpertobumpercaraccessories/';
  const phoneHref = business.phoneHref || '9789550006';
  const phoneDisplay = business.phone || '9789550006';

  return (
    <div className="header-utility-bar" role="region" aria-label="Store contact bar">
      <div className="container header-utility-bar__inner">
        {/* Left: Direct Hotline */}
        <div className="header-utility-bar__left">
          <a
            href={`tel:${phoneHref}`}
            className="header-utility-bar__item header-utility-bar__phone"
            aria-label={`Call Bumper To Bumper Car Accessories at ${phoneDisplay}`}
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
            <span>The ARK, Adambakkam, Chennai</span>
          </span>

          <span className="header-utility-bar__sep" aria-hidden="true">|</span>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="header-utility-bar__item header-utility-bar__instagram"
            aria-label="Bumper To Bumper Car Accessories on Instagram"
          >
            <Instagram size={12} className="header-utility-bar__icon" aria-hidden="true" />
            <span className="header-utility-bar__text">Instagram</span>
          </a>
        </div>
      </div>
    </div>
  );
}
