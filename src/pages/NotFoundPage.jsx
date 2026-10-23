import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './NotFoundPage.css';
import { Home, Wrench } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Bumper To Bumper Car Accessories Chennai</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <section className="nfp-section">
        <div className="container nfp-inner">
          <span className="nfp-badge">
            <span className="nfp-badge__dot" aria-hidden="true" />
            Error 404 · Off Route
          </span>

          <h1 className="nfp-404" aria-label="404 error">
            <span className="nfp-404-digit">4</span>
            <span className="nfp-404-digit nfp-404-digit--accent">0</span>
            <span className="nfp-404-digit">4</span>
          </h1>

          <div className="nfp-road" aria-hidden="true">
            <span className="nfp-road__stripe" />
            <span className="nfp-road__stripe" />
            <span className="nfp-road__stripe" />
          </div>

          <div className="nfp-content">
            <h2 className="nfp-title">
              Looks like this <span className="nfp-title__accent">road</span> doesn't exist.
            </h2>
            <p className="nfp-subtitle">
              The page you are looking for may have been moved, renamed, or the URL may be incorrect.
              Let's get you back on the right <span className="text-red">track</span>.
            </p>
            <div className="nfp-actions">
              <Link to="/" className="btn btn-primary btn-lg">
                <Home size={18} />
                Back to Home
              </Link>
              <Link to="/exterior-car-accessories-chennai" className="btn btn-secondary btn-lg">
                <Wrench size={18} />
                Browse Accessories
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
