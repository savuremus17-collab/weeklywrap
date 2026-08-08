import * as Sentry from "@sentry/nextjs";

export const initSentry = () => {
  // Sentry is initialized automatically by nextjs integration
  // but we can add custom logic here if needed
};

export const captureException = (error: any, context?: any) => {
  Sentry.captureException(error, context);
};

export const captureMessage = (message: string, level?: Sentry.SeverityLevel) => {
  Sentry.captureMessage(message, level);
};
