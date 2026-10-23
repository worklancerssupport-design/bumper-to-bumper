import React from 'react';
import { ShieldCheck, ChevronRight } from 'lucide-react';

const CAR_BRANDS = [
  { name: 'Honda', slug: 'honda' },
  { name: 'Hyundai', slug: 'hyundai' },
  { name: 'Maruti', slug: 'maruti' },
  { name: 'Kia', slug: 'kia' },
  { name: 'Jeep', slug: 'jeep' },
  { name: 'Tata', slug: 'tata' },
  { name: 'Toyota', slug: 'toyota' },
  { name: 'Volkswagen', slug: 'volkswagen' },
];

export default function HeaderMarquesBar({ onSelectBrand }) {
  return (
    <div className="header-marques-bar" aria-label="Supported Car Brands & Fitments">
      <div className="container header-marques-bar__inner">
        <div className="header-marques-bar__label">
          <span className="header-marques-bar__dot" aria-hidden="true" />
          <span className="header-marques-bar__text">FITMENTS &amp; ACCESSORIES FOR:</span>
        </div>

        <div className="header-marques-bar__list" role="list">
          {CAR_BRANDS.map((brand) => (
            <button
              key={brand.slug}
              type="button"
              className="header-marques-item"
              onClick={() => onSelectBrand && onSelectBrand(brand.name)}
              title={`Explore accessories and upgrades for ${brand.name}`}
              role="listitem"
            >
              <span>{brand.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
