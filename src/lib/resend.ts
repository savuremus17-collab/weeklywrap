import { Resend } from 'resend';

let _resend: Resend | null = null;

// Lazily create the client the first time it's actually needed, instead of
// throwing at module-import time when RESEND_API_KEY isn't configured yet.
export function getResend(): Resend {
  if (!_resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('Missing RESEND_API_KEY environment variable');
    }
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}
