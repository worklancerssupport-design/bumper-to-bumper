import { useState } from 'react';
import { BookOpen, Award, ListTree, Quote, Plus, Info } from 'lucide-react';
import { useAbout } from '../hooks/useAbout.js';
import { Field, FieldGrid, TextInput, Textarea, CommaList } from '../components/Fields.jsx';
import SectionCard, { ListHeader } from '../components/SectionCard.jsx';
import EditorFrame from '../components/EditorFrame.jsx';
import ItemRow, { ItemList } from '../components/ItemRow.jsx';
import '../components/item-row.css';

export default function AboutEditor() {
    const hook = useAbout();
    const [open, setOpen] = useState({});

    const d = hook.editData;
    const toggle = (k) => () => setOpen((p) => ({ ...p, [k]: !p[k] }));

    const standards = d?.standards || [];
    const groups = d?.rangeGroups || [];
    const paragraphs = d?.story?.paragraphs || [];

    const allStandardsOpen = standards.length > 0 && standards.every((_, i) => open[`s${i}`]);

    return (
        <EditorFrame
            sectionId="about"
            hook={hook}
            notice={{
                icon: Info,
                text: 'Double curly braces are placeholders that get filled from Business data — {{name}}, {{city}}, {{years}}, {{clients}}, {{location}}, {{landmark}}. Keep them where a value should update automatically.',
            }}
        >
            <SectionCard
                icon={BookOpen}
                title="Story"
                subtitle="The introduction paragraphs at the top of the About page."
            >
                <FieldGrid>
                    <Field
                        label="Image caption"
                        span={2}
                        hint="Caption shown under the studio photograph."
                    >
                        <TextInput
                            value={d?.story?.caption}
                            onChange={(v) => hook.updateEditData((draft) => { draft.story.caption = v; })}
                        />
                    </Field>
                    <Field label="Image alt text" span={2} hint="Read by screen readers and search engines.">
                        <TextInput
                            value={d?.story?.imageAlt}
                            onChange={(v) => hook.updateEditData((draft) => { draft.story.imageAlt = v; })}
                        />
                    </Field>
                    <Field label="Visit intro" span={2} hint="Closing paragraph inviting people to the showroom.">
                        <Textarea
                            value={d?.visitIntro}
                            onChange={(v) => hook.updateEditData((draft) => { draft.visitIntro = v; })}
                            rows={2}
                        />
                    </Field>
                </FieldGrid>
            </SectionCard>

            <section className="edit-stack">
                <ListHeader
                    title="Story paragraphs"
                    count={paragraphs.length}
                    hint="Shown in order under the studio image."
                    actions={
                        <button
                            type="button"
                            className="edit-btn edit-btn--sm"
                            onClick={() => hook.lists.storyParagraphs.add('New paragraph…')}
                        >
                            <Plus size={13} />
                            Add paragraph
                        </button>
                    }
                />
                <ItemList
                    items={paragraphs}
                    addLabel="Add paragraph"
                    onAdd={() => hook.lists.storyParagraphs.add('New paragraph…')}
                    renderItem={(item, i) => (
                        <ItemRow
                            key={`p${i}`}
                            index={i}
                            total={paragraphs.length}
                            open={!!open[`p${i}`]}
                            onToggle={toggle(`p${i}`)}
                            onMove={hook.lists.storyParagraphs.move}
                            onRemove={hook.lists.storyParagraphs.remove}
                            removeLabel="Remove paragraph"
                            summary={
                                <span className="edit-row__title">
                                    {String(item).slice(0, 90) || 'Empty paragraph'}
                                    {String(item).length > 90 && '…'}
                                </span>
                            }
                        >
                            <FieldGrid columns={1}>
                                <Field label={`Paragraph ${i + 1}`}>
                                    <Textarea
                                        value={item}
                                        onChange={(v) => hook.updateEditData((draft) => { draft.story.paragraphs[i] = v; })}
                                        rows={4}
                                    />
                                </Field>
                            </FieldGrid>
                        </ItemRow>
                    )}
                />
            </section>

            <section className="edit-stack">
                <ListHeader
                    title="Standards"
                    count={standards.length}
                    hint="The numbered cards on the About page. Numbers renumber automatically when you reorder."
                    actions={
                        <>
                            <button
                                type="button"
                                className="edit-btn edit-btn--sm"
                                onClick={() =>
                                    setOpen((p) => {
                                        const next = { ...p };
                                        standards.forEach((_, i) => { next[`s${i}`] = !allStandardsOpen; });
                                        return next;
                                    })
                                }
                            >
                                {allStandardsOpen ? 'Collapse all' : 'Expand all'}
                            </button>
                            <button
                                type="button"
                                className="edit-btn edit-btn--primary edit-btn--sm"
                                onClick={() => {
                                    hook.lists.standards.add({
                                        num: String(standards.length + 1).padStart(2, '0'),
                                        title: 'New Standard',
                                        desc: 'Describe this standard…',
                                    });
                                    setOpen((p) => ({ ...p, [`s${standards.length}`]: true }));
                                }}
                            >
                                <Plus size={13} />
                                Add standard
                            </button>
                        </>
                    }
                />
                <ItemList
                    items={standards}
                    addLabel="Add standard"
                    onAdd={() => {
                        hook.lists.standards.add({
                            num: String(standards.length + 1).padStart(2, '0'),
                            title: 'New Standard',
                            desc: 'Describe this standard…',
                        });
                        setOpen((p) => ({ ...p, [`s${standards.length}`]: true }));
                    }}
                    renderItem={(item, i) => (
                        <ItemRow
                            key={`s${i}`}
                            index={i}
                            total={standards.length}
                            open={!!open[`s${i}`]}
                            onToggle={toggle(`s${i}`)}
                            onMove={hook.lists.standards.move}
                            onRemove={hook.lists.standards.remove}
                            summary={
                                <>
                                    <span className="edit-badge edit-badge--accent">{item.num}</span>
                                    <span className="edit-row__title">{item.title || 'Untitled standard'}</span>
                                </>
                            }
                        >
                            <FieldGrid>
                                <Field label="Number" hint="Shown as the card's index.">
                                    <TextInput
                                        value={item.num}
                                        onChange={(v) => hook.updateEditData((draft) => { draft.standards[i].num = v; })}
                                    />
                                </Field>
                                <Field label="Title">
                                    <TextInput
                                        value={item.title}
                                        onChange={(v) => hook.updateEditData((draft) => { draft.standards[i].title = v; })}
                                    />
                                </Field>
                                <Field label="Description" span={2}>
                                    <Textarea
                                        value={item.desc}
                                        onChange={(v) => hook.updateEditData((draft) => { draft.standards[i].desc = v; })}
                                        rows={3}
                                    />
                                </Field>
                            </FieldGrid>
                        </ItemRow>
                    )}
                />
            </section>

            <section className="edit-stack">
                <ListHeader
                    title="Accessory range"
                    count={groups.length}
                    hint="Titled groups of items. Each group becomes a column of bullet points on the About page."
                />
                <ItemList
                    items={groups}
                    addLabel="Add group"
                    onAdd={() => hook.lists.rangeGroups.add({ title: 'New Category', items: ['Item 1', 'Item 2'] })}
                    renderItem={(item, i) => (
                        <ItemRow
                            key={`g${i}`}
                            index={i}
                            total={groups.length}
                            open={!!open[`g${i}`]}
                            onToggle={toggle(`g${i}`)}
                            onMove={hook.lists.rangeGroups.move}
                            onRemove={hook.lists.rangeGroups.remove}
                            summary={
                                <>
                                    <span className="edit-row__title">{item.title || 'Untitled group'}</span>
                                    <span className="edit-row__sub">{item.items?.length || 0} items</span>
                                </>
                            }
                        >
                            <FieldGrid>
                                <Field label="Group title" span={2}>
                                    <TextInput
                                        value={item.title}
                                        onChange={(v) => hook.updateEditData((draft) => { draft.rangeGroups[i].title = v; })}
                                    />
                                </Field>
                                <Field
                                    label="Items"
                                    span={2}
                                    hint="Comma separated. Each one becomes a bullet in this group."
                                >
                                    <CommaList
                                        value={item.items}
                                        onChange={(v) => hook.updateEditData((draft) => { draft.rangeGroups[i].items = v; })}
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