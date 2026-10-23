import { useState, useEffect, useRef } from 'react';
import { Link2, Upload, Camera, X, ImageOff, Trash2 } from 'lucide-react';
import { uploadImage, isValidImageUrl, captureFromCamera } from '../lib/cloudinary.js';
import './ImageEditor.css';

/**
 * The one place a modal is right: uploading guards work in flight
 * and needs protected focus. Uses <dialog> so focus trapping and
 * Escape come from the platform rather than hand-rolled listeners.
 */
export default function ImageEditor({ value, onChange, onClose, alt = 'image' }) {
    const dialogRef = useRef(null);
    const [tab, setTab] = useState(value ? 'url' : 'upload');
    const [url, setUrl] = useState(value || '');
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [previewError, setPreviewError] = useState(false);
    const cameraRef = useRef(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (dialog && !dialog.open) dialog.showModal();
    }, []);

    function handleUrlSave() {
        const trimmed = url.trim();
        if (!trimmed) {
            setError('Enter an image URL first.');
            return;
        }
        if (!isValidImageUrl(trimmed)) {
            setError('Use a link from an allowed image host, or one ending in .jpg, .png, or .webp.');
            return;
        }
        onChange(trimmed);
        onClose();
    }

    async function handleFileUpload(file) {
        if (!file) return;
        setError('');
        setUploading(true);
        try {
            const { url: secureUrl } = await uploadImage(file);
            onChange(secureUrl);
            onClose();
        } catch (err) {
            setError(err.message || 'The upload did not go through. Check your connection and try again.');
        } finally {
            setUploading(false);
        }
    }

    function onDialogClick(e) {
        // Clicking the backdrop (the dialog element itself) closes.
        if (e.target === dialogRef.current) onClose();
    }

    return (
        <dialog ref={dialogRef} className="image-editor" onClose={onClose} onClick={onDialogClick}>
            <div className="image-editor__panel">
                <header className="image-editor__header">
                    <div>
                        <h2 className="image-editor__title">{alt}</h2>
                        <p className="image-editor__subtitle">
                            Upload a new photo, take one, or paste a link to an existing image.
                        </p>
                    </div>
                    <button type="button" className="edit-icon-btn" onClick={onClose} aria-label="Close">
                        <X size={16} />
                    </button>
                </header>

                {value && (
                    <div className="image-editor__preview">
                        {previewError ? (
                            <div className="image-editor__preview-error">
                                <ImageOff size={24} />
                                <span>The current image could not be loaded.</span>
                            </div>
                        ) : (
                            <img src={value} alt="Current" onError={() => setPreviewError(true)} />
                        )}
                    </div>
                )}

                <div className="image-editor__tabs" role="tablist">
                    {[
                        { id: 'upload', label: 'Upload', icon: Upload },
                        { id: 'camera', label: 'Camera', icon: Camera },
                        { id: 'url', label: 'Paste link', icon: Link2 },
                    ].map((t) => {
                        const Icon = t.icon;
                        return (
                            <button
                                key={t.id}
                                type="button"
                                role="tab"
                                aria-selected={tab === t.id}
                                className={`image-editor__tab ${tab === t.id ? 'image-editor__tab--active' : ''}`}
                                onClick={() => {
                                    setTab(t.id);
                                    setError('');
                                }}
                            >
                                <Icon size={13} aria-hidden="true" />
                                {t.label}
                            </button>
                        );
                    })}
                </div>

                <div className="image-editor__body">
                    {tab === 'url' && (
                        <div className="image-editor__pane">
                            <label className="edit-field__label" htmlFor="image-url-input">
                                Image URL
                            </label>
                            <input
                                id="image-url-input"
                                type="text"
                                className="edit-input"
                                value={url}
                                onChange={(e) => {
                                    setUrl(e.target.value);
                                    setError('');
                                }}
                                placeholder="https://res.cloudinary.com/…"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleUrlSave();
                                }}
                            />
                            <p className="edit-field__hint">
                                Images uploaded here get their own secure link. For an existing image, paste a
                                link from Cloudinary or another image host.
                            </p>
                            <div className="image-editor__actions">
                                <button type="button" className="edit-btn edit-btn--ghost" onClick={onClose}>
                                    Cancel
                                </button>
                                <button type="button" className="edit-btn edit-btn--primary" onClick={handleUrlSave}>
                                    Use this link
                                </button>
                            </div>
                        </div>
                    )}

                    {(tab === 'upload' || tab === 'camera') && (
                        <div className="image-editor__pane">
                            <label
                                className={`image-editor__dropzone ${uploading ? 'image-editor__dropzone--busy' : ''}`}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="image-editor__file"
                                    disabled={uploading}
                                    onChange={(e) => handleFileUpload(e.target.files?.[0])}
                                />
                                {uploading ? (
                                    <>
                                        <span className="edit-spinner image-editor__spinner" aria-hidden="true" />
                                        <span className="image-editor__drop-title">Uploading…</span>
                                        <span className="image-editor__drop-hint">This usually takes a few seconds.</span>
                                    </>
                                ) : tab === 'camera' ? (
                                    <>
                                        <Camera size={22} aria-hidden="true" />
                                        <span className="image-editor__drop-title">Take a photo</span>
                                        <span className="image-editor__drop-hint">Uses your device's camera.</span>
                                    </>
                                ) : (
                                    <>
                                        <Upload size={22} aria-hidden="true" />
                                        <span className="image-editor__drop-title">Choose a photo</span>
                                        <span className="image-editor__drop-hint">
                                            JPG, PNG, or WebP. Large photos are resized automatically.
                                        </span>
                                    </>
                                )}
                            </label>
                            {tab === 'upload' && (
                                <button
                                    type="button"
                                    className="image-editor__camera-alt"
                                    onClick={() => setTab('camera')}
                                >
                                    <Camera size={13} aria-hidden="true" />
                                    Use the camera instead
                                </button>
                            )}
                        </div>
                    )}

                    {error && (
                        <div className="edit-notice edit-notice--error" role="alert">
                            {error}
                        </div>
                    )}

                    {value && (
                        <div className="image-editor__footer">
                            <button
                                type="button"
                                className="edit-btn edit-btn--danger"
                                onClick={() => {
                                    onChange('');
                                    onClose();
                                }}
                            >
                                <Trash2 size={13} />
                                Remove this image
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </dialog>
    );
}