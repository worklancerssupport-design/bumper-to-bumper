import { RefreshCw, RotateCcw, Save, AlertCircle } from 'lucide-react';
import './ActionBar.css';

export default function ActionBar({ loading, saving, error, hasChanges, onRefresh, onDiscard, onSave }) {
    if (loading) {
        return (
            <div className="edit-action-bar edit-action-bar--loading">
                <span className="edit-action-bar__status">Loading...</span>
            </div>
        );
    }

    return (
        <div className="edit-action-bar">
            <div className="edit-action-bar__left">
                {hasChanges ? (
                    <span className="edit-action-bar__badge edit-action-bar__badge--unsaved">
                        Unsaved changes
                    </span>
                ) : (
                    <span className="edit-action-bar__badge edit-action-bar__badge--saved">
                        All changes saved
                    </span>
                )}
                {error && (
                    <span className="edit-action-bar__error">
                        <AlertCircle size={14} />
                        {error}
                    </span>
                )}
            </div>
            <div className="edit-action-bar__right">
                <button type="button" className="edit-action-bar__btn" onClick={onRefresh} disabled={saving}>
                    <RefreshCw size={14} />
                    Refresh
                </button>
                <button
                    type="button"
                    className="edit-action-bar__btn"
                    onClick={onDiscard}
                    disabled={saving || !hasChanges}
                >
                    <RotateCcw size={14} />
                    Discard
                </button>
                <button
                    type="button"
                    className="edit-action-bar__btn edit-action-bar__btn--primary"
                    onClick={onSave}
                    disabled={saving || !hasChanges}
                >
                    <Save size={14} />
                    {saving ? 'Saving...' : 'Save'}
                </button>
            </div>
        </div>
    );
}
