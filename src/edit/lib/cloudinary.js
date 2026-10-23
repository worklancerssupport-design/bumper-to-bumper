/**
 * Cloudinary uploads: client-side compression, then a signed upload.
 * The server issues the signature (/api/cloudinary-sign); the API secret never reaches the browser.
 */
import { apiFetch } from "./api.js";

const MAX_DIMENSION = 1200;
const MAX_BYTES = 500 * 1024;
const WEBP_QUALITY = 0.8;

function loadImage(file) {
    return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
            URL.revokeObjectURL(url);
            resolve(img);
        };
        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error("This file is not a supported image"));
        };
        img.src = url;
    });
}

function drawToCanvas(img, width, height, whiteBackground) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (whiteBackground) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
    }
    ctx.drawImage(img, 0, 0, width, height);
    return canvas;
}

function encode(canvas, type, quality) {
    return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

/**
 * Keep the file as-is when it's already within limits. Otherwise scale it down
 * (never up) and re-encode as WebP, which keeps transparency and is smaller than JPEG.
 * Browsers without WebP encoding (older Safari) fall back to JPEG on a white background.
 * @param {File} file
 * @returns {Promise<File>}
 */
export async function prepareImage(file) {
    const img = await loadImage(file);
    const { naturalWidth: width, naturalHeight: height } = img;
    const longestSide = Math.max(width, height);

    if (longestSide <= MAX_DIMENSION && file.size <= MAX_BYTES) return file;

    const scale = Math.min(1, MAX_DIMENSION / longestSide);
    const targetWidth = Math.round(width * scale);
    const targetHeight = Math.round(height * scale);

    let blob = await encode(drawToCanvas(img, targetWidth, targetHeight, false), "image/webp", WEBP_QUALITY);
    let extension = "webp";
    if (!blob || blob.type !== "image/webp") {
        blob = await encode(drawToCanvas(img, targetWidth, targetHeight, true), "image/jpeg", WEBP_QUALITY);
        extension = "jpg";
    }
    if (!blob) throw new Error("Could not process this image");

    // Re-encoding made it bigger and it's already the right size: keep the original
    if (blob.size >= file.size && longestSide <= MAX_DIMENSION) return file;

    const baseName = file.name.replace(/\.[^.]+$/, "") || "upload";
    return new File([blob], `${baseName}.${extension}`, { type: blob.type });
}

/**
 * Prepare, sign, and upload an image to Cloudinary.
 * @param {File} file
 * @returns {Promise<{ url: string, publicId: string, width: number, height: number }>}
 */
export async function uploadImage(file) {
    const prepared = await prepareImage(file);
    const signed = await apiFetch("/api/cloudinary-sign", { method: "POST" });

    const formData = new FormData();
    formData.append("file", prepared);
    formData.append("api_key", signed.apiKey);
    formData.append("timestamp", String(signed.timestamp));
    formData.append("folder", signed.folder);
    formData.append("signature", signed.signature);

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${signed.cloudName}/image/upload`,
        { method: "POST", body: formData }
    );

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error?.message || "Cloudinary upload failed");

    return {
        url: data.secure_url,
        publicId: data.public_id,
        width: data.width,
        height: data.height,
    };
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
