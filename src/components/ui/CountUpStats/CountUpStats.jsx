import { ShieldCheck, Wrench, Award, MapPin } from 'lucide-react';
import business from '../../../data/business.json';
import './CountUpStats.css';

const trustFeatures = [
  {
    icon: ShieldCheck,
    title: <>GENUINE <span className="text-red">ACCESSORIES</span></>,
    desc: <>OEM-grade components backed by manufacturer warranty and exact model <span className="text-red">fitment</span>.</>,
    stat: '20+ Categories'
  },
  {
    icon: Wrench,
    title: <><span className="text-red">ZERO</span> WIRE-CUTTING</>,
    desc: <>Coupler-to-coupler installation by certified technicians, preserving car electrical <span className="text-red">warranty</span>.</>,
    stat: '100% Plug & Play'
  },
  {
    icon: Award,
    title: <>15+ YEARS <span className="text-red">MASTERY</span></>,
    desc: <>Over 1,000+ car upgrades and bespoke custom styling delivered across <span className="text-red">Chennai</span>.</>,
    stat: '1,000+ Upgrades'
  },
  {
    icon: MapPin,
    title: <>ADAMBAKKAM <span className="text-red">STUDIO</span></>,
    desc: <>Located at The ARK on Jawaharlal Nehru Salai, Vanuvampet with dedicated <span className="text-red">bay</span>.</>,
    stat: 'Chennai Studio'
  }
];

export default function CountUpStats() {
  return (
    <section className="trust-features-section" aria-label="Why Choose Bumper To Bumper">
      <div className="container">
        <div className="trust-features__grid">
          {trustFeatures.map((item, index) => {
            const Icon = item.icon;
            return (
              <article className="trust-feature-card" key={index}>
                <div className="trust-feature-icon-wrapper">
                  <Icon size={24} className="trust-feature-icon" />
                </div>
                <div className="trust-feature-content">
                  <span className="trust-feature-stat">{item.stat}</span>
                  <h3 className="trust-feature-title">{item.title}</h3>
                  <p className="trust-feature-desc">{item.desc}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
