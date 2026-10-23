import { useAuth } from './hooks/useAuth.jsx';
import {
    Building2,
    Star,
    Image,
    FileText,
    HelpCircle,
    Wrench,
    ExternalLink,
    LogOut,
} from 'lucide-react';
import './EditNavbar.css';

export const SECTIONS = [
    { id: 'business', label: 'Business', icon: Building2, file: 'src/data/business.json' },
    { id: 'reviews', label: 'Reviews', icon: Star, file: 'src/data/reviews.json' },
    { id: 'gallery', label: 'Gallery', icon: Image, file: 'src/data/gallery.json' },
    { id: 'forms', label: 'Forms', icon: FileText, file: 'src/data/forms.json' },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle, file: 'src/data/faqs.json' },
    { id: 'productsExterior', label: 'Exterior Products', icon: Wrench, file: 'src/data/products/exterior.json' },
    { id: 'productsInterior', label: 'Interior Products', icon: Wrench, file: 'src/data/products/interior.json' },
];

export default function EditNavbar({ activeId, onSelect }) {
    const { logout } = useAuth();

    return (
        <nav className="edit-nav">
            <div className="edit-nav__header">
                <div className="edit-nav__brand">EDIT CONSOLE</div>
                <div className="edit-nav__subtitle">Data Management</div>
            </div>
            <ul className="edit-nav__list">
                {SECTIONS.map((section) => {
                    const Icon = section.icon;
                    return (
                        <li key={section.id}>
                            <button
                                type="button"
                                className={`edit-nav__item ${activeId === section.id ? 'edit-nav__item--active' : ''}`}
                                onClick={() => onSelect(section.id)}
                            >
                                <Icon size={16} />
                                <span>{section.label}</span>
                            </button>
                        </li>
                    );
                })}
            </ul>
            <div className="edit-nav__footer">
                <a href="/" target="_blank" rel="noopener noreferrer" className="edit-nav__footer-item">
                    <ExternalLink size={14} />
                    <span>View Site</span>
                </a>
                <button type="button" className="edit-nav__footer-item" onClick={logout}>
                    <LogOut size={14} />
                    <span>Logout</span>
                </button>
            </div>
        </nav>
    );
}
