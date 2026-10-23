import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useProcess } from '../hooks/useProcess.js';
import { Field, FieldGrid, TextInput, Textarea } from '../components/Fields.jsx';
import { ListHeader } from '../components/SectionCard.jsx';
import EditorFrame from '../components/EditorFrame.jsx';
import ItemRow, { ItemList } from '../components/ItemRow.jsx';
import '../components/item-row.css';

export default function ProcessEditor() {
    const hook = useProcess();
    const [open, setOpen] = useState({});
    const toggle = (i) => () => setOpen((p) => ({ ...p, [i]: !p[i] }));

    const steps = Array.isArray(hook.editData) ? hook.editData : [];
    const allOpen = steps.length > 0 && steps.every((_, i) => open[i]);

    function toggleAll() {
        setOpen((p) => {
            const next = {};
            for (let i = 0; i < steps.length; i++) next[i] = !allOpen;
            return next;
        });
    }

    function addStep() {
        hook.lists.steps.add({
            id: String(steps.length + 1).padStart(2, '0'),
            title: 'New Step',
            desc: 'Describe this step…',
        });
        setOpen((p) => ({ ...p, [steps.length]: true }));
    }

    function updateStep(index, field, value) {
        hook.updateEditData((draft) => {
            draft[index][field] = value;
        });
    }

    return (
        <EditorFrame sectionId="process" hook={hook}>
            <ListHeader
                title="Process steps"
                count={steps.length}
                hint="The journey shown in the process section of the site. Numbers renumber automatically when you reorder."
                actions={
                    <>
                        {steps.length > 0 && (
                            <button type="button" className="edit-btn edit-btn--sm" onClick={toggleAll}>
                                {allOpen ? 'Collapse all' : 'Expand all'}
                            </button>
                        )}
                        <button type="button" className="edit-btn edit-btn--primary edit-btn--sm" onClick={addStep}>
                            <Plus size={13} />
                            Add step
                        </button>
                    </>
                }
            />

            <ItemList
                items={steps}
                addLabel="Add step"
                onAdd={addStep}
                empty={
                    <>
                        <span className="edit-empty__title">No process steps yet</span>
                        <span className="edit-empty__hint">
                            Each step is a numbered card on the site — a title and one sentence explaining it.
                        </span>
                    </>
                }
                renderItem={(item, i) => (
                    <ItemRow
                        key={`step-${i}`}
                        index={i}
                        total={steps.length}
                        open={!!open[i]}
                        onToggle={toggle(i)}
                        onMove={hook.lists.steps.move}
                        onRemove={hook.lists.steps.remove}
                        removeLabel="Remove step"
                        summary={
                            <>
                                <span className="edit-badge edit-badge--accent">{item.id}</span>
                                <span className="edit-row__title">{item.title || 'Untitled step'}</span>
                            </>
                        }
                    >
                        <FieldGrid>
                            <Field label="Step number" hint="Displayed as the card's index.">
                                <TextInput value={item.id} onChange={(v) => updateStep(i, 'id', v)} />
                            </Field>
                            <Field label="Title">
                                <TextInput value={item.title} onChange={(v) => updateStep(i, 'title', v)} />
                            </Field>
                            <Field label="Description" span={2} hint="One or two sentences.">
                                <Textarea value={item.desc} onChange={(v) => updateStep(i, 'desc', v)} rows={3} />
                            </Field>
                        </FieldGrid>
                    </ItemRow>
                )}
            />
        </EditorFrame>
    );
}