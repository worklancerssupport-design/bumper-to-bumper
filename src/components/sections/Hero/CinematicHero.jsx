import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import './CinematicHero.css';

export default function CinematicHero() {
  return (
    <section className="cinematic-hero" aria-label="Bumper To Bumper Car Accessories Showcase">
      {/* ── Background: Backside of Black Sports Car with Glowing Red Backlights ── */}
      <div className="cinematic-hero__bg" aria-hidden="true">
        {/* Subtle Ambient Red Studio Illumination */}
        <div className="cinematic-hero__ambient-glow" />

        {/* Scaled & Positioned Car Stage Frame */}
        <div className="cinematic-hero__stage">
          <div className="cinematic-hero__car-frame">
            <img
              src="/images/hero/hero_black_sports_car.jpg"
              alt="Black performance sports coupe rear three-quarters in cinematic red studio"
              className="cinematic-hero__car-img"
              loading="eager"
              fetchpriority="high"
              width="1376"
              height="768"
            />
          </div>
        </div>

        {/* Multi-layered cinematic gradient overlays for seamless edge blending into #050505 */}
        <div className="cinematic-hero__mask-left" />
        <div className="cinematic-hero__mask-top" />
        <div className="cinematic-hero__mask-bottom" />
        <div className="cinematic-hero__mask-right" />
      </div>

      <div className="container cinematic-hero__container">
        <div className="cinematic-hero__content">

          {/* Eyebrow Label */}
          <div className="cinematic-hero__eyebrow-wrap">
            <span className="cinematic-hero__eyebrow">
              AUTOMOTIVE UPGRADES &amp; RETROFIT STUDIO
            </span>
          </div>

          {/* Distinctive Automotive Headline */}
          <h1 className="cinematic-hero__headline">
            <span className="cinematic-hero__headline-white">ENGINEERED FOR THE DRIVE.</span>
            <span className="cinematic-hero__headline-white">DESIGNED TO <span className="cinematic-hero__headline-red">STAND</span> OUT.</span>
          </h1>

          {/* Improved Supporting Text */}
          <p className="cinematic-hero__supporting">
            Premium automotive accessories that <span className="text-red">elevate</span> every detail of your journey.
          </p>

          {/* Short Red Accent Line */}
          <div className="cinematic-hero__accent-line" aria-hidden="true" />

          {/* Refined Action Buttons */}
          <div className="cinematic-hero__actions">
            <Link
              to="/exterior-car-accessories-chennai"
              className="cinematic-hero__btn-primary"
              aria-label="Explore exterior accessories collection"
            >
              <span>Explore Accessories</span>
              <ChevronRight size={16} className="cinematic-hero__btn-icon" aria-hidden="true" />
            </Link>

            <Link
              to="/contact"
              className="cinematic-hero__btn-secondary"
              aria-label="Contact our store in Adambakkam Chennai"
            >
              <span>Contact Studio</span>
              <ArrowRight size={15} className="cinematic-hero__btn-icon" aria-hidden="true" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
