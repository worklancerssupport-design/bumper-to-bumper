import { useState } from 'react';
import { Star, Plus, Sparkles, Gauge } from 'lucide-react';
import { useReviews } from '../hooks/useReviews.js';
import { Field, FieldGrid, TextInput, Textarea, NumberInput } from '../components/Fields.jsx';
import SectionCard, { ListHeader } from '../components/SectionCard.jsx';
import EditorFrame from '../components/EditorFrame.jsx';
import ItemRow, { ItemList, RowBadge } from '../components/ItemRow.jsx';
import '../components/item-row.css';

function Stars({ rating }) {
    const n = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));
    return (
        <span className="edit-stars" aria-label={`${n} out of 5`}>
            {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={11} fill={i < n ? 'currentColor' : 'none'} aria-hidden="true" />
            ))}
        </span>
    );
}

export default function ReviewsEditor() {
    const hook = useReviews();
    const [open, setOpen] = useState({});
    const toggle = (k) => () => setOpen((p) => ({ ...p, [k]: !p[k] }));

    const d = hook.editData;
    const reviews = d?.reviews || [];
    const highlights = d?.highlights || [];

    function nextId() {
        const ids = reviews.map((r) => Number(r.id)).filter(Number.isFinite);
        return ids.length ? Math.max(...ids) + 1 : 1;
    }

    function addReview() {
        hook.lists.reviews.add({
            id: nextId(),
            initials: 'AB',
            name: 'New Reviewer',
            car: 'Car model',
            mod: 'Modification',
            rating: 5,
            text: 'What did they say?',
        });
        setOpen((p) => ({ ...p, [`r${reviews.length}`]: true }));
    }

    return (
        <EditorFrame sectionId="reviews" hook={hook}>
            <SectionCard
                icon={Gauge}
                title="Overall rating"
                subtitle="The summary shown at the top of the reviews page."
            >
                <FieldGrid>
                    <Field label="Average rating" hint="One decimal, out of 5.">
                        <TextInput
                            value={d?.rating}
                            onChange={(v) => hook.updateEditData((draft) => { draft.rating = v; })}
                            placeholder="5.0"
                        />
                    </Field>
                    <Field label="Total reviews" hint="Displayed as a count with a plus.">
                        <TextInput
                            value={d?.totalReviews}
                            onChange={(v) => hook.updateEditData((draft) => { draft.totalReviews = v; })}
                            placeholder="217"
                        />
                    </Field>
                    <Field label="Count label" span={2} hint="Word or phrase after the number.">
                        <TextInput
                            value={d?.totalReviewsLabel}
                            onChange={(v) => hook.updateEditData((draft) => { draft.totalReviewsLabel = v; })}
                            placeholder="Google reviews"
                        />
                    </Field>
                </FieldGrid>
            </SectionCard>

            <section className="edit-stack">
                <ListHeader
                    title="Reviews"
                    count={reviews.length}
                    hint="Customer reviews shown in the reviews grid. Keep the customer's own words — these are trust signals."
                    actions={
                        <button type="button" className="edit-btn edit-btn--primary edit-btn--sm" onClick={addReview}>
                            <Plus size={13} />
                            Add review
                        </button>
                    }
                />
                <ItemList
                    items={reviews}
                    addLabel="Add review"
                    onAdd={addReview}
                    renderItem={(item, i) => (
                        <ItemRow
                            key={`rev-${i}`}
                            index={i}
                            total={reviews.length}
                            open={!!open[`r${i}`]}
                            onToggle={toggle(`r${i}`)}
                            onMove={hook.lists.reviews.move}
                            onRemove={hook.lists.reviews.remove}
                            removeLabel="Remove review"
                            summary={
                                <>
                                    <span className="edit-row__title">{item.name || 'Anonymous'}</span>
                                    <Stars rating={item.rating} />
                                    {item.car && <span className="edit-row__sub">{item.car}</span>}
                                </>
                            }
                        >
                            <FieldGrid>
                                <Field label="Reviewer name">
                                    <TextInput
                                        value={item.name}
                                        onChange={(v) => hook.updateEditData((draft) => { draft.reviews[i].name = v; })}
                                    />
                                </Field>
                                <Field label="Vehicle" hint="Which car they own.">
                                    <TextInput
                                        value={item.car}
                                        onChange={(v) => hook.updateEditData((draft) => { draft.reviews[i].car = v; })}
                                    />
                                </Field>
                                <Field label="Initials" hint="Shown in the avatar circle.">
                                    <TextInput
                                        value={item.initials}
                                        onChange={(v) => hook.updateEditData((draft) => { draft.reviews[i].initials = v; })}
                                        maxLength={3}
                                    />
                                </Field>
                                <Field label="Rating" hint="Whole numbers from 1 to 5.">
                                    <NumberInput
                                        value={item.rating}
                                        onChange={(v) =>
                                            hook.updateEditData((draft) => {
                                                draft.reviews[i].rating = v;
                                            })
                                        }
                                        min={1}
                                        max={5}
                                    />
                                </Field>
                                <Field label="Modification" span={2} hint="What was installed on their car.">
                                    <TextInput
                                        value={item.mod}
                                        onChange={(v) => hook.updateEditData((draft) => { draft.reviews[i].mod = v; })}
                                    />
                                </Field>
                                <Field label="Review" span={2} hint="Their words, in their own voice.">
                                    <Textarea
                                        value={item.text}
                                        onChange={(v) => hook.updateEditData((draft) => { draft.reviews[i].text = v; })}
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
                    title="Highlights"
                    count={highlights.length}
                    hint="Short quotes rotated in the homepage strip. Slightly punchier than the full reviews."
                    actions={
                        <button
                            type="button"
                            className="edit-btn edit-btn--primary edit-btn--sm"
                            onClick={() => {
                                hook.lists.highlights.add({
                                    name: 'Reviewer Name',
                                    car: 'Car model',
                                    text: 'Short highlight…',
                                });
                                setOpen((p) => ({ ...p, [`h${highlights.length}`]: true }));
                            }}
                        >
                            <Plus size={13} />
                            Add highlight
                        </button>
                    }
                />
                <ItemList
                    items={highlights}
                    addLabel="Add highlight"
                    onAdd={() =>
                        hook.lists.highlights.add({
                            name: 'Reviewer Name',
                            car: 'Car model',
                            text: 'Short highlight…',
                        })
                    }
                    renderItem={(item, i) => (
                        <ItemRow
                            key={`hl-${i}`}
                            index={i}
                            total={highlights.length}
                            open={!!open[`h${i}`]}
                            onToggle={toggle(`h${i}`)}
                            onMove={hook.lists.highlights.move}
                            onRemove={hook.lists.highlights.remove}
                            removeLabel="Remove highlight"
                            summary={
                                <>
                                    <Sparkles size={12} aria-hidden="true" className="edit-row__accent" />
                                    <span className="edit-row__title">{item.name || 'Anonymous'}</span>
                                    <span className="edit-row__sub">{item.car}</span>
                                </>
                            }
                        >
                            <FieldGrid>
                                <Field label="Reviewer name">
                                    <TextInput
                                        value={item.name}
                                        onChange={(v) => hook.updateEditData((draft) => { draft.highlights[i].name = v; })}
                                    />
                                </Field>
                                <Field label="Vehicle">
                                    <TextInput
                                        value={item.car}
                                        onChange={(v) => hook.updateEditData((draft) => { draft.highlights[i].car = v; })}
                                    />
                                </Field>
                                <Field label="Highlight" span={2} hint="One punchy sentence.">
                                    <Textarea
                                        value={item.text}
                                        onChange={(v) => hook.updateEditData((draft) => { draft.highlights[i].text = v; })}
                                        rows={2}
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