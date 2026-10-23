import { Link, useLocation } from 'react-router-dom';

const CATEGORIES = [
  { name: 'Exterior Upgrades', path: '/exterior-car-accessories-chennai' },
  { name: 'Interior Styling', path: '/interior-car-accessories-chennai' },
  { name: 'Lighting & DRL', path: '/exterior-car-accessories-chennai' },
  { name: 'Infotainment & Audio', path: '/interior-car-accessories-chennai' },
  { name: 'Custom Seat Covers', path: '/interior-car-accessories-chennai' },
  { name: '360° Cameras & Sensors', path: '/exterior-car-accessories-chennai' },
  { name: 'Studio Gallery', path: '/gallery' },
];

export default function CategoryBar() {
  const location = useLocation();

  return (
    <div className="header-category-bar" role="navigation" aria-label="Accessory categories quick navigation">
      <div className="container header-category-bar__inner">
        <span className="header-category-bar__label">CATEGORIES:</span>
        <ul className="header-category-bar__list">
          {CATEGORIES.map((cat, idx) => {
            const isActive = location.pathname === cat.path;
            return (
              <li key={idx} className="header-category-bar__item">
                <Link
                  to={cat.path}
                  className={`header-category-bar__link ${isActive ? 'header-category-bar__link--active' : ''}`}
                >
                  {cat.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
