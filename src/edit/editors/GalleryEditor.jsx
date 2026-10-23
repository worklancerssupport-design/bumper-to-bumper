import { useState } from 'react';
import { Plus, Tag, Star } from 'lucide-react';
import { useGallery } from '../hooks/useGallery.js';
import { Field, FieldGrid, TextInput, CommaList, Toggle, ImageField, Select } from '../components/Fields.jsx';
import SectionCard, { ListHeader } from '../components/SectionCard.jsx';
import EditorFrame from '../components/EditorFrame.jsx';
import ItemRow, { ItemList, RowThumb } from '../components/ItemRow.jsx';
import '../components/item-row.css';

export default function GalleryEditor() {
    const hook = useGallery();
    const [open, setOpen] = useState({});
    const toggle = (i) => () => setOpen((p) => ({ ...p, [i]: !p[i] }));

    const d = hook.editData;
    const items = d?.items || [];
    const categories = d?.categories || [];
    const allOpen = items.length > 0 && items.every((_, i) => open[i]);

    function nextId() {
        const ids = items.map((it) => Number(it.id)).filter(Number.isFinite);
        return ids.length ? Math.max(...ids) + 1 : 1;
    }

    function addItem() {
        hook.lists.items.add({
            id: nextId(),
            src: '',
            alt: '',
            title: 'New Gallery Item',
            car: 'Car model',
            category: categories[1] || categories[0] || '',
            featured: false,
        });
        setOpen((p) => ({ ...p, [items.length]: true }));
    }

    return (
        <EditorFrame sectionId="gallery" hook={hook}>
            <SectionCard
                icon={Tag}
                title="Filter categories"
                subtitle="The tabs above the gallery grid. The first one is treated as “All” and should stay first."
            >
                <Field label="Categories" hint="Comma separated, in the order they should appear.">
                    <CommaList value={categories} onChange={(v) => hook.updateEditData((draft) => { draft.categories = v; })} />
                </Field>
            </SectionCard>

            <section className="edit-stack">
                <ListHeader
                    title="Gallery items"
                    count={items.length}
                    hint="Installation photographs shown on the gallery page."
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
                            <button type="button" className="edit-btn edit-btn--primary edit-btn--sm" onClick={addItem}>
                                <Plus size={13} />
                                Add item
                            </button>
                        </>
                    }
                />
                <ItemList
                    items={items}
                    addLabel="Add item"
                    onAdd={addItem}
                    empty={
                        <>
                            <span className="edit-empty__title">The gallery is empty</span>
                            <span className="edit-empty__hint">
                                Add a photograph to get started. Landscape photos work best — they fill the grid evenly.
                            </span>
                        </>
                    }
                    renderItem={(item, i) => (
                        <ItemRow
                            key={`gi-${i}`}
                            index={i}
                            total={items.length}
                            open={!!open[i]}
                            onToggle={toggle(i)}
                            onMove={hook.lists.items.move}
                            onRemove={hook.lists.items.remove}
                            removeLabel="Remove item"
                            meta={<RowThumb src={item.src} alt="" />}
                            summary={
                                <>
                                    <span className="edit-row__title">{item.title || 'Untitled item'}</span>
                                    {item.car && <span className="edit-row__sub">{item.car}</span>}
                                    {item.category && <span className="edit-badge">{item.category}</span>}
                                    {item.featured && (
                                        <span className="edit-badge edit-badge--accent">
                                            <Star size={9} aria-hidden="true" />
                                            Featured
                                        </span>
                                    )}
                                    {!item.src && <span className="edit-badge edit-badge--accent">No image</span>}
                                </>
                            }
                        >
                            <FieldGrid>
                                <Field label="Photograph" span={2}>
                                    <ImageField
                                        value={item.src}
                                        onChange={(v) => hook.updateEditData((draft) => { draft.items[i].src = v; })}
                                        alt="gallery image"
                                    />
                                </Field>
                                <Field label="Title">
                                    <TextInput
                                        value={item.title}
                                        onChange={(v) => hook.updateEditData((draft) => { draft.items[i].title = v; })}
                                    />
                                </Field>
                                <Field label="Vehicle" hint="Which car is shown.">
                                    <TextInput
                                        value={item.car}
                                        onChange={(v) => hook.updateEditData((draft) => { draft.items[i].car = v; })}
                                    />
                                </Field>
                                <Field label="Filter category" hint="Which tab this item appears under.">
                                    <Select
                                        value={item.category}
                                        onChange={(v) => hook.updateEditData((draft) => { draft.items[i].category = v; })}
                                        options={categories}
                                        placeholder="Choose a category…"
                                    />
                                </Field>
                                <Field label="Alt text" hint="Describe the photo for screen readers and search.">
                                    <TextInput
                                        value={item.alt}
                                        onChange={(v) => hook.updateEditData((draft) => { draft.items[i].alt = v; })}
                                    />
                                </Field>
                                <Field
                                    label="Featured on homepage"
                                    span={2}
                                    hint="Featured items also appear in the homepage carousel."
                                >
                                    <Toggle
                                        value={item.featured}
                                        onChange={(v) => hook.updateEditData((draft) => { draft.items[i].featured = v; })}
                                        label={item.featured ? 'Showing on the homepage' : 'Not on the homepage'}
                                    />
                                </Field>
                            </FieldGrid>
                        </ItemRow>
                    )}
                />
            </section>
        </EditorFrame>
    );
}