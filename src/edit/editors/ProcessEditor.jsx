import { useDataFile } from '../hooks/useDataFile.js';
import { DATA_FILES } from '../constants.js';
import { Field, TextInput, Textarea } from '../components/Fields.jsx';
import ArrayField from '../components/ArrayField.jsx';
import ActionBar from '../components/ActionBar.jsx';

export default function ProcessEditor() {
    const hook = useDataFile(DATA_FILES.process, { commitPrefix: 'Update' });

    function updateStep(index, field, value) {
        hook.updateEditData((draft) => {
            draft[index][field] = value;
        });
    }

    function nextStepId() {
        const steps = hook.editData || [];
        return String(steps.length + 1).padStart(2, '0');
    }

    function addStep() {
        hook.updateEditData((draft) => {
            const newId = String(draft.length + 1).padStart(2, '0');
            draft.push({ id: newId, title: 'New Step', desc: 'Step description...' });
        });
    }

    function removeStep(index) {
        hook.updateEditData((draft) => {
            draft.splice(index, 1);
            draft.forEach((s, i) => {
                s.id = String(i + 1).padStart(2, '0');
            });
        });
    }

    function moveStep(from, to) {
        if (to < 0 || to >= hook.editData.length) return;
        hook.updateEditData((draft) => {
            const [item] = draft.splice(from, 1);
            draft.splice(to, 0, item);
            draft.forEach((s, i) => {
                s.id = String(i + 1).padStart(2, '0');
            });
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

            <ArrayField
                label="Process Steps"
                items={hook.editData || []}
                onAdd={addStep}
                onUpdate={(i, updates) => Object.assign(updates, {})}
                onRemove={removeStep}
                onMove={moveStep}
                addLabel="Add step"
                renderItem={(item, index) => (
                    <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '0 16px' }}>
                        <Field label="Number">
                            <TextInput value={item.id} onChange={(v) => updateStep(index, 'id', v)} />
                        </Field>
                        <Field label="Title">
                            <TextInput value={item.title} onChange={(v) => updateStep(index, 'title', v)} />
                        </Field>
                        <div style={{ gridColumn: 'span 2' }}>
                            <Field label="Description">
                                <Textarea value={item.desc} onChange={(v) => updateStep(index, 'desc', v)} rows={2} />
                            </Field>
                        </div>
                    </div>
                )}
            />
        </div>
    );
}
