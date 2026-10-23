import { useEffect, useId, useRef, useState } from 'react';
import ImageEditor from './ImageEditor.jsx';
import './fields.css';

/* ============================================================
   FIELD — label, control, hint.
   `span` controls grid width inside a FieldGrid so a textarea or
   image field can take the full row without inline styles.
   ============================================================ */

export function Field({
    label,
    hint,
    children,
    required = false,
    span = 1,
    htmlFor,
    error,
}) {
    return (
        <div className={`edit-field edit-field--span-${span}${error ? ' edit-field--error' : ''}`}>
            {label && (
                <label className="edit-field__label" htmlFor={htmlFor}>
                    {label}
                    {required && (
                        <span className="edit-field__required" aria-hidden="true">
                            *
                        </span>
                    )}
                </label>
            )}
            {children}
            {error ? (
                <span className="edit-field__error">{error}</span>
            ) : (
                hint && <span className="edit-field__hint">{hint}</span>
            )}
        </div>
    );
}

/* ============================================================
   GRID — the layout primitive. Two balanced columns on desktop,
   single column on mobile. Sections compose from these.
   ============================================================ */

export function FieldGrid({ children, columns = 2, className = '' }) {
    return (
        <div
            className={`edit-grid edit-grid--${columns} ${className}`}
            style={{ '--edit-grid-columns': columns }}
        >
            {children}
        </div>
    );
}

/* ============================================================
   TEXT CONTROLS
   ============================================================ */

function useFieldIds(explicit) {
    const generated = useId();
    return explicit || generated;
}

export function TextInput({ value, onChange, placeholder, type = 'text', disabled = false, id, ...rest }) {
    const fieldId = useFieldIds(id);
    return (
        <input
            id={fieldId}
            type={type}
            className="edit-input"
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete="off"
            spellCheck={type === 'text' ? 'true' : undefined}
            {...rest}
        />
    );
}

export function Textarea({ value, onChange, placeholder, rows = 3, disabled = false, id, ...rest }) {
    const fieldId = useFieldIds(id);
    return (
        <textarea
            id={fieldId}
            className="edit-textarea"
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
            spellCheck="true"
            {...rest}
        />
    );
}

/**
 * Numeric input that keeps a raw text draft while focused.
 *
 * A `type="number"` control converted through `Number()` on every
 * keystroke cannot hold the intermediate states a number passes
 * through while being typed — `1.`, `-`, `0.`. The browser reports
 * no value for those, so the character is dropped and decimals can
 * never be entered. This keeps the typed text verbatim and only
 * commits a number once the text parses, clamping on blur.
 */
export function NumberInput({
    value,
    onChange,
    placeholder,
    min,
    max,
    step,
    disabled = false,
    id,
    ...rest
}) {
    const fieldId = useFieldIds(id);
    const [draft, setDraft] = useState(value == null || value === '' ? '' : String(value));
    const [focused, setFocused] = useState(false);
    const lastProp = useRef(value);

    // Adopt external changes (reload, discard, reset) unless the user
    // is mid-edit, so their caret and draft are never clobbered.
    useEffect(() => {
        if (focused) return;
        if (value === lastProp.current) return;
        lastProp.current = value;
        setDraft(value == null || value === '' ? '' : String(value));
    }, [value, focused]);

    function commit(raw) {
        const trimmed = raw.trim();
        if (trimmed === '') {
            onChange('');
            return;
        }
        const parsed = Number(trimmed);
        if (Number.isFinite(parsed)) onChange(parsed);
    }

    function handleChange(e) {
        const raw = e.target.value;
        // Accept only a numeric shape: optional minus, digits, one dot.
        // Anything else would be silently discarded on blur anyway.
        if (!/^-?\d*\.?\d*$/.test(raw)) return;
        lastProp.current = value;
        setDraft(raw);
        commit(raw);
    }

    function handleBlur() {
        setFocused(false);
        const trimmed = draft.trim();
        if (trimmed === '') {
            setDraft('');
            onChange('');
            return;
        }
        const parsed = Number(trimmed);
        if (!Number.isFinite(parsed)) {
            setDraft('');
            onChange('');
            return;
        }
        const clamped = Math.min(
            max === undefined ? Infinity : Number(max),
            Math.max(min === undefined ? -Infinity : Number(min), parsed)
        );
        setDraft(String(clamped));
        if (clamped !== value) onChange(clamped);
    }

    return (
        <input
            id={fieldId}
            type="text"
            inputMode="decimal"
            className="edit-input edit-input--tabular"
            value={draft}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete="off"
            {...rest}
        />
    );
}

/* ============================================================
   SELECT — native control, themed. Never a custom listbox: a
   non-standard dropdown invents affordance and breaks the keyboard.
   ============================================================ */

