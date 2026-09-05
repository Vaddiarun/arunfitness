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

  const { amount, currency = 'INR', receipt, notes } = body || {};

  const parsedAmount = Number(amount);
  if (!parsedAmount || isNaN(parsedAmount) || parsedAmount < 100) {
    return sendJson(res, 400, {
      error: 'Invalid amount. Minimum amount is 100 paise (₹1).',
    });
  }

  try {
    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    const orderOptions = {
      amount: Math.round(parsedAmount),
      currency: currency || 'INR',
      receipt: receipt || `rcpt_${Date.now()}`,
      notes: notes || {},
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
