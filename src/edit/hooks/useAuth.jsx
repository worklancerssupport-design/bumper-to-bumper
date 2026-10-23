import { createContext, useContext, useState, useCallback, useEffect } from "react";
import {
    apiFetch,
    clearSession,
    readSession,
    writeSession,
    SESSION_EXPIRED_EVENT,
} from "../lib/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(() => readSession() !== null);
    const [sessionExpired, setSessionExpired] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const onExpired = () => {
            setSessionExpired(true);
            setError("Your session expired. Sign in again to continue.");
        };
        window.addEventListener(SESSION_EXPIRED_EVENT, onExpired);
        return () => window.removeEventListener(SESSION_EXPIRED_EVENT, onExpired);
    }, []);

    const login = useCallback(async (username, password) => {
        try {
            const data = await apiFetch("/api/auth", {
                method: "POST",
                body: { username, password },
            });
            writeSession({ token: data.token, expiresAt: data.expiresAt });
            setIsAuthenticated(true);
            setSessionExpired(false);
            setError(null);
            return true;
        } catch (err) {
            setError(err.status ? err.message : "Connection failed");
            return false;
        }
    }, []);

    const logout = useCallback(() => {
        clearSession();
        setIsAuthenticated(false);
        setSessionExpired(false);
        setError(null);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, sessionExpired, login, logout, error, setError }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
