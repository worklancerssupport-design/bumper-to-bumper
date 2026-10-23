import { useDataFile } from '../hooks/useDataFile.js';
import { DATA_FILES } from '../constants.js';
import { Field, TextInput, Textarea, NumberInput, ImageField } from '../components/Fields.jsx';
import SectionCard from '../components/SectionCard.jsx';
import ArrayField from '../components/ArrayField.jsx';
import ActionBar from '../components/ActionBar.jsx';

export default function ReviewsEditor() {
    const hook = useDataFile(DATA_FILES.reviews, { commitPrefix: 'Update' });

    function updateTopField(field, value) {
        hook.updateEditData((draft) => {
            draft[field] = value;
        });
    }

    function nextReviewId() {
        const reviews = hook.editData?.reviews || [];
        return reviews.length ? Math.max(...reviews.map((r) => r.id)) + 1 : 1;
    }

    function updateReview(index, updates) {
        hook.updateEditData((draft) => {
            Object.assign(draft.reviews[index], updates);
        });
    }

    function addReview() {
        hook.updateEditData((draft) => {
            draft.reviews.push({
                id: nextReviewId(),
                initials: 'XX',
                name: 'New Reviewer',
                car: 'Car Model',
                mod: 'Modification',
                rating: 5,
                text: 'Review text...',
            });
        });
    }

    function removeReview(index) {
        hook.updateEditData((draft) => {
            draft.reviews.splice(index, 1);
        });
    }

    function moveReview(from, to) {
        if (to < 0 || to >= hook.editData.reviews.length) return;
        hook.updateEditData((draft) => {
            const [item] = draft.reviews.splice(from, 1);
            draft.reviews.splice(to, 0, item);
        });
    }

    function updateHighlight(index, updates) {
        hook.updateEditData((draft) => {
            Object.assign(draft.highlights[index], updates);
        });
    }

    function addHighlight() {
        hook.updateEditData((draft) => {
            draft.highlights.push({
                name: 'Reviewer Name',
                car: 'Car Model',
                text: 'Highlight text...',
            });
        });
    }

    function removeHighlight(index) {
        hook.updateEditData((draft) => {
            draft.highlights.splice(index, 1);
        });
    }

    function moveHighlight(from, to) {
        if (to < 0 || to >= hook.editData.highlights.length) return;
        hook.updateEditData((draft) => {
            const [item] = draft.highlights.splice(from, 1);
            draft.highlights.splice(to, 0, item);
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

            <SectionCard title="Header" subtitle="Overall rating shown on reviews page">
                <Field label="Rating">
                    <TextInput value={hook.editData?.rating} onChange={(v) => updateTopField('rating', v)} placeholder="5.0" />
                </Field>
                <Field label="Total reviews">
                    <TextInput value={hook.editData?.totalReviews} onChange={(v) => updateTopField('totalReviews', v)} placeholder="217+" />
                </Field>
                <Field label="Label">
                    <TextInput value={hook.editData?.totalReviewsLabel} onChange={(v) => updateTopField('totalReviewsLabel', v)} />
                </Field>
            </SectionCard>

            <ArrayField
                label="Reviews"
                items={hook.editData?.reviews || []}
                onAdd={addReview}
                onUpdate={updateReview}
                onRemove={removeReview}
                onMove={moveReview}
                addLabel="Add review"
                renderItem={(item, index, onItemUpdate) => (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                        <Field label="Initials">
                            <TextInput value={item.initials} onChange={(v) => onItemUpdate({ initials: v })} />
                        </Field>
                        <Field label="Rating">
                            <NumberInput value={item.rating} onChange={(v) => onItemUpdate({ rating: v })} min={1} max={5} />
                        </Field>
                        <Field label="Name">
                            <TextInput value={item.name} onChange={(v) => onItemUpdate({ name: v })} />
                        </Field>
                        <Field label="Car">
                            <TextInput value={item.car} onChange={(v) => onItemUpdate({ car: v })} />
                        </Field>
                        <div style={{ gridColumn: 'span 2' }}>
                            <Field label="Modification">
                                <TextInput value={item.mod} onChange={(v) => onItemUpdate({ mod: v })} />
                            </Field>
                        </div>
                        <div style={{ gridColumn: 'span 2' }}>
                            <Field label="Review text">
                                <Textarea value={item.text} onChange={(v) => onItemUpdate({ text: v })} rows={3} />
                            </Field>
                        </div>
                    </div>
                )}
            />

            <ArrayField
                label="Highlights"
                items={hook.editData?.highlights || []}
                onAdd={addHighlight}
                onUpdate={updateHighlight}
                onRemove={removeHighlight}
                onMove={moveHighlight}
                addLabel="Add highlight"
                renderItem={(item, index, onItemUpdate) => (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                        <Field label="Name">
                            <TextInput value={item.name} onChange={(v) => onItemUpdate({ name: v })} />
                        </Field>
                        <Field label="Car">
                            <TextInput value={item.car} onChange={(v) => onItemUpdate({ car: v })} />
                        </Field>
                        <div style={{ gridColumn: 'span 2' }}>
                            <Field label="Text">
                                <Textarea value={item.text} onChange={(v) => onItemUpdate({ text: v })} rows={2} />
                            </Field>
                        </div>
                    </div>
                )}
            />
        </div>
    );
}
