import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import './FlowingMenu.css';

export default function FlowingMenu({ items = [] }) {
  return (
    <div className="flowing-menu" role="list">
      {items.map((item, index) => (
        <MenuItem key={index} index={index + 1} {...item} />
      ))}
    </div>
  );
}

function MenuItem({ label, href, index }) {
  const formattedIndex = String(index).padStart(2, '0');

  return (
    <div className="flowing-menu__item" role="listitem">
      <Link to={href} className="flowing-menu__link">
        <div className="flowing-menu__meta">
          <span className="flowing-menu__num">{formattedIndex}</span>
          <span className="flowing-menu__label">{label}</span>
        </div>
        <div className="flowing-menu__arrow-box">
          <ArrowUpRight size={20} className="flowing-menu__arrow" />
        </div>
      </Link>
    </div>
  );
}
