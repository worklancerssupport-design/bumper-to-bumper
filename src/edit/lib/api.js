/**
 * Session-aware fetch for /api routes.
 * The login token lives in sessionStorage: it survives a refresh, and is gone when the tab closes.
 */

const SESSION_KEY = "bumper-edit-session";
export const SESSION_EXPIRED_EVENT = "edit-session-expired";

export function readSession() {
    try {
        const session = JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null");
        if (session?.token && session.expiresAt > Date.now()) return session;
    } catch {
        /* fall through to clear */
    }
    clearSession();
    return null;
}

export function writeSession(session) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
    sessionStorage.removeItem(SESSION_KEY);
}

/**
 * @param {string} url
 * @param {{ method?: string, body?: unknown }} [options]
 * @returns {Promise<any>} Parsed JSON response. Throws an Error with `.status` on failure.
 */
export async function apiFetch(url, { method = "GET", body } = {}) {
    const headers = {};
    const session = readSession();
    if (session) headers.Authorization = `Bearer ${session.token}`;
    if (body !== undefined) headers["Content-Type"] = "application/json";

    const res = await fetch(url, {
        method,
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    const data = await res.json().catch(() => ({}));

    if (res.status === 401 && url !== "/api/auth") {
        clearSession();
        window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
    }
    if (!res.ok) {
        const err = new Error(data.error || `Request failed (${res.status})`);
        err.status = res.status;
        throw err;
    }
    return data;
}
