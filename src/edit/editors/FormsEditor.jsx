import { useState } from 'react';
import { ArrowUp, ArrowDown, Plus, X, Briefcase, Zap, TrendingUp } from 'lucide-react';
import { useDataFile } from '../hooks/useDataFile.js';
import { DATA_FILES } from '../constants.js';
import ActionBar from '../components/ActionBar.jsx';
import './products-editor.css';

// ============================================================
// Section header
// ============================================================
function SectionHeader({ icon: Icon, title, hint, count }) {
    return (
        <div className="form-section__header">
            <div className="form-section__icon">
                <Icon size={16} />
            </div>
            <div className="form-section__heading">
                <h3 className="form-section__title">{title}</h3>
                {hint && <p className="form-section__hint">{hint}</p>}
            </div>
            <span className="form-section__count">{count}</span>
        </div>
    );
}

// ============================================================
// String row (single value, used for contact services + investment ranges)
// ============================================================
function StringRow({ value, index, total, onChange, onRemove, onMove }) {
    return (
        <div className="form-list__row">
            <input
                className="edit-input"
                value={value}
                onChange={(e) => onChange(index, e.target.value)}
                placeholder="Enter value…"
            />
            <div className="form-list__actions">
                <button
                    type="button"
                    className="form-list__btn"
                    disabled={index === 0}
                    onClick={() => onMove(index, index - 1)}
                    aria-label="Move up"
                >
                    <ArrowUp size={13} />
                </button>
                <button
                    type="button"
                    className="form-list__btn"
                    disabled={index === total - 1}
                    onClick={() => onMove(index, index + 1)}
                    aria-label="Move down"
                >
                    <ArrowDown size={13} />
                </button>
                <button
                    type="button"
                    className="form-list__btn form-list__btn--delete"
                    onClick={() => onRemove(index)}
                    aria-label="Delete"
                >
                    <X size={14} />
                </button>
            </div>
        </div>
    );
}

// ============================================================
// Object row (two fields: value + label)
// ============================================================
function ObjectRow({ item, index, total, fields, onChange, onRemove, onMove }) {
    return (
        <div className="form-list__row">
            {fields.map((f) => (
                <div key={f.key} className="form-list__field">
                    <span className="form-list__field-label">{f.label}</span>
                    <input
                        className="edit-input"
                        value={item[f.key] || ''}
                        onChange={(e) => onChange(index, f.key, e.target.value)}
                        placeholder={f.placeholder}
                    />
                </div>
            ))}
            <div className="form-list__actions" style={{ alignSelf: 'flex-end', paddingBottom: 1 }}>
                <button
                    type="button"
                    className="form-list__btn"
                    disabled={index === 0}
                    onClick={() => onMove(index, index - 1)}
                    aria-label="Move up"
                >
                    <ArrowUp size={13} />
                </button>
                <button
                    type="button"
                    className="form-list__btn"
                    disabled={index === total - 1}
                    onClick={() => onMove(index, index + 1)}
                    aria-label="Move down"
                >
                    <ArrowDown size={13} />
                </button>
                <button
                    type="button"
                    className="form-list__btn form-list__btn--delete"
                    onClick={() => onRemove(index)}
                    aria-label="Delete"
                >
                    <X size={14} />
                </button>
            </div>
        </div>
    );
}

