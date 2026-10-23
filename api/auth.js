const EDIT_USERNAME = process.env.EDIT_USERNAME;
const EDIT_PASSWORD = process.env.EDIT_PASSWORD;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!EDIT_USERNAME || !EDIT_PASSWORD) {
    return res.status(500).json({ error: 'Edit credentials not configured' });
  }

  const { username, password } = req.body || {};

  if (username === EDIT_USERNAME && password === EDIT_PASSWORD) {
    return res.status(200).json({ success: true });
  }

  return res.status(401).json({ success: false, error: 'Invalid username or password' });
}
