import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { validateContactSubmission, dispatchContactMessage } from './lib/contact.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'iaryan9905@gmail.com';

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Simple in-memory rate limiter for contact form
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

const rateLimiter = (req: Request, res: Response, next: () => void) => {
  const ip = req.headers['x-forwarded-for']?.toString().split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const clientRecord = rateLimitMap.get(ip);

  if (!clientRecord || now > clientRecord.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return next();
  }

  if (clientRecord.count >= MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      success: false,
      error: 'Too many messages submitted from this connection. Please wait a few minutes before trying again.',
    });
  }

  clientRecord.count += 1;
  next();
};

// Input sanitizer
const sanitizeString = (str: unknown, maxLen = 2000): string => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>]/g, '') // strip potential HTML brackets
    .trim()
    .slice(0, maxLen);
};

// Email validator
const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// API: Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'operational',
    service: '8WHIE Laboratory',
    tagline: 'EXPLORE. BREAK. SECURE.',
    founder: 'Aryan Thakur',
    location: 'Patna, India',
    timestamp: new Date().toISOString(),
  });
});

// API: Contact Submission
app.post('/api/contact', rateLimiter, async (req: Request, res: Response) => {
  try {
    const { isValid, errors, sanitized } = validateContactSubmission(req.body);

    // Spam honeypot detection
    if (sanitized.honeypot) {
      return res.status(200).json({
        success: true,
        message: "MESSAGE RECEIVED.\n\nWe'll get back to you.",
      });
    }

    if (!isValid) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed. Please verify your information.',
        errors,
      });
    }

    const { submissionId } = await dispatchContactMessage(sanitized);

    return res.status(200).json({
      success: true,
      message: "MESSAGE RECEIVED.\n\nWe'll get back to you.",
      submissionId,
    });
  } catch (err) {
    console.error('[8WHIE Contact Error]:', err);
    return res.status(500).json({
      success: false,
      error: 'An internal error occurred while transmitting your message. Please reach out directly to iaryan9905@gmail.com.',
    });
  }
});

// API: Upload / Replace Founder Photo directly
app.post('/api/upload-founder-photo', async (req: Request, res: Response) => {
  try {
    const { imageBase64 } = req.body;
    if (!imageBase64 || typeof imageBase64 !== 'string') {
      return res.status(400).json({ success: false, error: 'No image data provided.' });
    }

    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(cleanBase64, 'base64');

    const fs = await import('fs');
    const publicPath = path.resolve(__dirname, 'public/images/aryan-profile.jpg');
    const dir = path.dirname(publicPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(publicPath, buffer);

    const distImgPath = path.resolve(__dirname, 'dist/images/aryan-profile.jpg');
    if (fs.existsSync(path.dirname(distImgPath))) {
      fs.writeFileSync(distImgPath, buffer);
    }

    console.log(`[8WHIE] Official founder photo saved to ${publicPath} (${buffer.length} bytes)`);
    return res.json({ success: true, message: 'Founder photo updated successfully.' });
  } catch (err) {
    console.error('[8WHIE Upload Error]:', err);
    return res.status(500).json({ success: false, error: 'Failed to process image.' });
  }
});

// Vite Middleware integration
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`[8WHIE Server] Running on http://localhost:${PORT} (${isProduction ? 'production' : 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start 8WHIE server:', err);
  process.exit(1);
});
