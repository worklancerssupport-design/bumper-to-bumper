import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Plus, Minus } from 'lucide-react';
import './FAQ.css';

export default function FAQ({ faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>

      <div className="faq-list">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div className={`faq-item ${isOpen ? 'is-open' : ''}`} key={index}>
              <button
                className="faq-question"
                onClick={() => toggleFaq(index)}
                aria-expanded={isOpen}
                type="button"
              >
                <span className="faq-question__text">{faq.q}</span>
                <span className="faq-icon" aria-hidden="true">
                  {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              <div className={`faq-answer ${isOpen ? 'is-open' : ''}`}>
                <div className="faq-answer__inner">
                  {faq.a}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
