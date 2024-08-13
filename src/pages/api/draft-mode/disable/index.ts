import type { APIRoute } from 'astro';
import { disableDraftMode } from '~/lib/draftMode';
import { handleUnexpectedError, invalidRequestResponse } from '../../utils';

/**
 * This route handler disables Next.js Draft Mode: we simply follow what the
 * guide says!
 *
 * https://nextjs.org/docs/app/building-your-application/configuring/draft-mode
 */
export const GET: APIRoute = (event) => {
  const { url } = event;
  // Parse query string parameters
  const redirectUrl = url.searchParams.get('url') || '/';

  try {
    // Avoid open redirect vulnerabilities
    if (redirectUrl.startsWith('http://') || redirectUrl.startsWith('https://')) {
      return invalidRequestResponse('URL must be relative!', 422);
    }

    disableDraftMode(event);
  } catch (error) {
    return handleUnexpectedError(error);
  }

  return event.redirect(redirectUrl, 307);
};
