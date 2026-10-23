import { useState } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth.jsx';
import EditNavbar, { SECTIONS } from './EditNavbar.jsx';
import EditLogin from './EditLogin.jsx';
import BusinessEditor from './editors/BusinessEditor.jsx';
import ReviewsEditor from './editors/ReviewsEditor.jsx';
import GalleryEditor from './editors/GalleryEditor.jsx';
import FormsEditor from './editors/FormsEditor.jsx';
import FAQsEditor from './editors/FAQsEditor.jsx';
import ProductsEditor from './editors/ProductsEditor.jsx';
import './index.css';
import './EditShell.css';

function EditorRouter({ sectionId }) {
    switch (sectionId) {
        case 'business': return <BusinessEditor />;
        case 'reviews': return <ReviewsEditor />;
        case 'gallery': return <GalleryEditor />;
        case 'forms': return <FormsEditor />;
        case 'faqs': return <FAQsEditor />;
        case 'productsExterior': return <ProductsEditor section="productsExterior" />;
        case 'productsInterior': return <ProductsEditor section="productsInterior" />;
        default: return null;
    }
}

function Shell() {
    const [activeId, setActiveId] = useState('business');

    return (
        <div className="edit-shell">
            <EditNavbar activeId={activeId} onSelect={setActiveId} />
            <div className="edit-shell__main">
                <div className="edit-shell__content">
                    <EditorRouter sectionId={activeId} />
                </div>
            </div>
        </div>
    );
}

function EditContent() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <EditLogin />;
    }

    return <Shell />;
}

export default function EditPage() {
    return (
        <AuthProvider>
            <EditContent />
        </AuthProvider>
    );
}
