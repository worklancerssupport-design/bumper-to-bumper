import { useState, useRef } from 'react';
import { Lock, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import { useAuth } from './hooks/useAuth.jsx';
import './EditLogin.css';

export default function EditLogin() {
    const { login, error, sessionExpired } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const passwordRef = useRef(null);

    // Focus advances to the password field only when the user has
    // *finished* the username — via Tab or Enter. Moving focus in
    // response to the username's onChange steals focus mid-keystroke,
    // which silently sends the rest of the username into the password
    // field and leaves the username holding a single character.
    function handleUsernameKeyDown(e) {
        if (e.key !== 'Tab' && e.key !== 'Enter') return;
        if (!username) return;
        e.preventDefault();
        passwordRef.current?.focus();
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        const ok = await login(username, password);
        if (ok) {
            setPassword('');
        } else {
            setPassword('');
            passwordRef.current?.focus();
        }
        setSubmitting(false);
    }

    return (
        <div className="edit-login">
            <form className="edit-login__card" onSubmit={handleSubmit}>
                {sessionExpired && (
                    <div className="edit-login__notice">
                        <AlertCircle size={15} aria-hidden="true" />
                        <span>Your session ended. Sign in again — your unsaved changes are still here.</span>
                    </div>
                )}

                <div className="edit-login__mark" aria-hidden="true">
                    <Lock size={18} />
                </div>

                <h1 className="edit-login__title">Edit Console</h1>
                <p className="edit-login__subtitle">
                    Sign in to manage the content on this site.
                </p>

                {error && !sessionExpired && (
                    <div className="edit-notice edit-notice--error" role="alert">
                        <AlertCircle size={16} aria-hidden="true" />
                        <span>{error}</span>
                    </div>
                )}

                <div className="edit-login__field">
                    <label className="edit-field__label" htmlFor="edit-username">
                        Username
                    </label>
                    <input
                        id="edit-username"
                        type="text"
                        className="edit-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={handleUsernameKeyDown}
                        autoComplete="username"
                        autoFocus
                        required
                    />
                </div>

                <div className="edit-login__field">
                    <label className="edit-field__label" htmlFor="edit-password">
                        Password
                    </label>
                    <input
                        id="edit-password"
                        ref={passwordRef}
                        type="password"
                        className="edit-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                    />
                </div>

                <button type="submit" className="edit-btn edit-btn--primary edit-login__submit" disabled={submitting}>
                    {submitting && <Loader2 size={15} className="edit-spinner" aria-hidden="true" />}
                    {submitting ? 'Signing in' : 'Sign in'}
                </button>

                <a className="edit-login__back" href="/">
                    <ArrowLeft size={13} aria-hidden="true" />
                    Back to site
                </a>
            </form>
        </div>
    );
}