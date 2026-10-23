import { useState, useCallback, useEffect, useRef } from "react";
import { fetchFileFromGitHub, saveFileToGitHub } from "../lib/github.js";

/**
 * Generic hook for reading/editing/saving any JSON data file via GitHub.
 * Works for any file shape — array, object, nested. The caller handles the shape.
 *
 * @param {string} filePath - Repo-relative path, e.g. "src/data/business.json"
 * @param {object} [options]
 * @param {string} [options.commitPrefix] - Prefix for auto-generated commit messages
 * @returns {import("./useDataFile.types").UseDataFileReturn}
 */
export function useDataFile(filePath, options = {}) {
    const { commitPrefix = "Update" } = options;

    const [originalData, setOriginalData] = useState(null);
    const [editData, setEditData] = useState(null);
    const [sha, setSha] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    // Use a ref to track the latest editData for save (avoids stale closure)
    const editDataRef = useRef(editData);
    editDataRef.current = editData;

    const fileName = filePath.split("/").pop();

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const { content, sha: newSha } = await fetchFileFromGitHub(filePath);
            const parsed = JSON.parse(content);
            setOriginalData(parsed);
            setEditData(structuredClone(parsed));
            setSha(newSha);
        } catch (err) {
            setError(err.message || "Failed to load");
        } finally {
            setLoading(false);
        }
    }, [filePath]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const hasChanges =
        originalData !== null && editData !== null
            ? JSON.stringify(originalData) !== JSON.stringify(editData)
            : false;

    const save = useCallback(
        async (customMessage) => {
            if (!editDataRef.current) return;
            setSaving(true);
            setError(null);
            try {
                const message = customMessage || `${commitPrefix} ${fileName} via edit panel`;
                const content = JSON.stringify(editDataRef.current, null, 4);
                const { newSha } = await saveFileToGitHub(filePath, content, sha, message);
                setOriginalData(structuredClone(editDataRef.current));
                setSha(newSha);
            } catch (err) {
                setError(err.message || "Failed to save");
                throw err; // Re-throw so callers can handle
            } finally {
                setSaving(false);
            }
        },
        [filePath, sha, commitPrefix, fileName]
    );

    const discard = useCallback(() => {
        setEditData(structuredClone(originalData));
        setError(null);
    }, [originalData]);

    const updateEditData = useCallback((updater) => {
        setEditData((prev) => {
            if (!prev) return prev;
            const draft = structuredClone(prev);
            updater(draft);
            return draft;
        });
    }, []);

    return {
        originalData,
        editData,
        sha,
        loading,
        saving,
        error,
        hasChanges,
        refresh: fetchData,
        save,
        discard,
        updateEditData,
        setError,
    };
}
