/**
 * GitHub API client — proxied through serverless functions.
 * Never calls GitHub directly from the browser (PAT stays server-side).
 */

/**
 * Fetch a single file from GitHub via the serverless proxy.
 * @param {string} filePath - Repo-relative path, e.g. "src/data/business.json"
 * @returns {Promise<{ content: string, sha: string }>}
 */
export async function fetchFileFromGitHub(filePath) {
    const res = await fetch(`/api/github-file?path=${encodeURIComponent(filePath)}`);
    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Failed to fetch ${filePath}`);
    }
    return res.json();
}

/**
 * Save a file to GitHub via the serverless proxy.
 * @param {string} filePath - Repo-relative path
 * @param {string} content - Full file content as string
 * @param {string} sha - Current file SHA (optimistic concurrency)
 * @param {string} message - Commit message
 * @returns {Promise<{ newSha: string }>}
 */
export async function saveFileToGitHub(filePath, content, sha, message) {
    const res = await fetch("/api/github-file", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: filePath, content, sha, message }),
    });
    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Failed to save ${filePath}`);
    }
    return res.json();
}
