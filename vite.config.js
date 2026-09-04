import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import createOrderHandler from './api/create-order.js';
import verifyPaymentHandler from './api/verify-payment.js';

function razorpayApiDevPlugin() {
  return {
    name: 'razorpay-api-dev-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : '';
        if (url === '/api/create-order') {
          return createOrderHandler(req, res);
        }
        if (url === '/api/verify-payment') {
          return verifyPaymentHandler(req, res);
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), razorpayApiDevPlugin()],
  base: '/',
});
