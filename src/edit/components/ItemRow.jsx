import { useState } from 'react';
import { ChevronDown, ArrowUp, ArrowDown, Trash2, Plus, GripVertical } from 'lucide-react';

/**
 * Collapsible row for one item in a repeating list.
 *
 * The collapsed header must answer "what is this and is it complete?"
 * without opening it — callers pass `summary` (the identifying text)
 * and `meta` (thumb, badges, state). Everything editable lives in
 * `children`.
 *
 * Rows keep their own open state keyed by the caller so reordering
 * does not scramble which row is open.
 */
export default function ItemRow({
    index,
    total,
    open,
    onToggle,
    onMove,
    onRemove,
    summary,
    meta,
    removeLabel = 'Delete',
    children,
    moveable = true,
}) {
    const canMoveUp = moveable && index > 0;
    const canMoveDown = moveable && index < total - 1;

    return (
        <li className={`edit-row ${open ? 'edit-row--open' : ''}`}>
            <div className="edit-row__header">
                {moveable && (
                    <div className="edit-row__order">
                        <GripVertical size={13} className="edit-row__grip" aria-hidden="true" />
                        <button
                            type="button"
                            className="edit-icon-btn edit-icon-btn--sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                onMove(index, index - 1);
                            }}
                            disabled={!canMoveUp}
                            aria-label="Move up"
                        >
                            <ArrowUp size={12} />
                        </button>
                        <button
                            type="button"
                            className="edit-icon-btn edit-icon-btn--sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                onMove(index, index + 1);
                            }}
                            disabled={!canMoveDown}
                            aria-label="Move down"
                        >
                            <ArrowDown size={12} />
                        </button>
                    </div>
                )}

                <button
                    type="button"
                    className="edit-row__toggle"
                    onClick={onToggle}
                    aria-expanded={open}
                >
                    {meta}
                    <span className="edit-row__summary">{summary}</span>
                    <ChevronDown
                        size={16}
                        className={`edit-row__chevron ${open ? 'edit-row__chevron--open' : ''}`}
                        aria-hidden="true"
                    />
                </button>

                <button
                    type="button"
                    className="edit-icon-btn edit-icon-btn--danger"
                    onClick={onRemove}
                    aria-label={removeLabel}
                >
                    <Trash2 size={13} />
                </button>
            </div>

            {open && <div className="edit-row__body">{children}</div>}
        </li>
    );
}

/**
 * The list wrapper: `<ul>` of rows plus an add control.
 */
export function ItemList({ items, renderItem, onAdd, addLabel = 'Add item', empty }) {
    if (!items || items.length === 0) {
        return (
            <div className="edit-frame__list-empty">
                {empty || (
                    <>
                        <span className="edit-empty__title">Nothing here yet</span>
                        <span className="edit-empty__hint">Use the button below to add the first one.</span>
                    </>
                )}
                {onAdd && (
                    <button type="button" className="edit-btn edit-btn--primary edit-btn--sm" onClick={onAdd}>
                        <Plus size={13} />
                        {addLabel}
                    </button>
                )}
            </div>
        );
    }

    return (
        <>
            <ul className="edit-rows">{items.map(renderItem)}</ul>
            {onAdd && (
                <button type="button" className="edit-add" onClick={onAdd}>
                    <Plus size={14} />
                    {addLabel}
                </button>
            )}
        </>
    );
}

/** Small image thumbnail with a graceful broken state. */
export function RowThumb({ src, alt = '' }) {
    const [broken, setBroken] = useState(false);
    if (!src || broken) {
        return (
            <span className="edit-row__thumb edit-row__thumb--empty" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="9" cy="9" r="1.5" />
                    <path d="m21 15-5-5L5 21" />
                </svg>
            </span>
        );
    }
    return <img className="edit-row__thumb" src={src} alt={alt} onError={() => setBroken(true)} />;
}

/** Status pill used in a row header. */
export function RowBadge({ children, tone = 'default' }) {
    return <span className={`edit-badge ${tone === 'accent' ? 'edit-badge--accent' : ''}`}>{children}</span>;
}