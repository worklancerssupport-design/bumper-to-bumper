import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import businessData from './src/data/business.json'
import { handle } from './server/http.js'
import { login } from './server/auth.js'
import { githubFile } from './server/github.js'
import { cloudinarySign } from './server/cloudinary.js'

const API_ROUTES = {
  '/api/auth': login,
  '/api/github-file': githubFile,
  '/api/cloudinary-sign': cloudinarySign,
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  // Server handlers read process.env, same as on Vercel
  for (const [key, value] of Object.entries(env)) {
    if (process.env[key] === undefined) process.env[key] = value
  }

  function readJson(req) {
    return new Promise((resolve) => {
      let body = ''
      req.on('data', (chunk) => (body += chunk))
      req.on('end', () => {
        try { resolve(body ? JSON.parse(body) : undefined) }
        catch { resolve(undefined) }
      })
    })
  }

  function apiPlugin() {
    return {
      name: 'api-dev-server',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          const url = new URL(req.url, 'http://localhost')
          if (!url.pathname.startsWith('/api/')) return next()

          const route = API_ROUTES[url.pathname]
          if (!route) {
            res.statusCode = 404
            res.setHeader('Content-Type', 'application/json')
            return res.end(JSON.stringify({ error: 'Not found' }))
          }

          const body = req.method === 'GET' ? undefined : await readJson(req)
          const result = await handle(route)({
            method: req.method,
            headers: req.headers,
            query: Object.fromEntries(url.searchParams),
            body,
          })

          res.statusCode = result.status
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(result.body))
        })
      },
    }
  }

  function htmlBusinessPlugin() {
    const values = {
      __SITE_NAME__: businessData.siteName,
      __SITE_TITLE__: `${businessData.name} ${businessData.city} | ${businessData.location.split(',')[0]} | Premium Automotive Studio`,
      __SITE_DESCRIPTION__: `${businessData.name} in ${businessData.location} — ${businessData.stats.yearsExperience}+ years experience, ${businessData.stats.clientsServed}+ vehicles enhanced. Premium automotive accessories, interior & exterior customization, LED lighting, touchscreen infotainment, 360° cameras, and zero wire-cutting installation.`,
    }

    return {
      name: 'business-html',
      transformIndexHtml(html) {
        return Object.entries(values).reduce(
          (out, [token, value]) => out.split(token).join(value),
          html,
        )
      },
    }
  }

  return {
    plugins: [react(), apiPlugin(), htmlBusinessPlugin()],
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
