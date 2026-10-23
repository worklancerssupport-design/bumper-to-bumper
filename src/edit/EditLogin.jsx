import { useState } from 'react';
import { Lock, AlertCircle } from 'lucide-react';
import { useAuth } from './hooks/useAuth.jsx';
import './EditLogin.css';

export default function EditLogin() {
    const { login, error } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        await login(username, password);
        setSubmitting(false);
    }

    return (
        <div className="edit-login">
            <form className="edit-login__card" onSubmit={handleSubmit}>
                <div className="edit-login__icon">
                    <Lock size={20} />
                </div>
                <h1 className="edit-login__title">Edit Console</h1>
                <p className="edit-login__subtitle">Sign in to manage site data</p>

                {error && (
                    <div className="edit-login__error">
                        <AlertCircle size={14} />
                        {error}
                    </div>
                )}

                <div className="edit-login__field">
                    <label className="edit-login__label">Username</label>
                    <input
                        type="text"
                        className="edit-login__input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoFocus
                    />
                </div>

                <div className="edit-login__field">
                    <label className="edit-login__label">Password</label>
                    <input
                        type="password"
                        className="edit-login__input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="edit-login__submit" disabled={submitting}>
                    {submitting ? 'Signing in...' : 'Sign in'}
                </button>
            </form>
        </div>
    );
}
