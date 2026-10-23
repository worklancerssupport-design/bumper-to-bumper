import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useFaqs, FAQ_PAGES } from '../hooks/useFaqs.js';
import { Field, FieldGrid, Textarea } from '../components/Fields.jsx';
import { ListHeader } from '../components/SectionCard.jsx';
import EditorFrame from '../components/EditorFrame.jsx';
import ItemRow, { ItemList } from '../components/ItemRow.jsx';
import '../components/item-row.css';

const PAGE_LABELS = {
    homepage: 'Homepage',
    about: 'About page',
    exterior: 'Exterior page',
    interior: 'Interior page',
};

export default function FAQsEditor() {
    const hook = useFaqs();
    const [open, setOpen] = useState({});
    const toggle = (page, i) => () =>
        setOpen((p) => ({ ...p, [page]: { ...(p[page] || {}), [i]: !p[page]?.[i] } }));

    const d = hook.editData;

    return (
        <EditorFrame sectionId="faqs" hook={hook}>
            {FAQ_PAGES.map((page) => {
                const list = d?.[page] || [];
                const cur = open[page] || {};
                const allOpen = list.length > 0 && list.every((_, i) => cur[i]);
                const actions = hook.lists[page];

                return (
                    <section key={page} className="edit-stack">
                        <ListHeader
                            title={`${PAGE_LABELS[page] || page} FAQs`}
                            count={list.length}
                            hint={`Questions shown on the ${PAGE_LABELS[page]?.toLowerCase() || page}. Order matters — the first questions are the ones most people see.`}
                            actions={
                                <>
                                    {list.length > 0 && (
                                        <button
                                            type="button"
                                            className="edit-btn edit-btn--sm"
                                            onClick={() =>
                                                setOpen((p) => {
                                                    const next = { ...(p[page] || {}) };
                                                    for (let i = 0; i < list.length; i++) next[i] = !allOpen;
                                                    return { ...p, [page]: next };
                                                })
                                            }
                                        >
                                            {allOpen ? 'Collapse all' : 'Expand all'}
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        className="edit-btn edit-btn--primary edit-btn--sm"
                                        onClick={() => {
                                            actions.add({ q: 'New question?', a: 'Answer here…' });
                                            setOpen((p) => ({ ...p, [page]: { ...(p[page] || {}), [list.length]: true } }));
                                        }}
                                    >
                                        <Plus size={13} />
                                        Add question
                                    </button>
                                </>
                            }
                        />
                        <ItemList
                            items={list}
                            addLabel="Add question"
                            onAdd={() => actions.add({ q: 'New question?', a: 'Answer here…' })}
                            empty={
                                <>
                                    <span className="edit-empty__title">No questions on this page yet</span>
                                    <span className="edit-empty__hint">
                                        Add the questions customers ask most. Short, direct answers work best.
                                    </span>
                                </>
                            }
                            renderItem={(item, i) => (
                                <ItemRow
                                    key={`${page}-${i}`}
                                    index={i}
                                    total={list.length}
                                    open={!!cur[i]}
                                    onToggle={toggle(page, i)}
                                    onMove={actions.move}
                                    onRemove={actions.remove}
                                    removeLabel="Remove question"
                                    summary={
                                        <span className="edit-row__title">
                                            {item.q || 'Untitled question'}
                                        </span>
                                    }
                                >
                                    <FieldGrid columns={1}>
                                        <Field label="Question">
                                            <Textarea
                                                value={item.q}
                                                onChange={(v) => hook.updateEditData((draft) => { draft[page][i].q = v; })}
                                                rows={2}
                                            />
                                        </Field>
                                        <Field label="Answer" hint="Write it the way you would say it out loud.">
                                            <Textarea
                                                value={item.a}
                                                onChange={(v) => hook.updateEditData((draft) => { draft[page][i].a = v; })}
                                                rows={4}
                                            />
                                        </Field>
                                    </FieldGrid>
                                </ItemRow>
                            )}
                        />
                    </section>
                );
            })}
        </EditorFrame>
    );
}