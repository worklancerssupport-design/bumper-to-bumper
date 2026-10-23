import FAQ from '../../ui/FAQ/FAQ';
import faqsData from '../../../data/faqs.json';
import business from '../../../config/business';
import './FAQSection.css';

export default function FAQSection({ page = 'homepage' }) {
  const faqs = faqsData[page] || faqsData.homepage;

  return (
    <section className="hp-faq-section" id="faq" aria-label="Frequently asked questions">
      <div className="container">
        <header className="hp-faq-section__header">
          <span className="section-label">FAQ</span>
          <h2 className="hp-faq-section__title">
            Questions, <span className="hp-faq-section__title-accent">Answered</span>
          </h2>
          <p className="hp-faq-section__subtitle">
            Got questions about fitment, warranty, or scheduling? Here is everything you need to know before booking your upgrade at our {business.location.split(',')[0]} studio in <span className="text-red">{business.city}</span>.
          </p>
        </header>

        <div className="hp-faq-wrap">
          <FAQ faqs={faqs} />
        </div>
      </div>
    </section>
  );
}
