import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

export const SESSION_TTL_MS = 8 * 60 * 60 * 1000;

export class ConfigError extends Error {}

export function requireEnv(...names) {
  const missing = names.filter((name) => !process.env[name]);
  if (missing.length) {
    throw new ConfigError(`Missing environment variables: ${missing.join(', ')}`);
  }
}

export function safeEqual(a, b) {
  const hashA = createHash('sha256').update(String(a)).digest();
  const hashB = createHash('sha256').update(String(b)).digest();
  return timingSafeEqual(hashA, hashB);
}

function sign(value) {
  return createHmac('sha256', process.env.SESSION_SECRET).update(value).digest('hex');
}

export function createSession() {
  requireEnv('SESSION_SECRET');
  const expiresAt = Date.now() + SESSION_TTL_MS;
  return { token: `${expiresAt}.${sign(String(expiresAt))}`, expiresAt };
}

export function isValidSession(headers) {
  requireEnv('SESSION_SECRET');
  const auth = headers?.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  const [expiresAt, signature] = token.split('.');
  if (!expiresAt || !signature || !/^\d+$/.test(expiresAt)) return false;
  if (Number(expiresAt) < Date.now()) return false;
  return safeEqual(signature, sign(expiresAt));
}
