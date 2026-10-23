import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import business from '../data/business.json';
import formsData from '../data/forms.json';
import Breadcrumbs from '../components/ui/Breadcrumbs/Breadcrumbs';
import CTASection from '../components/ui/CTASection/CTASection';
import './FranchisePage.css';
import {
  Award,
  Users,
  TrendingUp,
  MapPin,
  Phone,
  MessageCircle,
  Send,
  CheckCircle2,
  Clock,
} from 'lucide-react';

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Name is required';
  if (!form.phone.trim()) errors.phone = 'Phone number is required';
  else if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) errors.phone = 'Enter a valid 10-digit number';
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email';
  if (!form.city.trim()) errors.city = 'City is required';
  if (!form.investment) errors.investment = 'Select an investment range';
  return errors;
}

const highlights = [
  { icon: Award, title: `${business.stats.yearsExperience}+ Years in Chennai`, desc: 'Established Chennai brand with a loyal, repeat customer base.' },
  { icon: Users, title: `${business.stats.clientsServed.toLocaleString()}+ Clients Served`, desc: 'A demonstrated track record across hatchbacks, sedans and SUVs.' },
  { icon: TrendingUp, title: 'Growing Customization Market', desc: 'Aftermarket accessories and customization is expanding across India.' },
  { icon: MapPin, title: 'Adambakkam Reference Studio', desc: 'A working Chennai studio you can visit, audit and learn from.' },
];

