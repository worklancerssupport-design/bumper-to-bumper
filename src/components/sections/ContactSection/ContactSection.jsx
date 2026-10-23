import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  MapPin,
  ArrowRight,
  Clock,
  Send,
} from 'lucide-react';
import business from '../../../config/business';
import formsData from '../../../data/forms.json';
import './ContactSection.css';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    carModel: '',
    service: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;
    setLoading(true);
    try {
      const lines = ['Hello, I would like to enquire about your services.', ''];
      lines.push(`Name: ${formData.name}`);
      if (formData.phone) lines.push(`Phone: ${formData.phone}`);
      if (formData.email) lines.push(`Email: ${formData.email}`);
      if (formData.carModel) lines.push(`Car: ${formData.carModel}`);
      if (formData.service) lines.push(`Service: ${formData.service}`);
      if (formData.message) { lines.push(''); lines.push('Message:'); lines.push(formData.message); }
      const url = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
      const opened = window.open(url, '_blank');
      if (!opened) window.location.href = url;
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', carModel: '', service: '', message: '' });
      setTimeout(() => setSuccess(false), 6000);
    } finally {
      setLoading(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello ${business.name}, I would like to get a quote for my car.`
  );
  const whatsappLink = `https://wa.me/${business.whatsapp}?text=${whatsappMessage}`;
  const phoneCallLink = business.callHref;
  const mapsLink = business.googleMapsUrl || business.mapUrl;

  return (
    <section className="contact-section" id="contact">
      <div className="contact-backdrop" />

      <div className="container contact-container">
        <header className="contact-header">
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">Contact <span className="text-red">Us</span></h2>
          <p className="section-subtitle section-subtitle--left">
            Reach out to our team and we'll help you pick the perfect accessory upgrade for your <span className="text-red">car</span>.
          </p>
        </header>

        <div className="contact-grid">

          <div className="contact-form-col">
            <form onSubmit={handleSubmit} className="enquiry-form" aria-label="Contact enquiry form">
              <div className="enquiry-form-header">
                <h3>Send Us a <span className="text-red">Message</span></h3>
                <p>We'll respond within 30 minutes on WhatsApp or <span className="text-red">Phone</span>.</p>
              </div>

              <div className="form-group">
                <label htmlFor="hp-name">Your Name *</label>
                <input
                  type="text"
                  id="hp-name"
                  name="name"
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="hp-email">Email Address *</label>
                  <input
                    type="email"
                    id="hp-email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="hp-phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="hp-phone"
                    name="phone"
                    placeholder="e.g. 98400 12345"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="hp-car">Car Model & Year</label>
                  <input
                    type="text"
                    id="hp-car"
                    name="carModel"
                    placeholder="e.g. Creta 2024"
                    value={formData.carModel}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="hp-service">Service Interested In</label>
                  <select
                    id="hp-service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option value="">Select an upgrade...</option>
                    {formsData.quickEnquiryServices.map((s, i) => (
                      <option key={i} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="hp-message">Message / Requirements</label>
                <textarea
                  id="hp-message"
                  name="message"
                  rows="3"
                  placeholder="Tell us what you'd like to customize..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="contact-submit-btn" disabled={loading}>
                <span>{loading ? 'Sending Request...' : 'Send Enquiry'}</span>
                {loading ? <Send size={16} className="btn-icon" /> : <ArrowRight size={16} className="btn-icon" />}
              </button>

              {success && (
                <div className="form-success" role="status">
                  WhatsApp opened with your enquiry. Please tap send to complete.
                </div>
              )}
            </form>
          </div>

          <aside className="contact-info-col" aria-label="Contact information">
            <div className="contact-info-block">
              <div className="contact-info-block-header">
                <h4>Reach Us <span className="text-red">Directly</span></h4>
                <p>Three ways to talk to our fitment team. Pick whichever is <span className="text-red">easiest</span>.</p>
              </div>

              <ul className="contact-info-list">
                <li className="contact-info-row">
                  <span className="contact-info-row-icon"><Phone size={14} /></span>
                  <div className="contact-info-row-body">
                    <span className="contact-info-row-label">Phone</span>
                    <a href={phoneCallLink} className="contact-info-row-value">{business.phone}</a>
                    {business.phone2 && (
                      <a href={business.callHref2} className="contact-info-row-value">
                        {business.phone2}
                      </a>
                    )}
                  </div>
                </li>
                <li className="contact-info-row">
                  <span className="contact-info-row-icon"><MessageCircle size={14} /></span>
                  <div className="contact-info-row-body">
                    <span className="contact-info-row-label">WhatsApp</span>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="contact-info-row-value">
                      Chat with our team
                    </a>
                  </div>
                </li>
                <li className="contact-info-row">
                  <span className="contact-info-row-icon"><MapPin size={14} /></span>
                  <div className="contact-info-row-body">
                    <span className="contact-info-row-label">Studio</span>
                    <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="contact-info-row-value">
                      {business.address}
                    </a>
                  </div>
                </li>
                <li className="contact-info-row">
                  <span className="contact-info-row-icon"><Clock size={14} /></span>
                  <div className="contact-info-row-body">
                    <span className="contact-info-row-label">Hours</span>
                    <span className="contact-info-row-value">
                      {business.hours.weekdays.days} · {business.hours.weekdays.open} – {business.hours.weekdays.close}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
}
