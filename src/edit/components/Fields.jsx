import { useState } from 'react';
import ImageEditor from './ImageEditor.jsx';
import './fields.css';

export function Field({ label, hint, children, required = false }) {
    return (
        <div className="edit-field">
            {label && (
                <label className="edit-field__label">
                    {label}
                    {required && <span className="edit-field__required">*</span>}
                </label>
            )}
            {children}
            {hint && <span className="edit-field__hint">{hint}</span>}
        </div>
    );
}

export function TextInput({ value, onChange, placeholder, type = 'text', disabled = false }) {
    return (
        <input
            type={type}
            className="edit-input"
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
        />
    );
}

export function Textarea({ value, onChange, placeholder, rows = 3, disabled = false }) {
    return (
        <textarea
            className="edit-textarea"
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
        />
    );
}

export function NumberInput({ value, onChange, placeholder, min, max, step }) {
    return (
        <input
            type="number"
            className="edit-input"
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder={placeholder}
            min={min}
            max={max}
            step={step}
        />
    );
}

export function Toggle({ value, onChange, label }) {
    return (
        <button
            type="button"
            className={`edit-toggle ${value ? 'edit-toggle--on' : ''}`}
            onClick={() => onChange(!value)}
            role="switch"
            aria-checked={value}
        >
            <span className="edit-toggle__track">
                <span className="edit-toggle__thumb" />
            </span>
            {label && <span className="edit-toggle__label">{label}</span>}
        </button>
    );
}

export function Select({ value, onChange, options, placeholder }) {
    return (
        <select
            className="edit-select"
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
        >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((opt) => (
                <option key={typeof opt === 'string' ? opt : opt.value} value={typeof opt === 'string' ? opt : opt.value}>
                    {typeof opt === 'string' ? opt : opt.label}
                </option>
            ))}
        </select>
    );
}

export function ImageField({ value, onChange, alt = 'image', compact = false }) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className={`edit-image-field ${compact ? 'edit-image-field--compact' : ''}`}>
                {value ? (
                    <div className="edit-image-field__preview" onClick={() => setOpen(true)}>
                        <img src={value} alt="" onError={(e) => { e.target.style.display = 'none'; }} />
                        <div className="edit-image-field__overlay">
                            <span>Click to change</span>
                        </div>
                    </div>
                ) : (
                    <button type="button" className="edit-image-field__add" onClick={() => setOpen(true)}>
                        + Add image
                    </button>
                )}
                {value && (
                    <button type="button" className="edit-image-field__edit" onClick={() => setOpen(true)}>
                        Edit
                    </button>
                )}
            </div>
            {open && (
                <ImageEditor
                    value={value}
                    onChange={onChange}
                    onClose={() => setOpen(false)}
                    alt={alt}
                />
            )}
        </>
    );
}
