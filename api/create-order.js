import Razorpay from 'razorpay';
import fs from 'fs';
import path from 'path';

function loadEnvFallback() {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    try {
      if (typeof process.loadEnvFile === 'function') {
        process.loadEnvFile();
      }
    } catch {
      // ignore
    }
    if (!process.env.RAZORPAY_KEY_ID) {
      try {
        const envPath = path.resolve(process.cwd(), '.env');
        if (fs.existsSync(envPath)) {
          const content = fs.readFileSync(envPath, 'utf8');
          for (const line of content.split('\n')) {
            const match = line.trim().match(/^([^=]+)=(.*)$/);
            if (match) {
              const key = match[1].trim();
              const val = match[2].trim().replace(/^['"]|['"]$/g, '');
              if (!process.env[key]) {
                process.env[key] = val;
              }
            }
          }
        }
      } catch {
        // ignore
      }
    }
  }
}

function sendJson(res, statusCode, data) {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(statusCode).json(data);
  }
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

async function parseJsonBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

export default async function handler(req, res) {
  loadEnvFallback();

  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method Not Allowed. Use POST.' });
  }

  const key_id = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    return sendJson(res, 401, {
      error: 'Razorpay credentials not configured on server. Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your Vercel Environment Variables and redeploy.',
    });
  }

  let body;
  try {
    body = await parseJsonBody(req);
  } catch {
    return sendJson(res, 400, { error: 'Invalid JSON payload.' });
  }

  const { currency = 'INR', receipt, notes, type } = body || {};

  // Fixed server-side, keyed by product type — the client can say WHICH thing
  // it's paying for, never HOW MUCH. Keep these numbers in sync with the
  // display prices in src/lib/config.js (CONSULTATION_FEE) and src/data.js
  // (programs[].price).
  const PRICES_PAISE = {
    consultation: 49900, // ₹499 — talk to Arun first
    plan_45day: 600000, // ₹6,000 — 45 Day Transformation, full enrollment
    plan_wedding: 699900, // ₹6,999 — Wedding Transformation, full enrollment
  };

  const amount = PRICES_PAISE[type];
  if (!amount) {
    return sendJson(res, 400, {
      error: `Invalid or missing "type". Must be one of: ${Object.keys(PRICES_PAISE).join(', ')}.`,
    });
  }

  try {
    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    const orderOptions = {
      amount,
      currency: currency || 'INR',
      receipt: receipt || `rcpt_${Date.now()}`,
      notes: { ...(notes || {}), type },
    };

    const order = await razorpay.orders.create(orderOptions);

    return sendJson(res, 200, {
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error('Razorpay create-order error:', error);
    const statusCode = error?.statusCode || error?.status || 500;
    const isAuthError =
      statusCode === 401 ||
      (error?.error?.code === 'BAD_REQUEST_ERROR' &&
        error?.error?.description?.toLowerCase().includes('auth'));
    return sendJson(res, isAuthError ? 401 : 500, {
      error: error?.error?.description || error?.message || 'Failed to create Razorpay order',
    });
  }
}
