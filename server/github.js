import { isValidSession, requireEnv } from './session.js';

// Only the site's JSON data can be edited through the console
const ALLOWED_PATH = /^src\/data\/(?:[\w-]+\/)?[\w-]+\.json$/;
const MAX_CONTENT_BYTES = 1024 * 1024;

function apiUrl(filePath) {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';
  return `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}&t=${Date.now()}`;
}

function githubHeaders() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  };
}

// GitHub auth failures must not look like session failures to the client
function mapGitHubError(status) {
  if (status === 404) return { status: 404, body: { error: 'File not found' } };
  if (status === 409) return { status: 409, body: { error: 'File changed on GitHub. Reload and try again.' } };
  if (status === 422) return { status: 422, body: { error: 'GitHub rejected the change' } };
  return { status: 502, body: { error: 'GitHub request failed' } };
}

function validPath(filePath) {
  return typeof filePath === 'string' && ALLOWED_PATH.test(filePath);
}

export async function githubFile({ method, headers, query, body }) {
  if (!isValidSession(headers)) {
    return { status: 401, body: { error: 'Session expired. Please sign in again.' } };
  }

  requireEnv('GITHUB_TOKEN', 'GITHUB_OWNER', 'GITHUB_REPO');

  if (method === 'GET') {
    const filePath = query?.path;
    if (!validPath(filePath)) {
      return { status: 400, body: { error: 'Invalid or missing path' } };
    }

    const r = await fetch(apiUrl(filePath), { headers: githubHeaders() });
    if (!r.ok) return mapGitHubError(r.status);

    const data = await r.json();
    return {
      status: 200,
      body: {
        content: Buffer.from(data.content, 'base64').toString('utf-8'),
        sha: data.sha,
      },
    };
  }

  if (method === 'PUT') {
    const { path: filePath, content, sha, message } = body || {};
    if (!validPath(filePath) || typeof content !== 'string' || !sha || !message) {
      return { status: 400, body: { error: 'Missing or invalid fields: path, content, sha, message' } };
    }
    if (Buffer.byteLength(content, 'utf-8') > MAX_CONTENT_BYTES) {
      return { status: 413, body: { error: 'Content is too large' } };
    }
    try {
      JSON.parse(content);
    } catch {
      return { status: 400, body: { error: 'Content is not valid JSON' } };
    }

    const r = await fetch(apiUrl(filePath), {
      method: 'PUT',
      headers: githubHeaders(),
      body: JSON.stringify({
        message,
        content: Buffer.from(content, 'utf-8').toString('base64'),
        sha,
        branch: process.env.GITHUB_BRANCH || 'main',
      }),
    });
    if (!r.ok) return mapGitHubError(r.status);

    const data = await r.json();
    return { status: 200, body: { newSha: data.content.sha } };
  }

  return { status: 405, body: { error: 'Method not allowed' } };
}
