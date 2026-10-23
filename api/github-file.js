const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

const HEADERS = {
  Authorization: `Bearer ${GITHUB_TOKEN}`,
  Accept: 'application/vnd.github.v3+json',
  'Content-Type': 'application/json',
};

function apiUrl(filePath) {
  return `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}?ref=${GITHUB_BRANCH}&t=${Date.now()}`;
}

export default async function handler(req, res) {
  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    return res.status(500).json({ error: 'GitHub environment variables not configured' });
  }

  try {
    if (req.method === 'GET') {
      const filePath = req.query.path;
      if (!filePath) {
        return res.status(400).json({ error: 'Missing path parameter' });
      }

      const r = await fetch(apiUrl(filePath), { headers: HEADERS });
      if (!r.ok) {
        return res.status(r.status).json({ error: r.statusText });
      }

      const data = await r.json();
      return res.status(200).json({
        content: Buffer.from(data.content, 'base64').toString('utf-8'),
        sha: data.sha,
      });
    }

    if (req.method === 'PUT') {
      const { path, content, sha, message } = req.body;
      if (!path || !content || !sha || !message) {
        return res.status(400).json({ error: 'Missing required fields: path, content, sha, message' });
      }

      const r = await fetch(apiUrl(path), {
        method: 'PUT',
        headers: HEADERS,
        body: JSON.stringify({
          message,
          content: Buffer.from(content, 'utf-8').toString('base64'),
          sha,
          branch: GITHUB_BRANCH,
        }),
      });

      if (!r.ok) {
        const errBody = await r.json().catch(() => ({}));
        return res.status(r.status).json({ error: errBody.message || r.statusText });
      }

      const data = await r.json();
      return res.status(200).json({ newSha: data.content.sha });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
