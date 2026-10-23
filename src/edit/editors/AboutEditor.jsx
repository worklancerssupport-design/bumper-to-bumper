import { useDataFile } from '../hooks/useDataFile.js';
import { DATA_FILES } from '../constants.js';
import { Field, TextInput, Textarea } from '../components/Fields.jsx';
import SectionCard from '../components/SectionCard.jsx';
import ArrayField from '../components/ArrayField.jsx';
import ActionBar from '../components/ActionBar.jsx';
import './string-list.css';

export default function AboutEditor() {
    const hook = useDataFile(DATA_FILES.about, { commitPrefix: 'Update' });

    function updateStandards(index, updates) {
        hook.updateEditData((draft) => {
            Object.assign(draft.standards[index], updates);
        });
    }

    function addStandard() {
        hook.updateEditData((draft) => {
            const nextNum = String(draft.standards.length + 1).padStart(2, '0');
            draft.standards.push({
                num: nextNum,
                title: 'New Standard',
                desc: 'Describe this standard...',
            });
        });
    }

    function removeStandard(index) {
        hook.updateEditData((draft) => {
            draft.standards.splice(index, 1);
        });
    }

    function moveStandard(from, to) {
        if (to < 0 || to >= hook.editData.standards.length) return;
        hook.updateEditData((draft) => {
            const [item] = draft.standards.splice(from, 1);
            draft.standards.splice(to, 0, item);
            draft.standards.forEach((s, i) => {
                s.num = String(i + 1).padStart(2, '0');
            });
        });
    }

    function updateGroup(index, updates) {
        hook.updateEditData((draft) => {
            Object.assign(draft.rangeGroups[index], updates);
        });
    }

    function addGroup() {
        hook.updateEditData((draft) => {
            draft.rangeGroups.push({
                title: 'New Category',
                items: ['Item 1', 'Item 2'],
            });
        });
    }

    function removeGroup(index) {
        hook.updateEditData((draft) => {
            draft.rangeGroups.splice(index, 1);
        });
    }

    function moveGroup(from, to) {
        if (to < 0 || to >= hook.editData.rangeGroups.length) return;
        hook.updateEditData((draft) => {
            const [item] = draft.rangeGroups.splice(from, 1);
            draft.rangeGroups.splice(to, 0, item);
        });
    }

    function updateGroupItem(groupIndex, itemIndex, value) {
        hook.updateEditData((draft) => {
            draft.rangeGroups[groupIndex].items[itemIndex] = value;
        });
    }

    function addGroupItem(groupIndex) {
        hook.updateEditData((draft) => {
            draft.rangeGroups[groupIndex].items.push('New item');
        });
    }

    function removeGroupItem(groupIndex, itemIndex) {
        hook.updateEditData((draft) => {
            draft.rangeGroups[groupIndex].items.splice(itemIndex, 1);
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
                label="Standards"
                items={hook.editData?.standards || []}
                onAdd={addStandard}
                onUpdate={updateStandards}
                onRemove={removeStandard}
                onMove={moveStandard}
                addLabel="Add standard"
                renderItem={(item, index, onItemUpdate) => (
                    <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '0 16px' }}>
                        <Field label="Number">
                            <TextInput value={item.num} onChange={(v) => onItemUpdate({ num: v })} />
                        </Field>
                        <Field label="Title">
                            <TextInput value={item.title} onChange={(v) => onItemUpdate({ title: v })} />
                        </Field>
                        <div style={{ gridColumn: 'span 2' }}>
                            <Field label="Description">
                                <Textarea value={item.desc} onChange={(v) => onItemUpdate({ desc: v })} rows={2} />
                            </Field>
                        </div>
                    </div>
                )}
            />

            <ArrayField
                label="Range Groups"
                items={hook.editData?.rangeGroups || []}
                onAdd={addGroup}
                onUpdate={updateGroup}
                onRemove={removeGroup}
                onMove={moveGroup}
                addLabel="Add category"
                renderItem={(item, groupIndex, onGroupUpdate) => (
                    <div>
                        <Field label="Category title">
                            <TextInput value={item.title} onChange={(v) => onGroupUpdate({ title: v })} />
                        </Field>
                        <div className="edit-string-list">
                            <div className="edit-string-list__label">Items</div>
                            {item.items.map((sub, subIndex) => (
                                <div key={subIndex} className="edit-string-list__row">
                                    <TextInput
                                        value={sub}
                                        onChange={(v) => updateGroupItem(groupIndex, subIndex, v)}
                                    />
                                    <button
                                        type="button"
                                        className="edit-string-list__remove"
                                        onClick={() => removeGroupItem(groupIndex, subIndex)}
                                        aria-label="Remove"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="edit-string-list__add"
                                onClick={() => addGroupItem(groupIndex)}
                            >
                                + Add item
                            </button>
                        </div>
                    </div>
                )}
            />
        </div>
    );
}
