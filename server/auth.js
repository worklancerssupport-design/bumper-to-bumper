import { createSession, requireEnv, safeEqual } from './session.js';

const FAILED_LOGIN_DELAY_MS = 400;

export async function login({ method, body }) {
  if (method !== 'POST') {
    return { status: 405, body: { error: 'Method not allowed' } };
  }

  requireEnv('EDIT_USERNAME', 'EDIT_PASSWORD');

  const username = String(body?.username ?? '');
  const password = String(body?.password ?? '');

  // Evaluate both checks so timing doesn't reveal which field was wrong
  const userOk = safeEqual(username, process.env.EDIT_USERNAME);
  const passOk = safeEqual(password, process.env.EDIT_PASSWORD);

  if (!(userOk && passOk)) {
    await new Promise((resolve) => setTimeout(resolve, FAILED_LOGIN_DELAY_MS));
    return { status: 401, body: { success: false, error: 'Invalid username or password' } };
  }

  return { status: 200, body: { success: true, ...createSession() } };
}
