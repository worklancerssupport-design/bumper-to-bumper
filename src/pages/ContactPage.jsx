import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import business from '../data/business.json';
import formsData from '../data/forms.json';
import Breadcrumbs from '../components/ui/Breadcrumbs/Breadcrumbs';
import CTASection from '../components/ui/CTASection/CTASection';
import './ContactPage.css';
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Name is required';
  if (!form.phone.trim()) errors.phone = 'Phone number is required';
  else if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) errors.phone = 'Enter a valid 10-digit number';
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email';
  if (!form.service) errors.service = 'Please select a service';
  return errors;
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', carModel: '', service: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Contact' }];

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const lines = [`Hello ${business.name}, I have an enquiry from the website.`, ''];
      lines.push(`Name: ${form.name}`);
      lines.push(`Phone: ${form.phone}`);
      if (form.email) lines.push(`Email: ${form.email}`);
      if (form.carModel) lines.push(`Car: ${form.carModel}`);
      if (form.service) lines.push(`Service: ${form.service}`);
      if (form.message) { lines.push(''); lines.push('Message:'); lines.push(form.message); }
      const url = `https://wa.me/${business.whatsapp || '9789550006'}?text=${encodeURIComponent(lines.join('\n'))}`;
      const opened = window.open(url, '_blank');
      if (!opened) window.location.href = url;
      setSuccess(true);
      setForm({ name: '', phone: '', email: '', carModel: '', service: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  const whatsappUrl = `https://wa.me/${business.whatsapp || '9789550006'}?text=${encodeURIComponent(`Hello ${business.name}, I would like to enquire about your services.`)}`;

  return (
    <>
      <Helmet>
        <title>Contact Bumper To Bumper Car Accessories | Adambakkam, Chennai | Get a Quote</title>
        <meta name="description" content="Contact Bumper To Bumper Car Accessories at The ARK, Jawaharlal Nehru Salai, Adambakkam, Chennai. Call 9789550006 or WhatsApp for car accessory installation, quotes & studio visit." />
        <link rel="canonical" href={`${business.siteUrl}/contact`} />
        <meta property="og:title" content="Contact Bumper To Bumper Car Accessories | Adambakkam Chennai" />
        <meta property="og:description" content="Get in touch with Bumper To Bumper Car Accessories in Adambakkam, Chennai for quotes and customization consultations. Call 9789550006." />
      </Helmet>

      <div className="contact-breadcrumb-wrap">
        <div className="container"><Breadcrumbs items={breadcrumbs} /></div>
      </div>

      {/* HERO */}
      <section className="contact-hero">
        <div className="contact-hero__content">
          <span className="section-label">Get in Touch</span>
          <h1 className="contact-hero__title">
            Let's <span className="contact-hero__title-accent text-red">Upgrade</span><br />Your Ride
          </h1>
          <p className="contact-hero__subtitle">
            Send us an enquiry, WhatsApp your car model, or visit our studio on Jawaharlal Nehru Salai, Adambakkam, <span className="text-red">Chennai</span>.
          </p>
          <div className="contact-hero__actions">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-hero__btn contact-hero__btn--primary"
            >
              <span>WhatsApp Us</span>
              <MessageCircle size={16} className="contact-hero__btn-icon" aria-hidden="true" />
            </a>
            <a
              href={`tel:${business.phoneHref || '9789550006'}`}
              className="contact-hero__btn contact-hero__btn--primary"
            >
              <span>Call Now</span>
              <Phone size={16} className="contact-hero__btn-icon" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* COMBINED: Form + Contact/Visit card */}
      <section className="section contact-main">
        <div className="container contact-main__grid">
          {/* LEFT: Form panel */}
          <div className="contact-form-panel">
            <header className="contact-form-panel__header">
              <h2 className="contact-form-panel__title">Send Us a <span className="text-red">Message</span></h2>
              <p className="contact-form-panel__intro">
                Share your car model and the accessories you are interested in.
                We will get back to you with options and <span className="text-red">pricing</span>.
              </p>
            </header>

            {success ? (
              <div className="contact-form-success">
                <CheckCircle2 size={48} style={{ color: 'var(--color-success)' }} />
                <h3>WhatsApp Opened</h3>
                <p>Your enquiry has been prepared in WhatsApp. Please tap send to complete.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                {errors.form && <div className="contact-form__error-banner">{errors.form}</div>}
                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label htmlFor="name">Full Name *</label>
                    <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your name" />
                    {errors.name && <span className="contact-form__error">{errors.name}</span>}
                  </div>
                  <div className="contact-form__field">
                    <label htmlFor="phone">Phone Number *</label>
                    <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="10-digit mobile number" />
                    {errors.phone && <span className="contact-form__error">{errors.phone}</span>}
                  </div>
                </div>

                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label htmlFor="email">Email Address</label>
                    <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />
                    {errors.email && <span className="contact-form__error">{errors.email}</span>}
                  </div>
                  <div className="contact-form__field">
                    <label htmlFor="carModel">Car Model &amp; Year</label>
                    <input id="carModel" name="carModel" type="text" value={form.carModel} onChange={handleChange} placeholder="e.g. Creta 2024 / Nexon EV" />
                  </div>
                </div>

                <div className="contact-form__field">
                  <label htmlFor="service">Accessory / Service Required *</label>
                  <select id="service" name="service" value={form.service} onChange={handleChange}>
                    <option value="">Select an accessory...</option>
                    {formsData.contactServices.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.service && <span className="contact-form__error">{errors.service}</span>}
                </div>

                <div className="contact-form__field">
                  <label htmlFor="message">Message / Specific Requirements</label>
                  <textarea id="message" name="message" rows="4" value={form.message} onChange={handleChange} placeholder="Tell us about the accessories or upgrades you have in mind..." />
                </div>

                <button type="submit" className="btn btn-primary contact-form__submit" disabled={loading}>
                  <span>{loading ? 'Submitting...' : 'Send Message on WhatsApp'}</span>
                  <Send size={16} className="btn-icon" aria-hidden="true" />
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: Contact details & Map */}
          <aside className="contact-info-panel" aria-label="Studio contact info">
            {/* Quick Contact Block */}
            <article className="contact-info__block">
              <h3 className="contact-info__title">Direct <span className="text-red">Contact</span></h3>
              <ul className="contact-info__list">
                <li className="contact-info__item">
                  <span className="contact-info__icon" aria-hidden="true">
                    <Phone size={16} />
                  </span>
                  <div>
                    <span className="contact-info__label">Phone / Click to Call</span>
                    <a href={`tel:${business.phoneHref || '9789550006'}`} className="contact-info__value">
                      {business.phone}
                    </a>
                  </div>
                </li>
                <li className="contact-info__item">
                  <span className="contact-info__icon" aria-hidden="true">
                    <MessageCircle size={16} />
                  </span>
                  <div>
                    <span className="contact-info__label">WhatsApp</span>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="contact-info__value">
                      +91 {business.whatsapp || '9789550006'}
                    </a>
                  </div>
                </li>
                {business.email && (
                  <li className="contact-info__item">
                    <span className="contact-info__icon" aria-hidden="true">
                      <Mail size={16} />
                    </span>
                    <div>
                      <span className="contact-info__label">Email</span>
                      <a href={`mailto:${business.email}`} className="contact-info__value">
                        {business.email}
                      </a>
                    </div>
                  </li>
                )}
              </ul>
            </article>

            {/* Visit Us */}
            <article className="contact-info__block">
              <h3 className="contact-info__title">Visit the <span className="text-red">Studio</span></h3>
              <ul className="contact-info__list">
                <li className="contact-info__item">
                  <span className="contact-info__icon" aria-hidden="true">
                    <MapPin size={16} />
                  </span>
                  <div>
                    <span className="contact-info__label">Studio Address</span>
                    <span className="contact-info__value contact-info__value--text">{business.address}</span>
                  </div>
                </li>
                <li className="contact-info__item">
                  <span className="contact-info__icon" aria-hidden="true">
                    <Clock size={16} />
                  </span>
                  <div>
                    <span className="contact-info__label">Working Hours</span>
                    <span className="contact-info__value contact-info__value--text">
                      {business.hours.weekdays.days}: {business.hours.weekdays.open} – {business.hours.weekdays.close}
                    </span>
                    <span className="contact-info__value contact-info__value--text">
                      {business.hours.sunday.days}: {business.hours.sunday.open} – {business.hours.sunday.close}
                    </span>
                  </div>
                </li>
              </ul>
            </article>

            {/* Embedded map */}
            <div className="contact-info__map">
              <iframe
                src="https://maps.google.com/maps?q=Shop%20No.%201,%20Survey.No%2027/2A,%20The%20ARK,%20Jawaharlal%20Nehru%20Salai,%20Vanuvampet,%20Adambakkam,%20Chennai%20600091&t=&z=15&ie=UTF8&iwloc=&output=embed"
                title="Bumper To Bumper Car Accessories location map — Adambakkam, Chennai"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </aside>
        </div>
      </section>

      <CTASection
        title={<>Prefer to Talk <span className="text-red">Directly</span>?</>}
        subtitle={<>Call us during working hours or WhatsApp your car model and requirements — our specialists will guide you with accurate pricing and <span className="text-red">fitment</span>.</>}
        primaryCta={{ label: 'Call Now', href: `tel:${business.phoneHref || '9789550006'}` }}
        whatsappMessage={`Hi ${business.name}, I would like to enquire about your services.`}
        primaryIcon={Phone}
        dark={true}
      />
    </>
  );
}
