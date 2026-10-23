/**
 * Cloudinary unsigned upload + client-side compression.
 * Uses VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET env vars.
 */

/**
 * Upload a file to Cloudinary using an unsigned upload preset.
 * @param {File} file - The file to upload
 * @param {string} folder - Cloudinary folder name
 * @returns {Promise<{ url: string, publicId: string, width: number, height: number }>}
 */
export async function uploadToCloudinary(file, folder = "uploads") {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
        throw new Error("Cloudinary env vars not configured (VITE_CLOUDINARY_CLOUD_NAME, VITE_CLOUDINARY_UPLOAD_PRESET)");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", folder);

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: formData }
    );

    if (!res.ok) throw new Error("Cloudinary upload failed");

    const data = await res.json();
    return {
        url: data.secure_url,
        publicId: data.public_id,
        width: data.width,
        height: data.height,
    };
}

/**
 * Compress an image client-side using canvas.
 * @param {File} file - Original image file
 * @param {number} maxWidth - Max dimension in pixels
 * @param {number} quality - JPEG quality 0-1
 * @returns {Promise<File>} Compressed file
 */
export function compressImage(file, maxWidth = 800, quality = 0.7) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const ratio = Math.min(maxWidth / img.width, maxWidth / img.height, 1);
            const canvas = document.createElement("canvas");
            canvas.width = img.width * ratio;
            canvas.height = img.height * ratio;
            canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
            canvas.toBlob(
                (blob) => {
                    if (!blob) return reject(new Error("Compression failed"));
                    resolve(new File([blob], file.name, { type: "image/jpeg" }));
                },
                "image/jpeg",
                quality
            );
        };
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = URL.createObjectURL(file);
    });
}

/**
 * Compress then upload.
 * @param {File} file
 * @param {number} maxWidth
 * @param {number} quality
 * @param {string} folder
 */
export async function compressAndUpload(file, maxWidth = 800, quality = 0.7, folder = "uploads") {
    const compressed = await compressImage(file, maxWidth, quality);
    return uploadToCloudinary(compressed, folder);
}

/**
 * Open a file picker for image selection.
 * @returns {Promise<File | null>}
 */
export function selectFromFile() {
    return new Promise((resolve) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = () => resolve(input.files?.[0] || null);
        input.click();
    });
}

/**
 * Open a camera capture input.
 * @returns {Promise<File | null>}
 */
export function captureFromCamera() {
    return new Promise((resolve) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.capture = "environment";
        input.onchange = () => resolve(input.files?.[0] || null);
        input.click();
    });
}

/**
 * Check if a URL looks like a valid image URL.
 * @param {string} url
 * @returns {boolean}
 */
export function isValidImageUrl(url) {
    try {
        const u = new URL(url);
        if (!u.protocol.startsWith("http")) return false;
        const allowedDomains = [
            "res.cloudinary.com",
            "images.unsplash.com",
            "cdn.shopify.com",
            "i.pinimg.com",
            "lh3.googleusercontent.com",
        ];
        return (
            allowedDomains.some((d) => u.hostname.includes(d)) ||
            /\.(jpg|jpeg|png|webp|gif)$/i.test(u.pathname)
        );
    } catch {
        return false;
    }
}
