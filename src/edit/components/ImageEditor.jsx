import { useState, useRef, useEffect } from 'react';
import { X, Link2, Upload, Camera, Loader2, ImageOff } from 'lucide-react';
import { compressImage, selectFromFile, captureFromCamera } from '../lib/cloudinary.js';
import './ImageEditor.css';

const ALLOWED_DOMAINS = [
    'res.cloudinary.com',
    'images.unsplash.com',
    'cdn.shopify.com',
    'i.pinimg.com',
    'lh3.googleusercontent.com',
];

function isValidImageUrl(url) {
    if (!url) return false;
    try {
        const u = new URL(url);
        if (!u.protocol.startsWith('http')) return false;
        return (
            ALLOWED_DOMAINS.some((d) => u.hostname.includes(d)) ||
            /\.(jpg|jpeg|png|webp|gif)$/i.test(u.pathname)
        );
    } catch {
        return false;
    }
}

async function uploadToCloudinary(file, folder = 'best-car-accessories') {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    if (!cloudName || !uploadPreset) {
        throw new Error('Cloudinary is not configured. Add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to .env');
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', folder);
    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: 'POST', body: formData }
    );
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.error?.message || 'Upload failed');
    }
    return data.secure_url;
}

export default function ImageEditor({ value, onChange, onClose, alt = 'image' }) {
    const [tab, setTab] = useState('url');
    const [url, setUrl] = useState(value || '');
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [previewError, setPreviewError] = useState(false);
    const fileRef = useRef(null);
    const cameraRef = useRef(null);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    function handleUrlSave() {
        if (!url.trim()) {
            setError('Please enter a URL');
            return;
        }
        if (!isValidImageUrl(url)) {
            setError('URL must be from an allowed CDN or end in .jpg/.png/.webp');
            return;
        }
        onChange(url.trim());
        onClose();
    }

    async function handleFileUpload(file) {
        if (!file) return;
        setError('');
        setUploading(true);
        try {
            const compressed = await compressImage(file, 1200, 0.75);
            const secureUrl = await uploadToCloudinary(compressed);
            onChange(secureUrl);
            onClose();
        } catch (err) {
            setError(err.message || 'Upload failed');
        } finally {
            setUploading(false);
        }
    }

    function openFilePicker() {
        fileRef.current?.click();
    }

    function openCamera() {
        cameraRef.current?.click();
    }

    return (
        <div className="image-editor-overlay" onClick={onClose}>
            <div className="image-editor-modal" onClick={(e) => e.stopPropagation()}>
                <div className="image-editor-header">
                    <h3>Edit {alt}</h3>
                    <button type="button" className="image-editor-close" onClick={onClose} aria-label="Close">
                        <X size={18} />
                    </button>
                </div>

                {value && !previewError && (
                    <div className="image-editor-preview">
                        <img src={value} alt="Current" onError={() => setPreviewError(true)} />
                    </div>
                )}
                {value && previewError && (
                    <div className="image-editor-preview image-editor-preview--error">
                        <ImageOff size={32} />
                        <span>Current image can't be loaded</span>
                    </div>
                )}

                <div className="image-editor-tabs">
                    <button
                        type="button"
                        className={`image-editor-tab ${tab === 'url' ? 'image-editor-tab--active' : ''}`}
                        onClick={() => setTab('url')}
                    >
                        <Link2 size={14} />
                        URL
                    </button>
                    <button
                        type="button"
                        className={`image-editor-tab ${tab === 'upload' ? 'image-editor-tab--active' : ''}`}
                        onClick={() => setTab('upload')}
                    >
                        <Upload size={14} />
                        Upload
                    </button>
                    <button
                        type="button"
                        className={`image-editor-tab ${tab === 'camera' ? 'image-editor-tab--active' : ''}`}
                        onClick={() => setTab('camera')}
                    >
                        <Camera size={14} />
                        Camera
                    </button>
                </div>

                <div className="image-editor-body">
                    {tab === 'url' && (
                        <div className="image-editor-tab-content">
                            <label className="image-editor-label">Image URL</label>
                            <input
                                type="url"
                                className="image-editor-input"
                                value={url}
                                onChange={(e) => { setUrl(e.target.value); setError(''); }}
                                placeholder="https://res.cloudinary.com/... or /images/..."
                                autoFocus
                                onKeyDown={(e) => { if (e.key === 'Enter') handleUrlSave(); }}
                            />
                            <p className="image-editor-hint">
                                Allowed: Cloudinary, Unsplash, Shopify, Pinterest, Google. Or any URL ending in .jpg / .png / .webp.
                            </p>
                            <div className="image-editor-actions">
                                <button type="button" className="image-editor-btn image-editor-btn--ghost" onClick={onClose}>
                                    Cancel
                                </button>
                                <button type="button" className="image-editor-btn image-editor-btn--primary" onClick={handleUrlSave}>
                                    Save URL
                                </button>
                            </div>
                        </div>
                    )}

                    {tab === 'upload' && (
                        <div className="image-editor-tab-content">
                            <button
                                type="button"
                                className="image-editor-dropzone"
                                onClick={openFilePicker}
                                disabled={uploading}
                            >
                                {uploading ? (
                                    <>
                                        <Loader2 size={28} className="spinner" />
                                        <span>Uploading...</span>
                                    </>
                                ) : (
                                    <>
                                        <Upload size={28} />
                                        <span>Click to select a file</span>
                                        <small>JPG, PNG, WebP — auto-compressed to 1200px</small>
                                    </>
                                )}
                            </button>
                            <input
                                ref={fileRef}
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={(e) => handleFileUpload(e.target.files?.[0])}
                            />
                        </div>
                    )}

                    {tab === 'camera' && (
                        <div className="image-editor-tab-content">
                            <button
                                type="button"
                                className="image-editor-dropzone"
                                onClick={openCamera}
                                disabled={uploading}
                            >
                                {uploading ? (
                                    <>
                                        <Loader2 size={28} className="spinner" />
                                        <span>Uploading...</span>
                                    </>
                                ) : (
                                    <>
                                        <Camera size={28} />
                                        <span>Take a photo</span>
                                        <small>Uses your device camera</small>
                                    </>
                                )}
                            </button>
                            <input
                                ref={cameraRef}
                                type="file"
                                accept="image/*"
                                capture="environment"
                                style={{ display: 'none' }}
                                onChange={(e) => handleFileUpload(e.target.files?.[0])}
                            />
                        </div>
                    )}

                    {error && <div className="image-editor-error">{error}</div>}

                    {value && (
                        <div className="image-editor-footer">
                            <button
                                type="button"
                                className="image-editor-btn image-editor-btn--danger"
                                onClick={() => { onChange(''); onClose(); }}
                            >
                                Remove image
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
