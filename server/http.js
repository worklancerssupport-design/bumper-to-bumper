import { ConfigError } from './session.js';

/**
 * Wraps a route handler so it always returns { status, body }.
 * Config problems are logged server-side and returned generically.
 */
export function handle(fn) {
  return async (ctx) => {
    try {
      return await fn(ctx);
    } catch (err) {
      if (err instanceof ConfigError) {
        console.error(err.message);
        return { status: 500, body: { error: 'Server is not configured' } };
      }
      console.error(err);
      return { status: 500, body: { error: 'Internal server error' } };
    }
  };
}

/** Adapter for Vercel's (req, res) serverless signature. */
export function toVercel(fn) {
  const run = handle(fn);
  return async (req, res) => {
    const result = await run({
      method: req.method,
      headers: req.headers,
      query: req.query,
      body: req.body,
    });
    res.status(result.status).json(result.body);
  };
}
