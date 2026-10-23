import { useState } from 'react';
import { LayoutGrid, Car, Images, Plus, Info } from 'lucide-react';
import { useCatalog } from '../hooks/useCatalog.js';
import { CATEGORY_ROUTES } from '../constants.js';
import { Field, FieldGrid, TextInput, ImageField, Select } from '../components/Fields.jsx';
import SectionCard, { ListHeader } from '../components/SectionCard.jsx';
import EditorFrame from '../components/EditorFrame.jsx';
import ItemRow, { ItemList, RowThumb } from '../components/ItemRow.jsx';
import '../components/item-row.css';

const ROUTE_OPTIONS = Object.entries(CATEGORY_ROUTES).map(([value, label]) => ({ value, label }));

export default function CatalogEditor() {
    const hook = useCatalog();
    const [open, setOpen] = useState({});
    const toggle = (k) => () => setOpen((p) => ({ ...p, [k]: !p[k] }));

    const d = hook.editData;
    const categories = d?.categories || [];
    const brands = d?.carBrands || [];
    const vehicles = d?.showcaseVehicles || [];

    return (
        <EditorFrame
            sectionId="catalog"
            hook={hook}
            notice={{
                icon: Info,
                text: 'These lists feed navigation and search across the site. The paths here must match the site’s real routes — pick from the dropdown rather than typing, so a typo cannot break a link.',
            }}
        >
            <SectionCard
                icon={LayoutGrid}
                title="Navigation categories"
                subtitle="The links in the header menu and the browse-by-category strip."
            >
                <ItemList
                    items={categories}
                    addLabel="Add category"
                    onAdd={() => hook.lists.categories.add({ name: 'New Category', path: CATEGORY_ROUTES.exterior })}
                    renderItem={(item, i) => (
                        <ItemRow
                            key={`cat-${i}`}
                            index={i}
                            total={categories.length}
                            open={!!open[`c${i}`]}
                            onToggle={toggle(`c${i}`)}
                            onMove={hook.lists.categories.move}
                            onRemove={hook.lists.categories.remove}
                            removeLabel="Remove category"
                            summary={<span className="edit-row__title">{item.name || 'Untitled category'}</span>}
                        >
                            <FieldGrid>
                                <Field label="Label" hint="What users read.">
                                    <TextInput
                                        value={item.name}
                                        onChange={(v) => hook.updateEditData((draft) => { draft.categories[i].name = v; })}
                                    />
                                </Field>
                                <Field label="Links to">
                                    <Select
                                        value={item.path}
                                        onChange={(v) => hook.updateEditData((draft) => { draft.categories[i].path = v; })}
                                        options={ROUTE_OPTIONS}
                                        placeholder="Choose a destination…"
                                    />
                                </Field>
                            </FieldGrid>
                        </ItemRow>
                    )}
                />
            </SectionCard>

            <section className="edit-stack">
                <ListHeader
                    title="Car brands"
                    count={brands.length}
                    hint="Brands shown in the vehicle selector. The slug is the URL segment — changing it breaks existing links."
                />
                <ItemList
                    items={brands}
                    addLabel="Add brand"
                    onAdd={() => hook.lists.carBrands.add({ name: 'New Brand', slug: 'new-brand' })}
                    renderItem={(item, i) => (
                        <ItemRow
                            key={`brand-${i}`}
                            index={i}
                            total={brands.length}
                            open={!!open[`b${i}`]}
                            onToggle={toggle(`b${i}`)}
                            onMove={hook.lists.carBrands.move}
                            onRemove={hook.lists.carBrands.remove}
                            removeLabel="Remove brand"
                            summary={
                                <>
                                    <span className="edit-row__title">{item.name || 'Untitled brand'}</span>
                                    <span className="edit-row__sub">/{item.slug}</span>
                                </>
                            }
                        >
                            <FieldGrid>
                                <Field label="Brand name">
                                    <TextInput
                                        value={item.name}
                                        onChange={(v) => hook.updateEditData((draft) => { draft.carBrands[i].name = v; })}
                                    />
                                </Field>
                                <Field label="URL slug" hint="Lowercase, hyphenated. No spaces.">
                                    <TextInput
                                        value={item.slug}
                                        onChange={(v) =>
                                            hook.updateEditData((draft) => {
                                                draft.carBrands[i].slug = v.toLowerCase().replace(/[^a-z0-9-]/g, '-');
                                            })
                                        }
                                    />
                                </Field>
                            </FieldGrid>
                        </ItemRow>
                    )}
                />
            </section>

            <section className="edit-stack">
                <ListHeader
                    title="Vehicle showcase"
                    count={vehicles.length}
                    hint="Vehicles featured in the showroom showcase section."
                />
                <ItemList
                    items={vehicles}
                    addLabel="Add vehicle"
                    onAdd={() =>
                        hook.lists.showcaseVehicles.add({
                            id: 'new-vehicle',
                            name: 'New Vehicle',
                            image: '',
                            alt: '',
                        })
                    }
                    renderItem={(item, i) => (
                        <ItemRow
                            key={`veh-${i}`}
                            index={i}
                            total={vehicles.length}
                            open={!!open[`v${i}`]}
                            onToggle={toggle(`v${i}`)}
                            onMove={hook.lists.showcaseVehicles.move}
                            onRemove={hook.lists.showcaseVehicles.remove}
                            removeLabel="Remove vehicle"
                            meta={<RowThumb src={item.image} alt="" />}
                            summary={
                                <>
                                    <span className="edit-row__title">{item.name || 'Untitled vehicle'}</span>
                                    {!item.image && (
                                        <span className="edit-badge edit-badge--accent">No image</span>
                                    )}
                                </>
                            }
                        >
                            <FieldGrid>
                                <Field label="Vehicle name">
                                    <TextInput
                                        value={item.name}
                                        onChange={(v) => hook.updateEditData((draft) => { draft.showcaseVehicles[i].name = v; })}
                                    />
                                </Field>
                                <Field label="ID" hint="Internal identifier. Keep it unique.">
                                    <TextInput
                                        value={item.id}
                                        onChange={(v) => hook.updateEditData((draft) => { draft.showcaseVehicles[i].id = v; })}
                                    />
                                </Field>
                                <Field label="Photograph" span={2}>
                                    <ImageField
                                        value={item.image}
                                        onChange={(v) => hook.updateEditData((draft) => { draft.showcaseVehicles[i].image = v; })}
                                        alt="vehicle"
                                    />
                                </Field>
                                <Field label="Alt text" span={2} hint="Describe the photo for screen readers and search.">
                                    <TextInput
                                        value={item.alt}
                                        onChange={(v) => hook.updateEditData((draft) => { draft.showcaseVehicles[i].alt = v; })}
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