export default function FranchisePage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', investment: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Franchise' }];

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
      const lines = ['Hello, I am interested in a franchise opportunity.', ''];
      lines.push(`Name: ${form.name}`);
      lines.push(`Phone: ${form.phone}`);
      if (form.email) lines.push(`Email: ${form.email}`);
      lines.push(`City: ${form.city}`);
      lines.push(`Investment Range: ${form.investment}`);
      if (form.message) { lines.push(''); lines.push('Message:'); lines.push(form.message); }
      const url = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
      const opened = window.open(url, '_blank');
      if (!opened) window.location.href = url;
      setSuccess(true);
      setForm({ name: '', phone: '', email: '', city: '', investment: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  const whatsappUrl = `https://wa.me/${business.whatsapp || '9789550006'}?text=${encodeURIComponent('Hello, I am interested in a franchise opportunity with Bumper To Bumper Car Accessories.')}`;

  return (
    <>
      <Helmet>
        <title>Franchise Opportunity | Partner With Bumper To Bumper Car Accessories Chennai</title>
        <meta name="description" content="Interested in partnering with Bumper To Bumper Car Accessories, Adambakkam, Chennai? Submit your franchise enquiry and we'll get in touch to discuss the opportunity." />
        <link rel="canonical" href={`${business.siteUrl}/franchise`} />
        <meta property="og:title" content="Franchise | Bumper To Bumper Car Accessories Chennai" />
        <meta property="og:description" content="Partner with Bumper To Bumper Car Accessories, Chennai's trusted automotive accessories & retrofit studio with 15+ years of experience." />
      </Helmet>

      <div className="franchise-breadcrumb-wrap">
        <div className="container"><Breadcrumbs items={breadcrumbs} /></div>
      </div>

      {/* HERO — matches cat-hero / contact-hero pattern */}
      <section className="franchise-hero" aria-labelledby="franchise-hero-title">
        <div className="franchise-hero__content">
          <span className="section-label">Business Opportunity</span>
          <h1 id="franchise-hero-title" className="franchise-hero__title">
            Become Our<br/><span className="franchise-hero__title-accent text-red">Partner</span><br/>
          </h1>
          <p className="franchise-hero__subtitle">
            We are open to exploring partnership opportunities with entrepreneurs who share our passion
            for quality car accessories and professional <span className="text-red">installation</span>.
          </p>
          <div className="franchise-hero__actions">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="franchise-hero__btn franchise-hero__btn--primary"
            >
              <span>WhatsApp Us</span>
              <MessageCircle size={16} className="franchise-hero__btn-icon" aria-hidden="true" />
            </a>
            <a
              href={`tel:${business.phoneHref || '9789550006'}`}
              className="franchise-hero__btn franchise-hero__btn--primary"
            >
              <span>Call Now</span>
              <Phone size={16} className="franchise-hero__btn-icon" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* COMBINED: Form (primary action) + Side info (all franchise context) */}
      <section className="section franchise-main">
        <div className="container franchise-main__grid">
          {/* LEFT: Form panel */}
          <div className="franchise-form-panel">
            <header className="franchise-form-panel__header">
              <h2 className="franchise-form-panel__title">Submit Your <span className="text-red">Enquiry</span></h2>
              <p className="franchise-form-panel__intro">
                Share a few details and we will review your enquiry. All discussions are
                completely <span className="text-red">confidential</span> — specific terms, investment and support structure
                are shared only after review.
              </p>
            </header>

            {success ? (
              <div className="franchise-form-success">
                <CheckCircle2 size={48} style={{ color: 'var(--color-success)' }} />
                <h3>WhatsApp Opened</h3>
                <p>Your enquiry has been prepared in WhatsApp. Please tap send to complete.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="franchise-form" noValidate>
                {errors.form && <div className="franchise-form__error-banner">{errors.form}</div>}
                <div className="franchise-form__row">
                  <div className="franchise-form__field">
                    <label htmlFor="f-name">Full Name *</label>
                    <input id="f-name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your full name" />
                    {errors.name && <span className="franchise-form__field-error">{errors.name}</span>}
                  </div>
                  <div className="franchise-form__field">
                    <label htmlFor="f-phone">Phone Number *</label>
                    <input id="f-phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="10-digit mobile number" />
                    {errors.phone && <span className="franchise-form__field-error">{errors.phone}</span>}
                  </div>
                </div>
                <div className="franchise-form__row">
                  <div className="franchise-form__field">
                    <label htmlFor="f-email">Email Address</label>
                    <input id="f-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="Optional" />
                    {errors.email && <span className="franchise-form__field-error">{errors.email}</span>}
                  </div>
                  <div className="franchise-form__field">
                    <label htmlFor="f-city">City *</label>
                    <input id="f-city" name="city" type="text" value={form.city} onChange={handleChange} placeholder="Your city" />
                    {errors.city && <span className="franchise-form__field-error">{errors.city}</span>}
                  </div>
                </div>
                <div className="franchise-form__field">
                  <label htmlFor="f-investment">Investment Interest *</label>
                  <select id="f-investment" name="investment" value={form.investment} onChange={handleChange}>
                    <option value="">Select a range</option>
                    {formsData.franchiseInvestments.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                  {errors.investment && <span className="franchise-form__field-error">{errors.investment}</span>}
                </div>
                <div className="franchise-form__field">
                  <label htmlFor="f-message">Anything Else You'd Like to Share</label>
                  <textarea id="f-message" name="message" rows={4} value={form.message} onChange={handleChange} placeholder="Relevant experience, current business, target city or any other details..." />
                </div>
                <button type="submit" className="btn btn-lg franchise-form__submit" disabled={loading}>
                  {loading ? 'Sending...' : <><Send size={16} /> Submit Franchise Enquiry</>}
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: Why partner highlights + reach-us block */}
          <aside className="franchise-info">
            <article className="franchise-info__block franchise-info__block--featured">
              <h3 className="franchise-info__title">What We <span className="text-red">Bring</span></h3>
              <ul className="franchise-info__list">
                {highlights.map((h, i) => {
                  const Icon = h.icon;
                  return (
                    <li className="franchise-info__item" key={i}>
                      <span className="franchise-info__icon" aria-hidden="true">
                        <Icon size={18} />
                      </span>
                      <div>
                        <span className="franchise-info__label">{h.title}</span>
                        <span className="franchise-info__value franchise-info__value--text">{h.desc}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </article>

            <article className="franchise-info__block">
              <h3 className="franchise-info__title">Reach Us <span className="text-red">Directly</span></h3>
              <ul className="franchise-info__list">
                <li className="franchise-info__item">
                  <span className="franchise-info__icon" aria-hidden="true">
                    <Phone size={16} />
                  </span>
                  <div>
                    <span className="franchise-info__label">Phone & WhatsApp</span>
                    <a href={business.phone ? `tel:${business.phone}` : '#'} className="franchise-info__value">
                      {business.phone || 'Configure in business.json'}
                    </a>
                    {business.phone2 && (
                      <a href={`tel:${business.phone2.replace(/\s+/g, '')}`} className="franchise-info__value">
                        {business.phone2}
                      </a>
                    )}
                  </div>
                </li>
                {business.email && (
                  <li className="franchise-info__item">
                    <span className="franchise-info__icon" aria-hidden="true">
                      <Clock size={16} />
                    </span>
                    <div>
                      <span className="franchise-info__label">Working Hours</span>
                      <span className="franchise-info__value franchise-info__value--text">
                        {business.hours.weekdays.days}: {business.hours.weekdays.open} – {business.hours.weekdays.close}
                      </span>
                      <span className="franchise-info__value franchise-info__value--text">
                        {business.hours.sunday.days}: {business.hours.sunday.open} – {business.hours.sunday.close}
                      </span>
                    </div>
                  </li>
                )}
              </ul>
            </article>
          </aside>
        </div>
      </section>

      <CTASection
        title={<>Have a Question <span className="text-red">First</span>?</>}
        subtitle={<>Call us during working hours or WhatsApp us directly — our team is happy to clarify any partnership questions before you submit your <span className="text-red">enquiry</span>.</>}
        primaryCta={{ label: 'Call Now', href: `tel:${business.phoneHref || '9789550006'}` }}
        whatsappMessage="Hello, I am interested in a franchise opportunity with Bumper To Bumper Car Accessories."
        primaryIcon={Phone}
        dark={true}
      />
    </>
  );
}