export function Select({ value, onChange, options = [], placeholder, disabled = false, id, ...rest }) {
    const fieldId = useFieldIds(id);
    return (
        <div className="edit-select-wrap">
            <select
                id={fieldId}
                className="edit-select"
                value={value ?? ''}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                {...rest}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((opt) => {
                    const optValue = typeof opt === 'string' ? opt : opt.value;
                    const optLabel = typeof opt === 'string' ? opt : opt.label;
                    return (
                        <option key={optValue} value={optValue}>
                            {optLabel}
                        </option>
                    );
                })}
            </select>
            <svg className="edit-select-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <polyline points="6 9 12 15 18 9" />
            </svg>
        </div>
    );
}

/* ============================================================
   TOGGLE — switch role, keyboard operable, label is real text
   ============================================================ */

export function Toggle({ value, onChange, label, disabled = false, id }) {
    const fieldId = useFieldIds(id);
    return (
        <button
            id={fieldId}
            type="button"
            role="switch"
            aria-checked={!!value}
            disabled={disabled}
            className={`edit-toggle ${value ? 'edit-toggle--on' : ''}`}
            onClick={() => onChange(!value)}
        >
            <span className="edit-toggle__track" aria-hidden="true">
                <span className="edit-toggle__thumb" />
            </span>
            {label && <span className="edit-toggle__label">{label}</span>}
        </button>
    );
}

/* ============================================================
   IMAGE FIELD
   Thumbnail + change/remove. Opens the ImageEditor modal, which is
   the one place a modal is right: it interrupts, needs protected
   focus, and guards an upload in flight.
   ============================================================ */

export function ImageField({ value, onChange, alt = 'image', compact = false, label }) {
    const [open, setOpen] = useState(false);
    const [broken, setBroken] = useState(false);

    // Reset the broken flag when the URL changes to something new.
    const [lastValue, setLastValue] = useState(value);
    if (value !== lastValue) {
        setLastValue(value);
        setBroken(false);
    }

    return (
        <>
            <div className={`edit-image-field${compact ? ' edit-image-field--compact' : ''}`}>
                {value ? (
                    <button
                        type="button"
                        className="edit-image-field__preview"
                        onClick={() => setOpen(true)}
                        aria-label={`Change ${alt}`}
                    >
                        {broken ? (
                            <span className="edit-image-field__broken">Image unavailable</span>
                        ) : (
                            <img
                                src={value}
                                alt=""
                                onError={() => setBroken(true)}
                            />
                        )}
                        <span className="edit-image-field__overlay">
                            <span>Change image</span>
                        </span>
                    </button>
                ) : (
                    <button
                        type="button"
                        className="edit-image-field__add"
                        onClick={() => setOpen(true)}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="9" cy="9" r="1.5" />
                            <path d="m21 15-5-5L5 21" />
                        </svg>
                        <span>Add image</span>
                    </button>
                )}
                {value && (
                    <div className="edit-image-field__actions">
                        <button
                            type="button"
                            className="edit-btn edit-btn--sm"
                            onClick={() => setOpen(true)}
                        >
                            Change
                        </button>
                        <button
                            type="button"
                            className="edit-btn edit-btn--sm edit-btn--danger"
                            onClick={() => onChange('')}
                        >
                            Remove
                        </button>
                    </div>
                )}
                {label && <span className="edit-field__hint">{label}</span>}
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

/* ============================================================
   COMMA LIST — edits an array of strings through one input.
   Far clearer than N stacked single-field rows for tags and
   filter keywords. Shows the resulting tokens live.
   ============================================================ */

export function CommaList({ value, onChange, placeholder, disabled = false, id }) {
    const fieldId = useFieldIds(id);
    const list = Array.isArray(value) ? value : [];
    const joined = list.join(', ');
    const [draft, setDraft] = useState(joined);
    const [focused, setFocused] = useState(false);

    // Adopt external changes unless the field is being typed in. Without
    // this the text is rebuilt from the parsed array on every keystroke,
    // which strips a trailing comma and appends the next entry onto the
    // previous one.
    useEffect(() => {
        if (!focused) setDraft(joined);
    }, [joined, focused]);

    function parse(raw) {
        return raw
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);
    }

    return (
        <div className="edit-comma">
            <input
                id={fieldId}
                type="text"
                className="edit-input"
                value={draft}
                disabled={disabled}
                placeholder={placeholder || 'One item, comma separated'}
                onFocus={() => setFocused(true)}
                onBlur={() => {
                    setFocused(false);
                    setDraft(parse(draft).join(', '));
                }}
                onChange={(e) => {
                    setDraft(e.target.value);
                    onChange(parse(e.target.value));
                }}
            />
            {list.length > 0 && (
                <div className="edit-comma__tokens" aria-hidden="true">
                    {list.map((item, i) => (
                        <span key={`${item}-${i}`} className="edit-badge">
                            {item}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}