import { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowUp, ArrowDown, Plus, HelpCircle, MessageSquare, X } from 'lucide-react';
import { useDataFile } from '../hooks/useDataFile.js';
import { DATA_FILES } from '../constants.js';
import { Field, Textarea } from '../components/Fields.jsx';
import SectionCard from '../components/SectionCard.jsx';
import ActionBar from '../components/ActionBar.jsx';
import './products-editor.css';

const SECTIONS = [
    { key: 'homepage', label: 'Homepage' },
    { key: 'about', label: 'About' },
    { key: 'exterior', label: 'Exterior' },
    { key: 'interior', label: 'Interior' },
];

// ============================================================
// FAQ Card (compact — no thumb)
// ============================================================
function FAQCard({ item, index, total, expanded, onToggle, onChange, onRemove, onMove }) {
    return (
        <div className={`product-card product-card--compact ${expanded ? 'product-card--expanded' : ''}`}>
            <div className="product-card__header" onClick={() => onToggle(index)}>
                <div className="product-card__drag" onClick={(e) => e.stopPropagation()}>
                    <div className="product-card__move">
                        <button type="button" disabled={index === 0} onClick={() => onMove(index, index - 1)} aria-label="Move up">
                            <ArrowUp size={12} />
                        </button>
                        <button type="button" disabled={index === total - 1} onClick={() => onMove(index, index + 1)} aria-label="Move down">
                            <ArrowDown size={12} />
                        </button>
                    </div>
                </div>
                <div className="product-card__icon">
                    <HelpCircle size={14} />
                </div>
                <div className="product-card__info">
                    <div className="product-card__name">
                        {item.q ? item.q : <em>Untitled question</em>}
                    </div>
                </div>
                <div className="product-card__chevron">
                    {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
            </div>

            {expanded && (
                <div className="product-card__body">
                    <div className="product-card__panel">
                        <Field label="Question">
                            <Textarea
                                value={item.q}
                                onChange={(v) => onChange(index, 'q', v)}
                                rows={2}
                            />
                        </Field>
                        <Field label="Answer">
                            <Textarea
                                value={item.a}
                                onChange={(v) => onChange(index, 'a', v)}
                                rows={4}
                            />
                        </Field>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                                type="button"
                                className="product-card__delete"
                                onClick={() => onRemove(index)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ============================================================
// Section header (Expand/Add)
// ============================================================
function FAQSectionHeader({ label, count, allExpanded, onToggleAll, onAdd }) {
    return (
        <div className="product-editor__list-header">
            <div>
                <h3 className="product-editor__list-title">{label} <span className="product-card__count">({count})</span></h3>
            </div>
            <div className="product-editor__list-actions">
                <button type="button" className="product-editor__list-action" onClick={onToggleAll}>
                    {allExpanded ? 'Collapse all' : 'Expand all'}
                </button>
                <button type="button" className="product-editor__list-action product-editor__list-action--primary" onClick={onAdd}>
                    <Plus size={12} /> Add FAQ
                </button>
            </div>
        </div>
    );
}

// ============================================================
// Main editor
// ============================================================
export default function FAQsEditor() {
    const hook = useDataFile(DATA_FILES.faqs, { commitPrefix: 'Update' });
    // openMap[section] = { [idx]: bool }
    const [openMap, setOpenMap] = useState({});

    function toggleOpen(section, idx) {
        setOpenMap((prev) => ({
            ...prev,
            [section]: { ...(prev[section] || {}), [idx]: !prev[section]?.[idx] },
        }));
    }

    function toggleAll(section, total) {
        const cur = openMap[section] || {};
        const allOpen = Object.values(cur).filter(Boolean).length === total;
        const next = {};
        for (let i = 0; i < total; i++) next[i] = !allOpen;
        setOpenMap((prev) => ({ ...prev, [section]: next }));
    }

    function updateFAQ(section, index, field, value) {
        hook.updateEditData((draft) => {
            draft[section][index][field] = value;
        });
    }
    function addFAQ(section) {
        hook.updateEditData((draft) => {
            draft[section].push({ q: 'New question?', a: 'Answer...' });
        });
    }
    function removeFAQ(section, index) {
        hook.updateEditData((draft) => {
            draft[section].splice(index, 1);
        });
    }
    function moveFAQ(section, from, to) {
        if (to < 0 || to >= hook.editData[section].length) return;
        hook.updateEditData((draft) => {
            const [item] = draft[section].splice(from, 1);
            draft[section].splice(to, 0, item);
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

            <div style={{
                background: 'var(--bg-surface, #161616)',
                border: '1px solid var(--border-subtle, rgba(255,255,255,0.06))',
                borderRadius: 8,
                padding: '12px 16px',
                marginBottom: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontSize: 13,
                color: 'var(--text-secondary, #b0b0b0)',
            }}>
                <HelpCircle size={16} style={{ color: 'var(--brand-red, #e63946)' }} />
                <span>FAQs are grouped by page. Each card is one question — click to expand and edit.</span>
            </div>

            {SECTIONS.map(({ key, label }) => {
                const list = hook.editData?.[key] || [];
                const cur = openMap[key] || {};
                const allExpanded = list.length > 0 && Object.values(cur).filter(Boolean).length === list.length;

                return (
                    <div key={key} style={{ marginBottom: 24 }}>
                        <FAQSectionHeader
                            label={`${label} FAQs`}
                            count={list.length}
                            allExpanded={allExpanded}
                            onToggleAll={() => toggleAll(key, list.length)}
                            onAdd={() => addFAQ(key)}
                        />
                        {list.length === 0 ? (
                            <div style={{
                                padding: 24,
                                textAlign: 'center',
                                color: 'var(--text-muted, #707070)',
                                fontSize: 12,
                                border: '1px dashed var(--border, rgba(255,255,255,0.10))',
                                borderRadius: 8,
                            }}>
                                No FAQs yet — click "Add FAQ" to create one.
                            </div>
                        ) : (
                            <div className="product-editor__list">
                                {list.map((item, index) => (
                                    <FAQCard
                                        key={`${key}-${index}`}
                                        item={item}
                                        index={index}
                                        total={list.length}
                                        expanded={!!cur[index]}
                                        onToggle={(i) => toggleOpen(key, i)}
                                        onChange={(i, field, value) => updateFAQ(key, i, field, value)}
                                        onRemove={(i) => removeFAQ(key, i)}
                                        onMove={(from, to) => moveFAQ(key, from, to)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
