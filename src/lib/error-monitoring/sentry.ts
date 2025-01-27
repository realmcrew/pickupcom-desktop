import * as Sentry from '@sentry/react';

export function initSentry() {
  Sentry.init({
    dsn: 'https://ba001db697714195649c0190a78ab035@o4508368640409600.ingest.us.sentry.io/4508368642703360',
    integrations: [],
  });
}

export function captureException(error: unknown) {
  Sentry.captureException(error);
}

export function captureMessage(message: string) {
  Sentry.captureMessage(message);
}
