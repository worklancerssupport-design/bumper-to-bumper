import { useState } from 'react';
import {
    Plus,
    Trash2,
    Tag,
    Images,
    ListChecks,
    LayoutTemplate,
    ChevronRight,
    FolderTree,
    Tags,
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts.js';
import { Field, FieldGrid, TextInput, Textarea, Toggle, ImageField, CommaList } from '../components/Fields.jsx';
import EditorFrame from '../components/EditorFrame.jsx';
import SectionCard, { ListHeader } from '../components/SectionCard.jsx';
import ItemRow, { ItemList, RowThumb } from '../components/ItemRow.jsx';
import '../components/item-row.css';
import './products-editor.css';

/* ============================================================
   REUSABLE SUB-LISTS inside a product
   ============================================================ */

function StringList({ label, hint, items, onChange, addLabel, placeholder }) {
    const list = items || [];
    return (
        <div className="edit-sublists__group">
            <div className="edit-sublists__head">
                <h4 className="edit-sublists__title">{label}</h4>
                <span className="edit-badge edit-badge--count">{list.length}</span>
            </div>
            {hint && <p className="edit-sublists__hint">{hint}</p>}
            <div className="edit-sublists__rows">
                {list.length === 0 && <p className="edit-choices__empty">Nothing here yet.</p>}
                {list.map((value, i) => (
                    <div key={i} className="edit-sublists__row">
                        <ChevronRight size={12} className="edit-sublists__bullet" aria-hidden="true" />
                        <TextInput value={value} onChange={(v) => onChange(i, v)} placeholder={placeholder} />
                        <button
                            type="button"
                            className="edit-icon-btn edit-icon-btn--sm edit-icon-btn--danger"
                            onClick={() => onChange(null, i)}
                            aria-label="Remove item"
                        >
                            <Trash2 size={12} />
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    className="edit-btn edit-btn--sm"
                    onClick={() => onChange('append')}
                >
                    <Plus size={13} />
                    {addLabel}
                </button>
            </div>
        </div>
    );
}

function ObjectList({ label, hint, items, fields, onChange, onAdd, addLabel, renderExtra }) {
    const list = items || [];
    return (
        <div className="edit-sublists__group">
            <div className="edit-sublists__head">
                <h4 className="edit-sublists__title">{label}</h4>
                <span className="edit-badge edit-badge--count">{list.length}</span>
            </div>
            {hint && <p className="edit-sublists__hint">{hint}</p>}
            <div className="edit-sublists__stack">
                {list.length === 0 && <p className="edit-choices__empty">Nothing here yet.</p>}
                {list.map((item, i) => (
                    <div key={i} className="edit-sublists__item">
                        <div className="edit-sublists__item-head">
                            <span className="edit-badge edit-badge--count">{String(i + 1).padStart(2, '0')}</span>
                            <button
                                type="button"
                                className="edit-icon-btn edit-icon-btn--sm edit-icon-btn--danger"
                                onClick={() => onChange(null, i)}
                                aria-label="Remove"
                            >
                                <Trash2 size={12} />
                            </button>
                        </div>
                        <FieldGrid>
                            {fields.map((f) => (
                                <Field key={f.key} label={f.label} span={f.span || 2} hint={f.hint}>
                                    {f.multiline ? (
                                        <Textarea
                                            value={item[f.key] ?? ''}
                                            rows={f.rows || 2}
                                            onChange={(v) => onChange(i, { [f.key]: v })}
                                        />
                                    ) : (
                                        <TextInput
                                            value={item[f.key] ?? ''}
                                            onChange={(v) => onChange(i, { [f.key]: v })}
                                            placeholder={f.placeholder}
                                        />
                                    )}
                                </Field>
                            ))}
                            {renderExtra?.(item, i, onChange)}
                        </FieldGrid>
                    </div>
                ))}
                <button type="button" className="edit-add" onClick={onAdd}>
                    <Plus size={14} />
                    {addLabel}
                </button>
            </div>
        </div>
    );
}

/* ============================================================
   PRODUCT ROW — tabs keep a dense record readable
   ============================================================ */

const TABS = [
    { id: 'details', label: 'Details', icon: LayoutTemplate },
    { id: 'content', label: 'Content', icon: ListChecks },
    { id: 'images', label: 'Images', icon: Images },
    { id: 'extras', label: 'Extras', icon: ListChecks },
];

function ProductBody({ item, index, groups, update, updateArray }) {
    const [tab, setTab] = useState('details');

    function setList(field) {
        return (pos, value) => {
            const next = Array.isArray(item[field]) ? [...item[field]] : [];
            if (pos === null) next.splice(value, 1);
            else if (pos === 'append') next.push('');
            else next[pos] = value;
            updateArray(field, next);
        };
    }

    function setObjectList(field) {
        return (pos, patch) => {
            const next = (Array.isArray(item[field]) ? [...item[field]] : []).map((o) => ({ ...o }));
            if (pos === null) next.splice(patch, 1);
            else next[pos] = { ...next[pos], ...patch };
            updateArray(field, next);
        };
    }

    const gallery = item.gallery || [];
    const benefits = item.benefits || [];
    const faqs = item.faqs || [];
    const options = item.options || [];

    return (
        <div className="edit-product">
            <div className="edit-product__tabs" role="tablist">
                {TABS.map((t) => {
                    const Icon = t.icon;
                    return (
                        <button
                            key={t.id}
                            type="button"
                            role="tab"
                            aria-selected={tab === t.id}
                            className={`edit-product__tab ${tab === t.id ? 'edit-product__tab--active' : ''}`}
                            onClick={() => setTab(t.id)}
                        >
                            <Icon size={13} aria-hidden="true" />
                            {t.label}
                        </button>
                    );
                })}
            </div>

            <div className="edit-product__panel" role="tabpanel">
                {tab === 'details' && (
                    <FieldGrid>
                        <Field label="Product name">
                            <TextInput value={item.name} onChange={(v) => update('name', v)} />
                        </Field>
                        <Field label="URL slug" hint="Changing this breaks existing links to the product.">
                            <TextInput value={item.slug} onChange={(v) => update('slug', v)} />
                        </Field>
                        <Field label="Internal ID" hint="Unique identifier, e.g. ext-07.">
                            <TextInput value={item.id} onChange={(v) => update('id', v)} />
                        </Field>
                        <Field label="Menu label" hint="Shorter name used in the navigation.">
                            <TextInput value={item.navName} onChange={(v) => update('navName', v)} />
                        </Field>
                        <Field label="Navigation group" hint="Which section of the mega menu this sits in.">
                            <TextInput
                                value={item.megaMenuGroup || ''}
                                onChange={(v) => update('megaMenuGroup', v || null)}
                            />
                        </Field>
                        <Field label="Grouping" hint="Groups on the listing page. Assign by slug below.">
                            <TextInput value={groups?.find((g) => g.slugs?.includes(item.slug))?.title || ''} disabled />
                        </Field>
                        <Field label="Show in navigation">
                            <Toggle
                                value={item.showInNav}
                                onChange={(v) => update('showInNav', v)}
                                label={item.showInNav ? 'Visible in the menu' : 'Hidden from the menu'}
                            />
                        </Field>
                        <Field label="Show in footer" hint="Appears under popular upgrades.">
                            <Toggle
                                value={item.showInFooter}
                                onChange={(v) => update('showInFooter', v)}
                                label={item.showInFooter ? 'Shown in the footer' : 'Not in the footer'}
                            />
                        </Field>
                    </FieldGrid>
                )}

                {tab === 'content' && (
                    <FieldGrid>
                        <Field label="Short description" span={2} hint="One or two lines — this is the card preview text.">
                            <Textarea value={item.shortDescription} onChange={(v) => update('shortDescription', v)} rows={2} />
                        </Field>
                        <Field label="Full description" span={2} hint="The main body of the product page.">
                            <Textarea value={item.description} onChange={(v) => update('description', v)} rows={6} />
                        </Field>
                        <Field label="Installation notes" span={2} hint="How this accessory is fitted. Builds trust with buyers.">
                            <Textarea value={item.installation} onChange={(v) => update('installation', v)} rows={3} />
                        </Field>
                        <Field
                            label="Related products"
                            span={2}
                            hint="Slugs of other products, comma separated. These become the related-upgrades strip."
                        >
                            <CommaList
                                value={item.relatedServices}
                                onChange={(v) => update('relatedServices', v)}
                                placeholder="bi-led-headlights, ambient-lighting"
                            />
                        </Field>
                    </FieldGrid>
                )}

                {tab === 'images' && (
                    <div className="edit-product__images">
                        <Field label="Main image" span={2} hint="The photograph used on cards and at the top of the page.">
                            <ImageField value={item.image} onChange={(v) => update('image', v)} alt={item.name || 'product'} />
                        </Field>
                        <Field label="Main image alt text" span={2} hint="Describe the photo for screen readers and search engines.">
                            <TextInput value={item.imageAlt} onChange={(v) => update('imageAlt', v)} />
                        </Field>

                        <div className="edit-product__gallery">
                            <div className="edit-sublists__head">
                                <h4 className="edit-sublists__title">Gallery</h4>
                                <span className="edit-badge edit-badge--count">{gallery.length}</span>
                            </div>
                            <p className="edit-sublists__hint">
                                Extra photos shown on the product page. Upload or paste a URL for each.
                            </p>
                            <div className="edit-product__gallery-grid">
                                {gallery.map((img, imgIdx) => (
                                    <div key={imgIdx} className="edit-product__gallery-cell">
                                        <ImageField
                                            value={img}
                                            onChange={(v) => {
                                                const next = [...gallery];
                                                next[imgIdx] = v;
                                                updateArray('gallery', next);
                                            }}
                                            alt={`Gallery image ${imgIdx + 1}`}
                                            compact
                                        />
                                        <button
                                            type="button"
                                            className="edit-icon-btn edit-icon-btn--danger edit-product__gallery-remove"
                                            onClick={() => updateArray('gallery', gallery.filter((_, i) => i !== imgIdx))}
                                            aria-label="Remove gallery image"
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="edit-product__gallery-add"
                                    onClick={() => updateArray('gallery', [...gallery, ''])}
                                >
                                    <Plus size={18} aria-hidden="true" />
                                    <span>Add photo</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {tab === 'extras' && (
                    <div className="edit-sublists">
                        <StringList
                            label="Benefits"
                            hint="Bullet points under the product title."
                            items={benefits}
                            onChange={setList('benefits')}
                            addLabel="Add benefit"
                            placeholder="A benefit of this accessory"
                        />
                        <ObjectList
                            label="Options"
                            hint="Variants or finishes customers can choose."
                            items={options}
                            onChange={setObjectList('options')}
                            onAdd={() => updateArray('options', [...options, { label: 'New option', description: '' }])}
                            addLabel="Add option"
                            fields={[
                                { key: 'label', label: 'Option name', placeholder: 'e.g. Matte Black' },
                                { key: 'description', label: 'Description', multiline: true, rows: 2 },
                            ]}
                        />
                        <ObjectList
                            label="FAQs"
                            hint="Questions answered on the product page itself."
                            items={faqs}
                            onChange={setObjectList('faqs')}
                            onAdd={() => updateArray('faqs', [...faqs, { q: 'New question?', a: 'New answer.' }])}
                            addLabel="Add question"
                            fields={[
                                { key: 'q', label: 'Question', placeholder: 'What do customers ask?' },
                                { key: 'a', label: 'Answer', multiline: true, rows: 3 },
                            ]}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

/* ============================================================
   MAIN EDITOR
   ============================================================ */

export default function ProductsEditor({ section }) {
    const hook = useProducts(section === 'productsInterior' ? 'interior' : 'exterior');
    const [open, setOpen] = useState({});
    const toggle = (i) => () => setOpen((p) => ({ ...p, [i]: !p[i] }));

    const d = hook.editData;
    const items = d?.items || [];
    const groups = d?.groups || [];
    const allOpen = items.length > 0 && items.every((_, i) => open[i]);

    function nextId() {
        const prefix = section === 'productsInterior' ? 'int' : 'ext';
        const nums = items
            .map((it) => String(it.id || '').match(/\d+/)?.[0])
            .filter(Boolean)
            .map(Number);
        const next = nums.length ? Math.max(...nums) + 1 : 1;
        return `${prefix}-${String(next).padStart(2, '0')}`;
    }

    function addProduct() {
        hook.lists.items.add({
            id: nextId(),
            slug: 'new-product',
            name: 'New Product',
            navName: 'New Product',
            shortDescription: 'A short summary for the card.',
            description: 'Full product description.',
            installation: 'How this is installed.',
            benefits: [],
            options: [],
            faqs: [],
            gallery: [],
            showInNav: false,
            showInFooter: false,
            megaMenuGroup: null,
            relatedServices: [],
            image: '',
            imageAlt: '',
        });
        setOpen((p) => ({ ...p, [items.length]: true }));
    }

    return (
        <EditorFrame sectionId={section} hook={hook}>
            <SectionCard
                icon={Tags}
                title="Filter tags"
                subtitle="The filter bar above the product grid. The first tag is the default 'All' view."
            >
                <Field label="Filter tags" hint="Comma separated, in display order.">
                    <CommaList
                        value={d?.filterTags}
                        onChange={(v) => hook.updateEditData((draft) => { draft.filterTags = v; })}
                        placeholder="All, Lighting, Audio, Protection"
                    />
                </Field>
            </SectionCard>

            <SectionCard
                icon={FolderTree}
                title="Page groupings"
                subtitle="How products are organised into sections on the category page. Assign by slug."
            >
                <ItemList
                    items={groups}
                    addLabel="Add group"
                    onAdd={() =>
                        hook.lists.groups.add({
                            id: `group-${groups.length + 1}`,
                            tag: `GROUP ${String(groups.length + 1).padStart(2, '0')}`,
                            title: 'New Group',
                            slugs: [],
                        })
                    }
                    empty={
                        <>
                            <span className="edit-empty__title">No groups yet</span>
                            <span className="edit-empty__hint">
                                Groups split the category page into labelled sections. Without them, products
                                appear in one continuous list.
                            </span>
                        </>
                    }
                    renderItem={(item, i) => (
                        <ItemRow
                            key={`grp-${i}`}
                            index={i}
                            total={groups.length}
                            open={!!open[`g${i}`]}
                            onToggle={() =>
                                setOpen((p) => ({ ...p, [`g${i}`]: !p[`g${i}`] }))
                            }
                            onMove={hook.lists.groups.move}
                            onRemove={hook.lists.groups.remove}
                            removeLabel="Remove group"
                            summary={
                                <>
                                    <span className="edit-row__title">{item.title || 'Untitled group'}</span>
                                    <span className="edit-row__sub">{item.slugs?.length || 0} products</span>
                                </>
                            }
                        >
                            <FieldGrid>
                                <Field label="Group ID">
                                    <TextInput
                                        value={item.id}
                                        onChange={(v) => hook.updateEditData((draft) => { draft.groups[i].id = v; })}
                                    />
                                </Field>
                                <Field label="Tag line" hint="Small heading shown above the group.">
                                    <TextInput
                                        value={item.tag}
                                        onChange={(v) => hook.updateEditData((draft) => { draft.groups[i].tag = v; })}
                                    />
                                </Field>
                                <Field label="Section title" span={2}>
                                    <TextInput
                                        value={item.title}
                                        onChange={(v) => hook.updateEditData((draft) => { draft.groups[i].title = v; })}
                                    />
                                </Field>
                                <Field
                                    label="Product slugs"
                                    span={2}
                                    hint="Comma separated. Each slug must match a product on this page exactly."
                                >
                                    <CommaList
                                        value={item.slugs}
                                        onChange={(v) => hook.updateEditData((draft) => { draft.groups[i].slugs = v; })}
                                    />
                                </Field>
                            </FieldGrid>
                        </ItemRow>
                    )}
                />
            </SectionCard>

            <section className="edit-stack">
                <ListHeader
                    title="Products"
                    count={items.length}
                    hint="Everything on the category page. Each product is one card and one detail page."
                    actions={
                        <>
                            {items.length > 0 && (
                                <button
                                    type="button"
                                    className="edit-btn edit-btn--sm"
                                    onClick={() =>
                                        setOpen((p) => {
                                            const next = {};
                                            for (let i = 0; i < items.length; i++) next[i] = !allOpen;
                                            return next;
                                        })
                                    }
                                >
                                    {allOpen ? 'Collapse all' : 'Expand all'}
                                </button>
                            )}
                            <button type="button" className="edit-btn edit-btn--primary edit-btn--sm" onClick={addProduct}>
                                <Plus size={13} />
                                Add product
                            </button>
                        </>
                    }
                />
                <ItemList
                    items={items}
                    addLabel="Add product"
                    onAdd={addProduct}
                    empty={
                        <>
                            <span className="edit-empty__title">No products yet</span>
                            <span className="edit-empty__hint">
                                Add your first accessory. Give it a name and slug — everything else can be filled
                                in as you go.
                            </span>
                        </>
                    }
                    renderItem={(item, i) => {
                        const group = groups.find((g) => g.slugs?.includes(item.slug));
                        return (
                            <ItemRow
                                key={`p-${i}`}
                                index={i}
                                total={items.length}
                                open={!!open[i]}
                                onToggle={toggle(i)}
                                onMove={hook.lists.items.move}
                                onRemove={hook.lists.items.remove}
                                removeLabel="Delete product"
                                meta={<RowThumb src={item.image} alt="" />}
                                summary={
                                    <>
                                        <span className="edit-row__title">{item.name || 'Untitled product'}</span>
                                        <span className="edit-row__sub">{item.slug}</span>
                                        {group && <span className="edit-badge">{group.title}</span>}
                                        {item.showInNav && <span className="edit-badge">Nav</span>}
                                        {item.showInFooter && <span className="edit-badge edit-badge--accent">Footer</span>}
                                        {!item.image && <span className="edit-badge edit-badge--accent">No image</span>}
                                        {!item.shortDescription && (
                                            <span className="edit-badge edit-badge--accent">No summary</span>
                                        )}
                                    </>
                                }
                            >
                                <ProductBody
                                    item={item}
                                    index={i}
                                    groups={groups}
                                    update={(field, value) =>
                                        hook.updateEditData((draft) => {
                                            draft.items[i][field] = value;
                                        })
                                    }
                                    updateArray={(field, value) =>
                                        hook.updateEditData((draft) => {
                                            draft.items[i][field] = value;
                                        })
                                    }
                                />
                            </ItemRow>
                        );
                    }}
                />
            </section>
        </EditorFrame>
    );
}