// ============================================================
// Main editor
// ============================================================
export default function FormsEditor() {
    const hook = useDataFile(DATA_FILES.forms, { commitPrefix: 'Update' });

    const contact = hook.editData?.contactServices || [];
    const enquiry = hook.editData?.quickEnquiryServices || [];
    const invest = hook.editData?.franchiseInvestments || [];

    // --- Contact services (string[]) ---
    function updateService(index, value) {
        hook.updateEditData((draft) => {
            draft.contactServices[index] = value;
        });
    }
    function addService() {
        hook.updateEditData((draft) => {
            draft.contactServices.push('New Service');
        });
    }
    function removeService(index) {
        hook.updateEditData((draft) => {
            draft.contactServices.splice(index, 1);
        });
    }
    function moveService(from, to) {
        if (to < 0 || to >= contact.length) return;
        hook.updateEditData((draft) => {
            const [m] = draft.contactServices.splice(from, 1);
            draft.contactServices.splice(to, 0, m);
        });
    }

    // --- Quick enquiry services ({value, label}[]) ---
    function updateEnquiry(index, field, value) {
        hook.updateEditData((draft) => {
            draft.quickEnquiryServices[index][field] = value;
        });
    }
    function addEnquiry() {
        hook.updateEditData((draft) => {
            draft.quickEnquiryServices.push({ value: 'new-value', label: 'New Enquiry Option' });
        });
    }
    function removeEnquiry(index) {
        hook.updateEditData((draft) => {
            draft.quickEnquiryServices.splice(index, 1);
        });
    }
    function moveEnquiry(from, to) {
        if (to < 0 || to >= enquiry.length) return;
        hook.updateEditData((draft) => {
            const [m] = draft.quickEnquiryServices.splice(from, 1);
            draft.quickEnquiryServices.splice(to, 0, m);
        });
    }

    // --- Franchise investments (string[]) ---
    function updateInvest(index, value) {
        hook.updateEditData((draft) => {
            draft.franchiseInvestments[index] = value;
        });
    }
    function addInvest() {
        hook.updateEditData((draft) => {
            draft.franchiseInvestments.push('New Range');
        });
    }
    function removeInvest(index) {
        hook.updateEditData((draft) => {
            draft.franchiseInvestments.splice(index, 1);
        });
    }
    function moveInvest(from, to) {
        if (to < 0 || to >= invest.length) return;
        hook.updateEditData((draft) => {
            const [m] = draft.franchiseInvestments.splice(from, 1);
            draft.franchiseInvestments.splice(to, 0, m);
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

            {/* Contact Services */}
            <div className="form-section">
                <SectionHeader
                    icon={Briefcase}
                    title="Contact Form — Services"
                    hint="Shown in the contact form service dropdown"
                    count={contact.length}
                />
                {contact.length === 0 ? (
                    <div className="form-list__empty">No services yet.</div>
                ) : (
                    <div className="form-list">
                        {contact.map((value, index) => (
                            <StringRow
                                key={`contact-${index}`}
                                value={value}
                                index={index}
                                total={contact.length}
                                onChange={updateService}
                                onRemove={removeService}
                                onMove={moveService}
                            />
                        ))}
                    </div>
                )}
                <button type="button" className="form-list__add" onClick={addService}>
                    <Plus size={12} /> Add service
                </button>
            </div>

            {/* Quick Enquiry Services */}
            <div className="form-section">
                <SectionHeader
                    icon={Zap}
                    title="Quick Enquiry — Service Options"
                    hint="Internal value + display label shown in the quick enquiry form"
                    count={enquiry.length}
                />
                {enquiry.length === 0 ? (
                    <div className="form-list__empty">No enquiry options yet.</div>
                ) : (
                    <div className="form-list">
                        {enquiry.map((item, index) => (
                            <ObjectRow
                                key={`enquiry-${index}`}
                                item={item}
                                index={index}
                                total={enquiry.length}
                                fields={[
                                    { key: 'value', label: 'Value (internal)', placeholder: 'e.g. seat-covers' },
                                    { key: 'label', label: 'Label (display)', placeholder: 'e.g. Seat Covers' },
                                ]}
                                onChange={updateEnquiry}
                                onRemove={removeEnquiry}
                                onMove={moveEnquiry}
                            />
                        ))}
                    </div>
                )}
                <button type="button" className="form-list__add" onClick={addEnquiry}>
                    <Plus size={12} /> Add option
                </button>
            </div>

            {/* Franchise Investment Ranges */}
            <div className="form-section">
                <SectionHeader
                    icon={TrendingUp}
                    title="Franchise — Investment Ranges"
                    hint="Shown in the franchise enquiry form range selector"
                    count={invest.length}
                />
                {invest.length === 0 ? (
                    <div className="form-list__empty">No investment ranges yet.</div>
                ) : (
                    <div className="form-list">
                        {invest.map((value, index) => (
                            <StringRow
                                key={`invest-${index}`}
                                value={value}
                                index={index}
                                total={invest.length}
                                onChange={updateInvest}
                                onRemove={removeInvest}
                                onMove={moveInvest}
                            />
                        ))}
                    </div>
                )}
                <button type="button" className="form-list__add" onClick={addInvest}>
                    <Plus size={12} /> Add range
                </button>
            </div>
        </div>
    );
}
