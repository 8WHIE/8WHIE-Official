import { sanitizeText, isValidEmail } from './utilities';

export interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  honeypot?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  sanitized: ContactSubmission;
}

/**
 * Validates and sanitizes a contact form submission payload
 */
export function validateContactSubmission(data: Partial<ContactSubmission>): ValidationResult {
  const errors: Record<string, string> = {};

  const name = sanitizeText(data.name, 100);
  const email = sanitizeText(data.email, 120).toLowerCase();
  const phone = sanitizeText(data.phone, 30);
  const subject = sanitizeText(data.subject, 150);
  const message = sanitizeText(data.message, 3000);
  const honeypot = sanitizeText(data.honeypot, 50);

  // Validation rules
  if (!name || name.length < 2) {
    errors.name = 'Please provide your full name (minimum 2 characters).';
  }

  if (!email) {
    errors.email = 'Email address is required.';
  } else if (!isValidEmail(email)) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!subject || subject.length < 3) {
    errors.subject = 'Please enter a subject (minimum 3 characters).';
  }

  if (!message || message.length < 10) {
    errors.message = 'Please enter a message with at least 10 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitized: {
      name,
      email,
      phone,
      subject,
      message,
      honeypot,
    },
  };
}

/**
 * Dispatches contact submission through configured provider or log pipeline
 */
export async function dispatchContactMessage(payload: ContactSubmission): Promise<{ success: boolean; submissionId: string }> {
  const submissionId = `MSG-${Date.now().toString(36).toUpperCase()}`;
  const targetEmail = process.env.CONTACT_EMAIL || 'iaryan9905@gmail.com';

  console.log(`[8WHIE SECURE DISPATCH] ${submissionId} to ${targetEmail}`);
  console.log(`From: ${payload.name} <${payload.email}>`);
  if (payload.phone) console.log(`Phone: ${payload.phone}`);
  console.log(`Subject: ${payload.subject}`);
  console.log(`Message:\n${payload.message}`);

  return {
    success: true,
    submissionId,
  };
}
