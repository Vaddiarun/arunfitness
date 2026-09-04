import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

function loadEnvFallback() {
  if (!process.env.RAZORPAY_KEY_SECRET) {
    try {
      if (typeof process.loadEnvFile === 'function') {
        process.loadEnvFile();
      }
    } catch {
      // ignore
    }
    if (!process.env.RAZORPAY_KEY_SECRET) {
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

  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_secret) {
    return sendJson(res, 500, {
      error: 'Razorpay key secret not configured on server.',
    });
  }

  let body;
  try {
    body = await parseJsonBody(req);
  } catch {
    return sendJson(res, 400, { error: 'Invalid JSON payload.' });
  }

  const order_id = body?.razorpay_order_id || body?.order_id;
  const payment_id = body?.razorpay_payment_id || body?.payment_id;
  const signature = body?.razorpay_signature || body?.signature;

  if (!order_id || !payment_id || !signature) {
    return sendJson(res, 400, {
      success: false,
      error: 'Missing required parameters: order_id, payment_id, and signature are required.',
    });
  }

  try {
    const expectedSignature = crypto
      .createHmac('sha256', key_secret)
      .update(`${order_id}|${payment_id}`)
      .digest('hex');

    const expectedBuffer = Buffer.from(expectedSignature, 'utf8');
    const signatureBuffer = Buffer.from(signature, 'utf8');

    const isMatch =
      expectedBuffer.length === signatureBuffer.length &&
      crypto.timingSafeEqual(expectedBuffer, signatureBuffer);

    if (!isMatch) {
      return sendJson(res, 400, {
        success: false,
        error: 'Invalid payment signature. Verification failed.',
      });
    }

    return sendJson(res, 200, {
      success: true,
      message: 'Payment signature verified successfully.',
      order_id,
      payment_id,
    });
  } catch (error) {
    console.error('Razorpay verify-payment error:', error);
    return sendJson(res, 500, {
      success: false,
      error: 'Internal error during signature verification.',
    });
  }
}
