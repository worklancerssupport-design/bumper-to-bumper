import {
  ShoppingBag,
  MessageSquare,
  Settings,
  Wrench,
  CheckCircle,
} from 'lucide-react';
import processSteps from '../../../data/process.json';
import business from '../../../config/business';
import './ProcessJourney.css';

const STEP_ICONS = {
  '01': ShoppingBag,
  '02': MessageSquare,
  '03': Settings,
  '04': Wrench,
  '05': CheckCircle,
};

const ProcessJourney = () => {
  return (
    <section className="process-section" id="process">
      <div className="container">
        <header className="process-header">
          <span className="section-label">How We Work</span>
          <h2 className="process-section__title">Our <span className="text-red">Process</span></h2>
          <p className="process-section__subtitle">
            From initial consultation to final diagnostic calibration, experience structured
            automotive <span className="text-red">craftsmanship</span> in {business.city}.
          </p>
        </header>

        <ol className="process-steps" aria-label="Our customization process">
          {processSteps.map((step, idx) => {
            const Icon = STEP_ICONS[step.id] || CheckCircle;
            return (
              <li key={step.id} className="process-step">
                <div className="process-step-marker" aria-hidden="true">
                  <Icon size={22} className="process-step-icon" />
                </div>

                <article className="process-step-card">
                  <h3 className="process-step-title">{step.title}</h3>
                  <p className="process-step-desc">{step.desc}</p>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default ProcessJourney;
