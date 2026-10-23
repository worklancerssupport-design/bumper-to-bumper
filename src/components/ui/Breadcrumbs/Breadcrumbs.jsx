import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight } from 'lucide-react';
import business from '../../../data/business.json';
import './Breadcrumbs.css';

export default function Breadcrumbs({ items = [] }) {
  const schemaList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href ? `${business.siteUrl}${item.href}` : undefined
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schemaList)}
        </script>
      </Helmet>

      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol className="breadcrumbs__list">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="breadcrumbs__item">
                {isLast ? (
                  <span className="breadcrumbs__current" aria-current="page">{item.label}</span>
                ) : (
                  <>
                    <Link to={item.href} className="breadcrumbs__link">{item.label}</Link>
                    <ChevronRight size={12} className="breadcrumbs__sep" aria-hidden="true" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
