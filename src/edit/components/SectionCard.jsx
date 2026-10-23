import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './SectionCard.css';

export default function SectionCard({
    title,
    subtitle,
    children,
    span = 1,
    collapsible = false,
    defaultOpen = true,
    onToggle,
    action,
}) {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isControlled = collapsible && onToggle;
    const isOpen = isControlled ? defaultOpen : internalOpen;

    function handleToggle() {
        if (isControlled) {
            onToggle();
        } else {
            setInternalOpen(!internalOpen);
        }
    }

    return (
        <div className={`edit-section edit-section--span-${span} ${!isOpen ? 'edit-section--collapsed' : ''}`}>
            {title && (
                <div
                    className={`edit-section__header ${collapsible ? 'edit-section__header--clickable' : ''}`}
                    onClick={collapsible ? handleToggle : undefined}
                >
                    <div>
                        <h2 className="edit-section__title">{title}</h2>
                        {subtitle && <p className="edit-section__subtitle">{subtitle}</p>}
                    </div>
                    <div className="edit-section__header-right">
                        {action}
                        {collapsible && (
                            <button type="button" className="edit-section__chevron" aria-label="Toggle">
                                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                        )}
                    </div>
                </div>
            )}
            {isOpen && <div className="edit-section__body">{children}</div>}
        </div>
    );
}
