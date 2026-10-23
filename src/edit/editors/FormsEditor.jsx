import { Plus, Briefcase, Zap, TrendingUp } from 'lucide-react';
import { useForms } from '../hooks/useForms.js';
import { CommaList } from '../components/Fields.jsx';
import EditorFrame from '../components/EditorFrame.jsx';
import SectionCard from '../components/SectionCard.jsx';
import '../components/item-row.css';

function ChoiceList({ label, items, actions, itemKey, onChange, placeholder }) {
    return (
        <div className="edit-choices">
            {items.length === 0 && <p className="edit-choices__empty">Nothing here yet — add the first option.</p>}
            {items.map((item, i) => (
                <div key={`${itemKey}-${i}`} className="edit-choice">
                    <span className="edit-choice__index">{String(i + 1).padStart(2, '0')}</span>
                    {typeof item === 'string' ? (
                        <input
                            className="edit-input"
                            value={item}
                            placeholder={placeholder}
                            onChange={(e) => onChange(i, e.target.value)}
                        />
                    ) : (
                        <div className="edit-choice__pair">
                            <input
                                className="edit-input"
                                value={item.value || ''}
                                placeholder="Value (internal)"
                                onChange={(e) => actions.update(i, 'value', e.target.value)}
                            />
                            <input
                                className="edit-input"
                                value={item.label || ''}
                                placeholder="Label (shown to users)"
                                onChange={(e) => actions.update(i, 'label', e.target.value)}
                            />
                        </div>
                    )}
                    <div className="edit-choice__actions">
                        <button
                            type="button"
                            className="edit-icon-btn edit-icon-btn--sm"
                            onClick={() => actions.move(i, i - 1)}
                            disabled={i === 0}
                            aria-label="Move up"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="m18 15-6-6-6 6" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            className="edit-icon-btn edit-icon-btn--sm"
                            onClick={() => actions.move(i, i + 1)}
                            disabled={i === items.length - 1}
                            aria-label="Move down"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            className="edit-icon-btn edit-icon-btn--sm edit-icon-btn--danger"
                            onClick={() => actions.remove(i)}
                            aria-label="Remove"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6 6 18M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            ))}
            <button type="button" className="edit-add" onClick={actions.add}>
                <Plus size={14} />
                Add option
            </button>
        </div>
    );
}

export default function FormsEditor() {
    const hook = useForms();
    const d = hook.editData;

    const contact = d?.contactServices || [];
    const enquiry = d?.quickEnquiryServices || [];
    const investments = d?.franchiseInvestments || [];

    return (
        <EditorFrame sectionId="forms" hook={hook}>
            <SectionCard
                icon={Briefcase}
                title="Contact form — services"
                subtitle="Options in the service dropdown on the contact page."
                action={<span className="edit-badge edit-badge--count">{contact.length}</span>}
            >
                <ChoiceList
                    items={contact}
                    itemKey="c"
                    actions={hook.lists.contactServices}
                    onChange={(i, v) => hook.updateEditData((draft) => { draft.contactServices[i] = v; })}
                    placeholder="Service name"
                />
            </SectionCard>

            <SectionCard
                icon={Zap}
                title="Quick enquiry — services"
                subtitle="Options in the quick enquiry form. The value is what gets submitted; the label is what users read."
                action={<span className="edit-badge edit-badge--count">{enquiry.length}</span>}
            >
                <ChoiceList
                    items={enquiry}
                    itemKey="q"
                    actions={hook.lists.quickEnquiryServices}
                    placeholder="Service name"
                />
            </SectionCard>

            <SectionCard
                icon={TrendingUp}
                title="Franchise — investment ranges"
                subtitle="Options in the franchise enquiry form's budget selector."
                action={<span className="edit-badge edit-badge--count">{investments.length}</span>}
            >
                <ChoiceList
                    items={investments}
                    itemKey="f"
                    actions={hook.lists.franchiseInvestments}
                    onChange={(i, v) => hook.updateEditData((draft) => { draft.franchiseInvestments[i] = v; })}
                    placeholder="e.g. 10L – 25L"
                />
            </SectionCard>
        </EditorFrame>
    );
}