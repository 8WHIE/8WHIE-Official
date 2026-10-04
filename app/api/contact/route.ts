import { validateContactSubmission, dispatchContactMessage } from '../../../lib/contact';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { isValid, errors, sanitized } = validateContactSubmission(body);

    // Spam honeypot
    if (sanitized.honeypot) {
      return Response.json(
        {
          success: true,
          message: "MESSAGE RECEIVED.\n\nWe'll get back to you.",
        },
        { status: 200 }
      );
    }

    if (!isValid) {
      return Response.json(
        {
          success: false,
          error: 'Validation failed. Please verify your information.',
          errors,
        },
        { status: 400 }
      );
    }

    const result = await dispatchContactMessage(sanitized);

    return Response.json(
      {
        success: true,
        message: "MESSAGE RECEIVED.\n\nWe'll get back to you.",
        submissionId: result.submissionId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[8WHIE API Error]:', error);
    return Response.json(
      {
        success: false,
        error: 'An internal error occurred while transmitting your message. Please reach out directly to iaryan9905@gmail.com.',
      },
      { status: 500 }
    );
  }
}
