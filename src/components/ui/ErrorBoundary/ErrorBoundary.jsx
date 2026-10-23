import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary caught an error]:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container">
          <div className="error-boundary-card">
            <div className="error-boundary-icon-wrap">
              <AlertTriangle size={32} className="error-boundary-icon" />
            </div>
            <span className="error-boundary-tag">SYSTEM NOTICE</span>
            <h2 className="error-boundary-title">Something went <span className="text-red">wrong</span></h2>
            <p className="error-boundary-desc">
              We encountered an issue while loading this page. You can refresh the view or return to our accessories <span className="text-red">showroom</span>.
            </p>
            <div className="error-boundary-actions">
              <button onClick={this.handleReload} className="btn btn-primary">
                <RefreshCw size={16} />
                <span>Reload Page</span>
              </button>
              <Link to="/exterior-car-accessories-chennai" className="btn btn-secondary">
                <ArrowLeft size={16} />
                <span>Browse Accessories</span>
              </Link>
              <Link to="/" className="btn btn-outline-dark">
                <Home size={16} />
                <span>Home</span>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
