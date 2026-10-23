import { Link } from 'react-router-dom';
import { MessageCircle, ChevronRight, Instagram } from 'lucide-react';
import business from '../../../data/business.json';
import { renderHeadingWithRed, renderSubheadingWithRed } from '../../../utils/textUtils';
import './CTASection.css';

export default function CTASection({
  label,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  whatsappMessage,
  variant = 'dark',
  primaryIcon: PrimaryIcon,
}) {
  const whatsappUrl = `https://wa.me/${business.whatsapp || '9789550006'}?text=${encodeURIComponent(whatsappMessage || 'Hello Bumper To Bumper Car Accessories, I would like to enquire about your services.')}`;
  const instagramUrl = business.instagram || business.social?.instagram;

  const primary = primaryCta ? {
    label: primaryCta.label || primaryCta.text || 'Get a Quote',
    href: primaryCta.href || primaryCta.link || '/contact',
  } : { label: 'Get a Quote', href: '/contact' };

  return (
    <section className={`cta-section cta-section--${variant}`}>
      <div className="cta-section__pattern" aria-hidden="true" />
      <div className="container">
        <div className="cta-section__content">
          {label && <span className="cta-section__label">{label}</span>}
          <h2 className="cta-section__title">{renderHeadingWithRed(title)}</h2>
          {subtitle && <p className="cta-section__subtitle">{renderSubheadingWithRed(subtitle)}</p>}
          <div className="cta-section__actions">
            <Link to={primary.href} className="cta-section__btn">
              <span>{primary.label}</span>
              {PrimaryIcon ? (
                <PrimaryIcon size={16} className="cta-section__btn-icon" />
              ) : (
                <ChevronRight size={16} className="cta-section__btn-icon" />
              )}
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-section__icon-btn"
              aria-label="Chat with us on WhatsApp"
            >
              <MessageCircle size={18} />
            </a>
            {instagramUrl && instagramUrl !== '#' && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-section__icon-btn"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={18} />
              </a>
            )}
            {secondaryCta && (
              <Link
                to={secondaryCta.href || secondaryCta.link || '/'}
                className="cta-section__btn"
              >
                {secondaryCta.label || secondaryCta.text}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
