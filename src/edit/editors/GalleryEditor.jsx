import { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowUp, ArrowDown, Image as ImageIcon, Star, Plus } from 'lucide-react';
import { useDataFile } from '../hooks/useDataFile.js';
import { DATA_FILES } from '../constants.js';
import { Field, TextInput, Toggle, ImageField } from '../components/Fields.jsx';
import SectionCard from '../components/SectionCard.jsx';
import ActionBar from '../components/ActionBar.jsx';
import './products-editor.css';

// ============================================================
// Gallery Item Card
// ============================================================
function GalleryItemCard({ item, index, total, categoryOptions, expanded, onToggle, onChange, onRemove, onMove }) {
    return (
        <div className={`product-card ${expanded ? 'product-card--expanded' : ''}`}>
            <div className="product-card__header" onClick={() => onToggle(index)}>
                <div className="product-card__drag" onClick={(e) => e.stopPropagation()}>
                    <div className="product-card__move">
                        <button type="button" disabled={index === 0} onClick={() => onMove(index, index - 1)} aria-label="Move up">
                            <ArrowUp size={12} />
                        </button>
                        <button type="button" disabled={index === total - 1} onClick={() => onMove(index, index + 1)} aria-label="Move down">
                            <ArrowDown size={12} />
                        </button>
                    </div>
                </div>
                <div className="product-card__thumb">
                    {item.src ? (
                        <img src={item.src} alt="" />
                    ) : (
                        <div className="product-card__thumb-placeholder">
                            <ImageIcon size={16} />
                        </div>
                    )}
                </div>
                <div className="product-card__info">
                    <div className="product-card__name">{item.title || <em>Untitled</em>}</div>
                    <div className="product-card__meta">
                        <span className="product-card__id">{item.car || '—'}</span>
                    </div>
                </div>
                <div className="product-card__badges">
                    {item.category && <span className="product-card__badge product-card__badge--group">{item.category}</span>}
                    {item.featured && <span className="product-card__badge product-card__badge--footer"><Star size={9} style={{ marginRight: 2, verticalAlign: -1 }} />Featured</span>}
                </div>
                <div className="product-card__chevron">
                    {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
            </div>

            {expanded && (
                <div className="product-card__body">
                    <div className="product-card__panel">
                        <div className="product-card__image-section">
                            <div className="product-card__image-label">Image</div>
                            <ImageField value={item.src} onChange={(v) => onChange(index, 'src', v)} compact />
                        </div>
                        <div className="product-card__grid-2">
                            <Field label="Title">
                                <TextInput value={item.title} onChange={(v) => onChange(index, 'title', v)} />
                            </Field>
                            <Field label="Car">
                                <TextInput value={item.car} onChange={(v) => onChange(index, 'car', v)} />
                            </Field>
                            <Field label="Category">
                                <select
                                    className="edit-select"
                                    value={item.category}
                                    onChange={(e) => onChange(index, 'category', e.target.value)}
                                >
                                    {categoryOptions.map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </Field>
                            <Field label="Alt text" hint="For screen readers & SEO">
                                <TextInput value={item.alt} onChange={(v) => onChange(index, 'alt', v)} />
                            </Field>
                        </div>
                        <Field label="Featured" hint="Show on homepage carousel">
                            <Toggle
                                value={item.featured}
                                onChange={(v) => onChange(index, 'featured', v)}
                                label={item.featured ? 'Yes — featured on homepage' : 'No'}
                            />
                        </Field>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                                type="button"
                                className="product-card__delete"
                                onClick={() => onRemove(index)}
                            >
                                Delete item
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ============================================================
// List header (reused)
// ============================================================
function ListHeader({ title, hint, count, allExpanded, onToggleAll, onAdd, addLabel }) {
    return (
        <div className="product-editor__list-header">
            <div>
                <h3 className="product-editor__list-title">{title} <span className="product-card__count">({count})</span></h3>
                {hint && <p className="product-editor__list-hint">{hint}</p>}
            </div>
            <div className="product-editor__list-actions">
                <button type="button" className="product-editor__list-action" onClick={onToggleAll}>
                    {allExpanded ? 'Collapse all' : 'Expand all'}
                </button>
                <button type="button" className="product-editor__list-action product-editor__list-action--primary" onClick={onAdd}>
                    <Plus size={12} /> {addLabel}
                </button>
            </div>
        </div>
    );
}

// ============================================================
// Main editor
// ============================================================
export default function GalleryEditor() {
    const hook = useDataFile(DATA_FILES.gallery, { commitPrefix: 'Update' });
    const [openItems, setOpenItems] = useState({});
    const [showCategories, setShowCategories] = useState(false);

    const items = hook.editData?.items || [];
    const categoryOptions = hook.editData?.categories || [];

    function toggleOpen(setter, idx) {
        setter((prev) => ({ ...prev, [idx]: !prev[idx] }));
    }
    function toggleAll(openMap, total, setter) {
        const allOpen = Object.values(openMap).filter(Boolean).length === total;
        const next = {};
        for (let i = 0; i < total; i++) next[i] = !allOpen;
        setter(next);
    }

    function updateCategories(categoriesString) {
        const categories = categoriesString.split(',').map((s) => s.trim()).filter(Boolean);
        hook.updateEditData((draft) => {
            draft.categories = categories;
        });
    }

    function nextItemId() {
        return items.length ? Math.max(...items.map((r) => r.id)) + 1 : 1;
    }
    function updateItem(index, field, value) {
        hook.updateEditData((draft) => {
            draft.items[index][field] = value;
        });
    }
    function addItem() {
        hook.updateEditData((draft) => {
            draft.items.push({
                id: nextItemId(),
                src: '',
                alt: 'New gallery item',
                category: draft.categories[1] || 'Exterior',
                title: 'New Gallery Item',
                car: 'Car Model',
                featured: false,
            });
        });
    }
    function removeItem(index) {
        hook.updateEditData((draft) => {
            draft.items.splice(index, 1);
        });
    }
    function moveItem(from, to) {
        if (to < 0 || to >= items.length) return;
        hook.updateEditData((draft) => {
            const [moved] = draft.items.splice(from, 1);
            draft.items.splice(to, 0, moved);
        });
    }

    const allItemsOpen = items.length > 0 && Object.values(openItems).filter(Boolean).length === items.length;

    return (
        <div>
            <ActionBar
                loading={hook.loading}
                saving={hook.saving}
                error={hook.error}
                hasChanges={hook.hasChanges}
                onRefresh={hook.refresh}
                onDiscard={hook.discard}
                onSave={() => hook.save()}
            />

            <SectionCard
                title="Filter Categories"
                subtitle="Used by gallery filter tabs"
                collapsible
                defaultOpen={showCategories}
                onToggle={() => setShowCategories((v) => !v)}
                action={
                    <span className="product-card__count">{categoryOptions.length} tags</span>
                }
            >
                <Field label="Categories" hint="Separate with commas (e.g. All, Exterior, Interior, Lighting)">
                    <TextInput
                        value={categoryOptions.join(', ')}
                        onChange={updateCategories}
                    />
                </Field>
            </SectionCard>

            <ListHeader
                title="Gallery Items"
                hint="Each card is one image shown on the public gallery page"
                count={items.length}
                allExpanded={allItemsOpen}
                onToggleAll={() => toggleAll(openItems, items.length, setOpenItems)}
                onAdd={addItem}
                addLabel="Add item"
            />
            <div className="product-editor__list">
                {items.map((item, index) => (
                    <GalleryItemCard
                        key={`item-${index}-${item.id}`}
                        item={item}
                        index={index}
                        total={items.length}
                        categoryOptions={categoryOptions}
                        expanded={!!openItems[index]}
                        onToggle={(i) => toggleOpen(setOpenItems, i)}
                        onChange={updateItem}
                        onRemove={removeItem}
                        onMove={moveItem}
                    />
                ))}
            </div>
        </div>
    );
}
