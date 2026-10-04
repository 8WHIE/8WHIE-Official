import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'iaryan9905@gmail.com';

// Middleware
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true }));

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
app.post('/api/contact', rateLimiter, (req: Request, res: Response) => {
  try {
    const { name, email, phone, subject, message, honeypot } = req.body;

    // Spam honeypot detection
    if (honeypot) {
      // Silently discard spam bot submissions with normal success response
      return res.status(200).json({
        success: true,
        message: "MESSAGE RECEIVED.\n\nWe'll get back to you.",
      });
    }

    // Sanitize
    const cleanName = sanitizeString(name, 100);
    const cleanEmail = sanitizeString(email, 120).toLowerCase();
    const cleanPhone = sanitizeString(phone, 30);
    const cleanSubject = sanitizeString(subject, 150);
    const cleanMessage = sanitizeString(message, 3000);

    // Validation
    const errors: Record<string, string> = {};

    if (!cleanName || cleanName.length < 2) {
      errors.name = 'Please provide your full name (minimum 2 characters).';
    }

    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      errors.email = 'Please provide a valid email address.';
    }

    if (!cleanSubject || cleanSubject.length < 3) {
      errors.subject = 'Please specify a subject for your message.';
    }

    if (!cleanMessage || cleanMessage.length < 10) {
      errors.message = 'Please enter a message with at least 10 characters.';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed. Please verify your information.',
        errors,
      });
    }

    // In a real production deployment with SMTP credentials, dispatch email here.
    // Structured laboratory logging:
    const submissionId = `MSG-${Date.now().toString(36).toUpperCase()}`;
    console.log(`[8WHIE SECURE DISPATCH] ${submissionId} to ${CONTACT_EMAIL}`);
    console.log(`From: ${cleanName} <${cleanEmail}>`);
    if (cleanPhone) console.log(`Phone: ${cleanPhone}`);
    console.log(`Subject: ${cleanSubject}`);
    console.log(`Message:\n${cleanMessage}`);

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
