import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState(null);

    const login = useCallback(async (username, password) => {
        try {
            const res = await fetch("/api/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();
            if (data.success) {
                setIsAuthenticated(true);
                setError(null);
                return true;
            }
            setError(data.error || "Invalid username or password");
            return false;
        } catch {
            setError("Connection failed");
            return false;
        }
    }, []);

    const logout = useCallback(() => {
        setIsAuthenticated(false);
        setError(null);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, error, setError }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
