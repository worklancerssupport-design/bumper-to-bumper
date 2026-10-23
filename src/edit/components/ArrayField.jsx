import { Trash2, ArrowUp, ArrowDown, Plus } from 'lucide-react';
import './ArrayField.css';

export default function ArrayField({
    label,
    items,
    onAdd,
    onUpdate,
    onRemove,
    onMove,
    addLabel = 'Add item',
    emptyText = 'No items yet',
    renderItem,
    canMove = true,
}) {
    return (
        <div className="edit-array">
            {label && (
                <div className="edit-array__header">
                    <h3 className="edit-array__title">{label}</h3>
                    <span className="edit-array__count">{items?.length || 0}</span>
                </div>
            )}
            <div className="edit-array__list">
                {(!items || items.length === 0) && (
                    <div className="edit-array__empty">{emptyText}</div>
                )}
                {items?.map((item, index) => (
                    <div key={item.id ?? index} className="edit-array__item">
                        <div className="edit-array__item-actions">
                            {canMove && (
                                <>
                                    <button
                                        type="button"
                                        className="edit-array__move"
                                        onClick={() => onMove?.(index, index - 1)}
                                        disabled={index === 0}
                                        aria-label="Move up"
                                    >
                                        <ArrowUp size={12} />
                                    </button>
                                    <button
                                        type="button"
                                        className="edit-array__move"
                                        onClick={() => onMove?.(index, index + 1)}
                                        disabled={index === items.length - 1}
                                        aria-label="Move down"
                                    >
                                        <ArrowDown size={12} />
                                    </button>
                                </>
                            )}
                            <button
                                type="button"
                                className="edit-array__remove"
                                onClick={() => onRemove(index)}
                                aria-label="Delete"
                            >
                                <Trash2 size={12} />
                            </button>
                        </div>
                        <div className="edit-array__item-body">
                            {renderItem(item, index, (updates) => onUpdate(index, updates))}
                        </div>
                    </div>
                ))}
            </div>
            <button type="button" className="edit-array__add" onClick={onAdd}>
                <Plus size={14} />
                {addLabel}
            </button>
        </div>
    );
}
