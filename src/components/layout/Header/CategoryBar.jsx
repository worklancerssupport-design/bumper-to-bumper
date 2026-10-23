import { Link, useLocation } from 'react-router-dom';
import catalog from '../../../data/catalog.json';

export default function CategoryBar() {
  const location = useLocation();

  return (
    <div className="header-category-bar" role="navigation" aria-label="Accessory categories quick navigation">
      <div className="container header-category-bar__inner">
        <span className="header-category-bar__label">CATEGORIES:</span>
        <ul className="header-category-bar__list">
          {catalog.categories.map((cat, idx) => {
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
