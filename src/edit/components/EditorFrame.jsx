import { SectionHeader, SaveBar } from '../EditShell.jsx';
import { SECTIONS } from '../EditShell.jsx';
import { AlertCircle, Loader2 } from 'lucide-react';
import './editor-frame.css';

/**
 * Standard editor skeleton: section header → sticky save bar → body.
 *
 * Handles the three states every editor shares — loading, fatal load
 * error, and content — so no individual editor has to re-implement them.
 */
export default function EditorFrame({ sectionId, hook, children, notice }) {
    const section = SECTIONS.find((s) => s.id === sectionId);

    if (hook.loading) {
        return (
            <>
                <SectionHeader section={section} />
                <div className="edit-frame__loading" role="status">
                    <Loader2 size={18} className="edit-spinner" />
                    <span>Loading {section.label.toLowerCase()} data…</span>
                </div>
            </>
        );
    }

    // A failed load leaves editData null; editing against it would be a lie.
    if (!hook.editData) {
        return (
            <>
                <SectionHeader section={section} />
                <div className="edit-notice edit-notice--error" role="alert">
                    <AlertCircle size={16} />
                    <div>
                        <strong>Could not load this file.</strong> {hook.error || 'Unknown error.'}{' '}
                        Check that you are signed in and that the file still exists, then reload.
                    </div>
                </div>
                <div className="edit-frame__retry">
                    <button type="button" className="edit-btn" onClick={hook.refresh}>
                        Try again
                    </button>
                </div>
            </>
        );
    }

    return (
        <>
            <SectionHeader section={section} />
            <SaveBar
                loading={hook.loading}
                saving={hook.saving}
                error={hook.error}
                hasChanges={hook.hasChanges}
                onRefresh={hook.refresh}
                onDiscard={hook.discard}
                onSave={() => hook.save()}
            />

            {notice && (
                <div className="edit-frame__notice">
                    <div className="edit-notice">
                        <notice.icon size={16} />
                        <span>{notice.text}</span>
                    </div>
                </div>
            )}

            <div className="edit-frame__body">{children}</div>
        </>
    );
}