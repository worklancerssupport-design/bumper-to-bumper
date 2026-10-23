import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const GITHUB_TOKEN = env.GITHUB_TOKEN
  const GITHUB_OWNER = env.GITHUB_OWNER
  const GITHUB_REPO = env.GITHUB_REPO
  const GITHUB_BRANCH = env.GITHUB_BRANCH || 'main'
  const EDIT_USERNAME = env.EDIT_USERNAME
  const EDIT_PASSWORD = env.EDIT_PASSWORD

  const HEADERS = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  }

  function apiUrl(filePath) {
    return `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}?ref=${GITHUB_BRANCH}&t=${Date.now()}`
  }

  function decodeBase64Utf8(b64) {
    const binary = atob(b64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
    return new TextDecoder('utf-8').decode(bytes)
  }

  function encodeBase64Utf8(str) {
    const bytes = new TextEncoder().encode(str)
    let binary = ''
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i])
    return btoa(binary)
  }

  function apiPlugin() {
    return {
      name: 'api-dev-server',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (!req.url?.startsWith('/api/')) return next()

          // Parse body for POST/PUT
          function parseBody() {
            return new Promise((resolve) => {
              if (req.method === 'GET') return resolve(null)
              let body = ''
              req.on('data', (chunk) => (body += chunk))
              req.on('end', () => {
                try { resolve(JSON.parse(body)) }
                catch { resolve(null) }
              })
            })
          }

          res.setHeader('Content-Type', 'application/json')

          try {
            // GET /api/github-file?path=...
            if (req.url.startsWith('/api/github-file') && req.method === 'GET') {
              const url = new URL(req.url, 'http://localhost')
              const filePath = url.searchParams.get('path')
              if (!filePath) {
                res.statusCode = 400
                return res.end(JSON.stringify({ error: 'Missing path' }))
              }

              const r = await fetch(apiUrl(filePath), { headers: HEADERS })
              if (!r.ok) {
                res.statusCode = r.status
                return res.end(JSON.stringify({ error: r.statusText }))
              }
              const data = await r.json()
              res.statusCode = 200
              return res.end(JSON.stringify({
                content: decodeBase64Utf8(data.content),
                sha: data.sha,
              }))
            }

            // PUT /api/github-file
            if (req.url.startsWith('/api/github-file') && req.method === 'PUT') {
              const body = await parseBody()
              const { path, content, sha, message } = body || {}
              if (!path || !content || !sha || !message) {
                res.statusCode = 400
                return res.end(JSON.stringify({ error: 'Missing required fields' }))
              }

              const r = await fetch(apiUrl(path), {
                method: 'PUT',
                headers: HEADERS,
                body: JSON.stringify({
                  message,
                  content: encodeBase64Utf8(content),
                  sha,
                  branch: GITHUB_BRANCH,
                }),
              })

              if (!r.ok) {
                const errBody = await r.json().catch(() => ({}))
                res.statusCode = r.status
                return res.end(JSON.stringify({ error: errBody.message || r.statusText }))
              }

              const data = await r.json()
              res.statusCode = 200
              return res.end(JSON.stringify({ newSha: data.content.sha }))
            }

            // POST /api/auth
            if (req.url === '/api/auth' && req.method === 'POST') {
              const body = await parseBody()
              const { username, password } = body || {}
              if (username === EDIT_USERNAME && password === EDIT_PASSWORD) {
                res.statusCode = 200
                return res.end(JSON.stringify({ success: true }))
              }
              res.statusCode = 401
              return res.end(JSON.stringify({ success: false, error: 'Invalid username or password' }))
            }

            res.statusCode = 404
            res.end(JSON.stringify({ error: 'Not found' }))
          } catch (err) {
            res.statusCode = 500
            res.end(JSON.stringify({ error: err.message || 'Unknown error' }))
          }
        })
      },
    }
  }

  return {
    plugins: [react(), apiPlugin()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'router': ['react-router-dom'],
            'gsap': ['gsap'],
          }
        }
      }
    }
  }
})
