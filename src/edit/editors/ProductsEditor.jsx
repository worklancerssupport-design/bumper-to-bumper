import { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronRight, Trash2, GripVertical, Plus, ArrowUp, ArrowDown, Image as ImageIcon } from 'lucide-react';
import { useDataFile } from '../hooks/useDataFile.js';
import { DATA_FILES } from '../constants.js';
import { Field, TextInput, Textarea, Toggle, ImageField } from '../components/Fields.jsx';
import SectionCard from '../components/SectionCard.jsx';
import ActionBar from '../components/ActionBar.jsx';
import './products-editor.css';

const SECTION_CONFIG = {
    productsExterior: {
        file: DATA_FILES.productsExterior,
        category: 'exterior',
        title: 'Exterior Products',
    },
    productsInterior: {
        file: DATA_FILES.productsInterior,
        category: 'interior',
        title: 'Interior Products',
    },
};

// ============================================================
// Product Card (the new collapsed-by-default design)
// ============================================================
function ProductCard({ item, index, total, groups, expanded, onToggle, onChange, onRemove, onMove }) {
    const [tab, setTab] = useState('basics');
    const group = groups?.find((g) => g.slugs?.includes(item.slug));

    function update(field, value) {
        onChange(index, field, value);
    }

    function updateArray(field, array) {
        onChange(index, field, array);
    }

    // --- Sub-array helpers ---
    function arrayAdd(field, defaultValue) {
        const next = Array.isArray(item[field]) ? [...item[field], defaultValue] : [defaultValue];
        updateArray(field, next);
    }
    function arrayRemove(field, idx) {
        const next = [...(item[field] || [])];
        next.splice(idx, 1);
        updateArray(field, next);
    }
    function arrayUpdate(field, idx, value) {
        const next = [...(item[field] || [])];
        next[idx] = value;
        updateArray(field, next);
    }
    function objectArrayAdd(field, defaultObj) {
        const next = Array.isArray(item[field]) ? [...item[field], defaultObj] : [defaultObj];
        updateArray(field, next);
    }
    function objectArrayRemove(field, idx) {
        const next = [...(item[field] || [])];
        next.splice(idx, 1);
        updateArray(field, next);
    }
    function objectArrayUpdate(field, idx, key, value) {
        const next = item[field].map((o, i) => (i === idx ? { ...o, [key]: value } : o));
        updateArray(field, next);
    }

    return (
        <div className={`product-card ${expanded ? 'product-card--expanded' : ''}`}>
            {/* COLLAPSED HEADER — always visible */}
            <div className="product-card__header" onClick={() => onToggle(index)}>
                <div className="product-card__drag" onClick={(e) => e.stopPropagation()}>
                    <div className="product-card__move">
                        <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => onMove(index, index - 1)}
                            aria-label="Move up"
                        >
                            <ArrowUp size={12} />
                        </button>
                        <button
                            type="button"
                            disabled={index === total - 1}
                            onClick={() => onMove(index, index + 1)}
                            aria-label="Move down"
                        >
                            <ArrowDown size={12} />
                        </button>
                    </div>
                </div>
                <div className="product-card__thumb">
                    {item.image ? (
                        <img src={item.image} alt="" />
                    ) : (
                        <div className="product-card__thumb-placeholder">
                            <ImageIcon size={16} />
                        </div>
                    )}
                </div>
                <div className="product-card__info">
                    <div className="product-card__name">{item.name || <em>Untitled</em>}</div>
                    <div className="product-card__meta">
                        <code className="product-card__slug">{item.slug || 'no-slug'}</code>
                        <span className="product-card__id">{item.id}</span>
                    </div>
                </div>
                <div className="product-card__badges">
                    {group && <span className="product-card__badge product-card__badge--group">{group.id}</span>}
                    {item.showInNav && <span className="product-card__badge product-card__badge--nav">Nav</span>}
                    {item.showInFooter && <span className="product-card__badge product-card__badge--footer">Footer</span>}
                    {item.gallery?.length > 0 && (
                        <span className="product-card__badge">{item.gallery.length} gallery</span>
                    )}
                </div>
                <div className="product-card__chevron">
                    {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
            </div>

            {/* EXPANDED BODY */}
            {expanded && (
                <div className="product-card__body">
                    <div className="product-card__tabs">
                        <button
                            type="button"
                            className={`product-card__tab ${tab === 'basics' ? 'product-card__tab--active' : ''}`}
                            onClick={() => setTab('basics')}
                        >
                            Basics
                        </button>
                        <button
                            type="button"
                            className={`product-card__tab ${tab === 'content' ? 'product-card__tab--active' : ''}`}
                            onClick={() => setTab('content')}
                        >
                            Content
                        </button>
                        <button
                            type="button"
                            className={`product-card__tab ${tab === 'images' ? 'product-card__tab--active' : ''}`}
                            onClick={() => setTab('images')}
                        >
                            Images
                        </button>
                        <button
                            type="button"
                            className={`product-card__tab ${tab === 'lists' ? 'product-card__tab--active' : ''}`}
                            onClick={() => setTab('lists')}
                        >
                            Lists
                        </button>
                        <div className="product-card__tab-spacer" />
                        <button
                            type="button"
                            className="product-card__delete"
                            onClick={() => {
                                if (confirm(`Delete "${item.name || item.id}"?`)) onRemove(index);
                            }}
                        >
                            <Trash2 size={12} /> Delete
                        </button>
                    </div>

                    {/* TAB: BASICS */}
                    {tab === 'basics' && (
                        <div className="product-card__panel">
                            <div className="product-card__grid-2">
                                <Field label="Name">
                                    <TextInput value={item.name} onChange={(v) => update('name', v)} />
                                </Field>
                                <Field label="Slug" hint="URL-safe identifier">
                                    <TextInput value={item.slug} onChange={(v) => update('slug', v)} />
                                </Field>
                            </div>
                            <div className="product-card__grid-3">
                                <Field label="ID" hint="e.g. int-01">
                                    <TextInput value={item.id} onChange={(v) => update('id', v)} />
                                </Field>
                                <Field label="Nav name" hint="Menu label">
                                    <TextInput value={item.navName} onChange={(v) => update('navName', v)} />
                                </Field>
                                <Field label="Mega menu group">
                                    <TextInput value={item.megaMenuGroup || ''} onChange={(v) => update('megaMenuGroup', v || null)} />
                                </Field>
                            </div>
                            <div className="product-card__grid-2">
                                <Field label="Show in nav">
                                    <Toggle value={item.showInNav} onChange={(v) => update('showInNav', v)} label={item.showInNav ? 'Yes' : 'No'} />
                                </Field>
                                <Field label="Show in footer" hint="Popular upgrades">
                                    <Toggle value={item.showInFooter} onChange={(v) => update('showInFooter', v)} label={item.showInFooter ? 'Yes' : 'No'} />
                                </Field>
                            </div>
                        </div>
                    )}

                    {/* TAB: CONTENT */}
                    {tab === 'content' && (
                        <div className="product-card__panel">
                            <Field label="Short description" hint="Card preview text">
                                <Textarea
                                    value={item.shortDescription}
                                    onChange={(v) => update('shortDescription', v)}
                                    rows={2}
                                />
                            </Field>
                            <Field label="Full description">
                                <Textarea
                                    value={item.description}
                                    onChange={(v) => update('description', v)}
                                    rows={4}
                                />
                            </Field>
                            <Field label="Installation" hint="How this is installed">
                                <Textarea
                                    value={item.installation}
                                    onChange={(v) => update('installation', v)}
                                    rows={3}
                                />
                            </Field>
                            <Field label="Related services" hint="Comma-separated slugs">
                                <TextInput
                                    value={item.relatedServices?.join(', ')}
                                    onChange={(v) => update(
                                        'relatedServices',
                                        v.split(',').map((s) => s.trim()).filter(Boolean)
                                    )}
                                />
                            </Field>
                        </div>
                    )}

                    {/* TAB: IMAGES */}
                    {tab === 'images' && (
                        <div className="product-card__panel">
                            <div className="product-card__image-section">
                                <div className="product-card__image-label">Main Image</div>
                                <ImageField
                                    value={item.image}
                                    onChange={(v) => update('image', v)}
                                    alt={item.name || 'main image'}
                                />
                                <Field label="Image alt text" hint="For SEO and accessibility">
                                    <TextInput
                                        value={item.imageAlt}
                                        onChange={(v) => update('imageAlt', v)}
                                        placeholder="Describe the image..."
                                    />
                                </Field>
                            </div>
                            <div className="product-card__image-section">
                                <div className="product-card__image-label">
                                    Gallery ({item.gallery?.length || 0})
                                </div>
                                <div className="product-card__gallery">
                                    {(item.gallery || []).map((img, imgIdx) => (
                                        <div key={imgIdx} className="product-card__gallery-item">
                                            <ImageField
                                                value={img}
                                                onChange={(v) => arrayUpdate('gallery', imgIdx, v)}
                                                alt={`Gallery ${imgIdx + 1}`}
                                                compact
                                            />
                                            <button
                                                type="button"
                                                className="product-card__gallery-remove"
                                                onClick={() => arrayRemove('gallery', imgIdx)}
                                                aria-label="Remove"
                                            >
                                                <Trash2 size={12} />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="product-card__gallery-add"
                                        onClick={() => arrayAdd('gallery', '')}
                                    >
                                        <Plus size={14} /> Add to gallery
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB: LISTS */}
                    {tab === 'lists' && (
                        <div className="product-card__panel">
                            {/* Benefits */}
                            <div className="product-card__list-section">
                                <div className="product-card__list-header">
                                    <div className="product-card__image-label">Benefits</div>
                                    <span className="product-card__count">{item.benefits?.length || 0}</span>
                                </div>
                                <div className="product-card__string-list">
                                    {(item.benefits || []).map((b, i) => (
                                        <div key={i} className="product-card__string-row">
                                            <ChevronRight size={12} className="product-card__string-bullet" />
                                            <TextInput value={b} onChange={(v) => arrayUpdate('benefits', i, v)} />
                                            <button
                                                type="button"
                                                className="product-card__string-remove"
                                                onClick={() => arrayRemove('benefits', i)}
                                                aria-label="Remove"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="product-card__string-add"
                                        onClick={() => arrayAdd('benefits', 'New benefit')}
                                    >
                                        <Plus size={12} /> Add benefit
                                    </button>
                                </div>
                            </div>

                            {/* FAQs */}
                            <div className="product-card__list-section">
                                <div className="product-card__list-header">
                                    <div className="product-card__image-label">FAQs</div>
                                    <span className="product-card__count">{item.faqs?.length || 0}</span>
                                </div>
                                <div className="product-card__faq-list">
                                    {(item.faqs || []).map((faq, i) => (
                                        <div key={i} className="product-card__faq">
                                            <div className="product-card__faq-head">
                                                <span className="product-card__faq-num">{i + 1}</span>
                                                <button
                                                    type="button"
                                                    className="product-card__string-remove"
                                                    onClick={() => arrayRemove('faqs', i)}
                                                    aria-label="Remove FAQ"
                                                >
                                                    <Trash2 size={11} />
                                                </button>
                                            </div>
                                            <Field label="Question">
                                                <TextInput
                                                    value={faq.q}
                                                    onChange={(v) => objectArrayUpdate('faqs', i, 'q', v)}
                                                />
                                            </Field>
                                            <Field label="Answer">
                                                <Textarea
                                                    value={faq.a}
                                                    onChange={(v) => objectArrayUpdate('faqs', i, 'a', v)}
                                                    rows={2}
                                                />
                                            </Field>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="product-card__string-add"
                                        onClick={() => objectArrayAdd('faqs', { q: 'New question?', a: 'New answer.' })}
                                    >
                                        <Plus size={12} /> Add FAQ
                                    </button>
                                </div>
                            </div>

                            {/* Options */}
                            <div className="product-card__list-section">
                                <div className="product-card__list-header">
                                    <div className="product-card__image-label">Options</div>
                                    <span className="product-card__count">{item.options?.length || 0}</span>
                                </div>
                                <div className="product-card__faq-list">
                                    {(item.options || []).map((opt, i) => (
                                        <div key={i} className="product-card__faq">
                                            <div className="product-card__faq-head">
                                                <span className="product-card__faq-num">{i + 1}</span>
                                                <button
                                                    type="button"
                                                    className="product-card__string-remove"
                                                    onClick={() => arrayRemove('options', i)}
                                                    aria-label="Remove option"
                                                >
                                                    <Trash2 size={11} />
                                                </button>
                                            </div>
                                            <Field label="Label">
                                                <TextInput
                                                    value={opt.label}
                                                    onChange={(v) => objectArrayUpdate('options', i, 'label', v)}
                                                />
                                            </Field>
                                            <Field label="Description">
                                                <Textarea
                                                    value={opt.description}
                                                    onChange={(v) => objectArrayUpdate('options', i, 'description', v)}
                                                    rows={2}
                                                />
                                            </Field>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="product-card__string-add"
                                        onClick={() => objectArrayAdd('options', { label: 'New option', description: 'Describe this option...' })}
                                    >
                                        <Plus size={12} /> Add option
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// ============================================================
// Main Editor
// ============================================================
export default function ProductsEditor({ section }) {
    const config = SECTION_CONFIG[section];
    const hook = useDataFile(config.file, { commitPrefix: 'Update' });

    const [expanded, setExpanded] = useState({});
    const [showGroups, setShowGroups] = useState(false);

    function toggle(index) {
        setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
    }
    function expandAll() {
        const all = {};
        hook.editData?.items?.forEach((_, i) => { all[i] = true; });
        setExpanded(all);
    }
    function collapseAll() {
        setExpanded({});
    }

    function nextItemId() {
        const items = hook.editData?.items || [];
        const prefix = config.category === 'exterior' ? 'ext' : 'int';
        const existing = items
            .map((r) => r.id)
            .filter((id) => id && id.startsWith(prefix))
            .map((id) => parseInt(id.split('-')[1], 10))
            .filter((n) => !isNaN(n));
        const next = existing.length ? Math.max(...existing) + 1 : 1;
        return `${prefix}-${String(next).padStart(2, '0')}`;
    }

    function addItem() {
        hook.updateEditData((draft) => {
            draft.items.push({
                id: nextItemId(),
                name: 'New Product',
                slug: 'new-product',
                category: config.category,
                shortDescription: 'Short description...',
                description: 'Full description...',
                installation: 'Installation notes...',
                benefits: ['New benefit'],
                options: [],
                faqs: [],
                gallery: [],
                showInNav: false,
                showInFooter: false,
                navName: 'New Product',
                megaMenuGroup: null,
                relatedServices: [],
            });
        });
        // Auto-expand the newly added product
        const newIndex = (hook.editData?.items?.length || 1);
        setExpanded((prev) => ({ ...prev, [newIndex - 1]: true }));
    }

    function updateItem(index, field, value) {
        hook.updateEditData((draft) => {
            draft.items[index][field] = value;
        });
    }
    function removeItem(index) {
        hook.updateEditData((draft) => {
            draft.items.splice(index, 1);
        });
    }
    function moveItem(from, to) {
        if (to < 0 || to >= hook.editData.items.length) return;
        hook.updateEditData((draft) => {
            const [item] = draft.items.splice(from, 1);
            draft.items.splice(to, 0, item);
        });
    }

    // --- Filter tags ---
    function updateFilterTags(tagsString) {
        const tags = tagsString.split(',').map((s) => s.trim()).filter(Boolean);
        hook.updateEditData((draft) => {
            draft.filterTags = tags;
        });
    }

    // --- Groups ---
    function updateGroup(index, field, value) {
        hook.updateEditData((draft) => {
            draft.groups[index][field] = value;
        });
    }
    function updateGroupSlugs(index, slugsString) {
        const slugs = slugsString.split(',').map((s) => s.trim()).filter(Boolean);
        hook.updateEditData((draft) => {
            draft.groups[index].slugs = slugs;
        });
    }
    function addGroup() {
        hook.updateEditData((draft) => {
            const num = String(draft.groups.length + 1).padStart(2, '0');
            draft.groups.push({
                id: 'new-group',
                tag: `GROUP ${num} // NEW`,
                title: 'New Group Title',
                slugs: [],
            });
        });
    }
    function removeGroup(index) {
        hook.updateEditData((draft) => {
            draft.groups.splice(index, 1);
        });
    }
    function moveGroup(from, to) {
        if (to < 0 || to >= hook.editData.groups.length) return;
        hook.updateEditData((draft) => {
            const [item] = draft.groups.splice(from, 1);
            draft.groups.splice(to, 0, item);
        });
    }

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

            {/* Top-level config: filter tags + groups (collapsible) */}
            <SectionCard
                title="Filter Tags & Groups"
                subtitle="Top-level category filter bar and group structure"
                collapsible
                defaultOpen={showGroups}
                onToggle={() => setShowGroups(!showGroups)}
            >
                <Field label="Filter tags" hint="Comma-separated. First one is usually 'All'.">
                    <TextInput
                        value={hook.editData?.filterTags?.join(', ')}
                        onChange={updateFilterTags}
                    />
                </Field>
            </SectionCard>

            {showGroups && (
                <SectionCard title="Groups" subtitle="Each group references products by slug.">
                    <div className="product-editor__groups">
                        {hook.editData?.groups?.map((group, index) => (
                            <div key={index} className="product-editor__group">
                                <div className="product-editor__group-header">
                                    <span className="product-editor__group-title">{group.title || group.id}</span>
                                    <div className="product-editor__group-actions">
                                        <button type="button" onClick={() => moveGroup(index, index - 1)} disabled={index === 0} aria-label="Move up">
                                            <ArrowUp size={11} />
                                        </button>
                                        <button type="button" onClick={() => moveGroup(index, index + 1)} disabled={index === hook.editData.groups.length - 1} aria-label="Move down">
                                            <ArrowDown size={11} />
                                        </button>
                                        <button type="button" onClick={() => removeGroup(index)} aria-label="Delete">
                                            <Trash2 size={11} />
                                        </button>
                                    </div>
                                </div>
                                <div className="product-editor__group-fields">
                                    <Field label="ID">
                                        <TextInput value={group.id} onChange={(v) => updateGroup(index, 'id', v)} />
                                    </Field>
                                    <Field label="Tag">
                                        <TextInput value={group.tag} onChange={(v) => updateGroup(index, 'tag', v)} />
                                    </Field>
                                    <Field label="Title">
                                        <TextInput value={group.title} onChange={(v) => updateGroup(index, 'title', v)} />
                                    </Field>
                                </div>
                                <Field label="Slugs" hint="Comma-separated product slugs">
                                    <TextInput
                                        value={group.slugs?.join(', ')}
                                        onChange={(v) => updateGroupSlugs(index, v)}
                                    />
                                </Field>
                            </div>
                        ))}
                        <button type="button" className="product-editor__add-group" onClick={addGroup}>
                            <Plus size={13} /> Add group
                        </button>
                    </div>
                </SectionCard>
            )}

            {/* Products list — the main work area */}
            <div className="product-editor__list-header">
                <div>
                    <h2 className="product-editor__list-title">
                        Products ({hook.editData?.items?.length || 0})
                    </h2>
                    <p className="product-editor__list-hint">
                        Cards are collapsed by default. Click to expand and edit.
                    </p>
                </div>
                <div className="product-editor__list-actions">
                    <button type="button" className="product-editor__list-action" onClick={expandAll}>
                        Expand all
                    </button>
                    <button type="button" className="product-editor__list-action" onClick={collapseAll}>
                        Collapse all
                    </button>
                    <button type="button" className="product-editor__list-action product-editor__list-action--primary" onClick={addItem}>
                        <Plus size={13} /> Add product
                    </button>
                </div>
            </div>

            <div className="product-editor__list">
                {hook.editData?.items?.map((item, index) => (
                    <ProductCard
                        key={item.id || index}
                        item={item}
                        index={index}
                        total={hook.editData.items.length}
                        groups={hook.editData.groups}
                        expanded={!!expanded[index]}
                        onToggle={toggle}
                        onChange={updateItem}
                        onRemove={removeItem}
                        onMove={moveItem}
                    />
                ))}
            </div>
        </div>
    );
}
