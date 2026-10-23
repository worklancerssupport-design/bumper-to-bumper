/**
 * GitHub API client — proxied through serverless functions (see server/github.js).
 * Never calls GitHub directly from the browser (PAT stays server-side).
 */
import { apiFetch } from "./api.js";

/**
 * Fetch a single file from GitHub via the serverless proxy.
 * @param {string} filePath - Repo-relative path, e.g. "src/data/business.json"
 * @returns {Promise<{ content: string, sha: string }>}
 */
export function fetchFileFromGitHub(filePath) {
    return apiFetch(`/api/github-file?path=${encodeURIComponent(filePath)}`);
}

/**
 * Save a file to GitHub via the serverless proxy.
 * @param {string} filePath - Repo-relative path
 * @param {string} content - Full file content as string
 * @param {string} sha - Current file SHA (optimistic concurrency)
 * @param {string} message - Commit message
 * @returns {Promise<{ newSha: string }>}
 */
export function saveFileToGitHub(filePath, content, sha, message) {
    return apiFetch("/api/github-file", {
        method: "PUT",
        body: { path: filePath, content, sha, message },
    });
}
