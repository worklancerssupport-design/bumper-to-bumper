import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './SectionCard.css';

/**
 * A titled group of related fields.
 *
 * `collapsible` sections are collapsed by default: an editor with
 * twenty list items should not push the settings above it off screen.
 */
export default function SectionCard({
    title,
    subtitle,
    hint,
    children,
    icon: Icon,
    action,
    collapsible = false,
    defaultOpen = true,
}) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <section className={`edit-card ${collapsible && !open ? 'edit-card--collapsed' : ''}`}>
            {title && (
                <div
                    className={`edit-card__header ${collapsible ? 'edit-card__header--clickable' : ''}`}
                    onClick={collapsible ? () => setOpen(!open) : undefined}
                    role={collapsible ? 'button' : undefined}
                    tabIndex={collapsible ? 0 : undefined}
                    aria-expanded={collapsible ? open : undefined}
                    onKeyDown={
                        collapsible
                            ? (e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                      e.preventDefault();
                                      setOpen(!open);
                                  }
                              }
                            : undefined
                    }
                >
                    {Icon && (
                        <span className="edit-card__icon" aria-hidden="true">
                            <Icon size={15} />
                        </span>
                    )}
                    <div className="edit-card__heading">
                        <h2 className="edit-card__title">{title}</h2>
                        {subtitle && <p className="edit-card__subtitle">{subtitle}</p>}
                    </div>
                    {action && <div className="edit-card__action">{action}</div>}
                    {collapsible && (
                        <ChevronDown
                            size={16}
                            className={`edit-card__chevron ${open ? 'edit-card__chevron--open' : ''}`}
                            aria-hidden="true"
                        />
                    )}
                </div>
            )}
            {open && (
                <div className="edit-card__body">
                    {hint && <p className="edit-card__hint">{hint}</p>}
                    {children}
                </div>
            )}
        </section>
    );
}

/**
 * Header + bulk actions for a repeating list (expand all, add item).
 * Separate from SectionCard because lists need their own rhythm.
 */
export function ListHeader({ title, count, hint, actions }) {
    return (
        <div className="edit-list-header">
            <div className="edit-list-header__text">
                <h2 className="edit-list-header__title">
                    {title}
                    {typeof count === 'number' && (
                        <span className="edit-badge edit-badge--count">{count}</span>
                    )}
                </h2>
                {hint && <p className="edit-list-header__hint">{hint}</p>}
            </div>
            {actions && <div className="edit-list-header__actions">{actions}</div>}
        </div>
    );
}