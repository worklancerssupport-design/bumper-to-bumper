import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MainHeader from './MainHeader';
import MobileMenu from '../MobileMenu/MobileMenu';
import SearchModal from '../../ui/SearchModal/SearchModal';
import business from '../../../data/business.json';
import './Header.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleOpenSearch = () => {
    setSearchModalOpen(true);
  };

  const whatsappMessage = encodeURIComponent(
    'Hello Bumper To Bumper Car Accessories, I would like to enquire about accessories and upgrades for my car.'
  );
  const whatsappUrl = `https://wa.me/${business.whatsapp || '9789550006'}?text=${whatsappMessage}`;
  const instagramUrl = business.instagram || 'https://www.instagram.com/bumpertobumpercaraccessories/';

  return (
    <>
      <header
        className={`btb-header ${isScrolled ? 'btb-header--scrolled' : ''}`}
        role="banner"
      >
        {/* Main Brand & Navigation */}
        <MainHeader
          onOpenSearch={handleOpenSearch}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        whatsappUrl={whatsappUrl}
        instagramUrl={instagramUrl}
      />

      {/* Live Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </>
  );
}
