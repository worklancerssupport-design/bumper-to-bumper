import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './ServiceCard.css';

export default function ServiceCard({ service, index = 1 }) {
  if (!service) return null;

  const isExterior = service.category === 'Exterior' || service.category === 'exterior' || service.id?.startsWith('ext-');
  const basePath = isExterior ? '/exterior-car-accessories-chennai' : '/interior-car-accessories-chennai';
  const detailUrl = `${basePath}/${service.slug}`;
  const formattedIndex = String(index).padStart(2, '0');

  return (
    <article className="svc-card" aria-label={`View details for ${service.name}`}>
      <img
        src={service.image || '/images/exterior/placeholder.webp'}
        alt={service.imageAlt || service.name}
        className="svc-card__img"
        loading="lazy"
        onError={(e) => { e.target.src = '/images/exterior/placeholder.webp'; }}
      />
      <div className="svc-card__overlay" />

      <div className="svc-card__top">
        <span className="svc-card__index">{formattedIndex}</span>
      </div>

      <div className="svc-card__bottom">
        <h3 className="svc-card__title">
          <Link to={detailUrl} style={{color:'#fff'}}>{service.name}</Link>
        </h3>
        <Link
          to={detailUrl}
          className="svc-card__cta"
          aria-label={`View details for ${service.name}`}
        >
          <span>View Details</span>
          <ChevronRight size={14} className="svc-card__arrow" />
        </Link>
      </div>
    </article>
  );
}
