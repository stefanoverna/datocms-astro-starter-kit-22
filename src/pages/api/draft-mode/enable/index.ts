import type { APIRoute } from 'astro';
import { SECRET_API_TOKEN } from 'astro:env/server';
import { enableDraftMode } from '~/lib/draftMode';
import { handleUnexpectedError, invalidRequestResponse } from '../../utils';

/**
 * This route handler enables Next.js Draft Mode: we simply follow what the
 * guide says!
 *
 * https://nextjs.org/docs/app/building-your-application/configuring/draft-mode
 */
export const GET: APIRoute = (event) => {
  const { url } = event;

  // Parse query string parameters
  const token = url.searchParams.get('token');
  const redirectUrl = url.searchParams.get('url') || '/';

  try {
    // Ensure that the request is coming from a trusted source
    if (token !== SECRET_API_TOKEN) {
      return invalidRequestResponse('Invalid token', 401);
    }

    // Avoid open redirect vulnerabilities
    if (redirectUrl.startsWith('http://') || redirectUrl.startsWith('https://')) {
      return invalidRequestResponse('URL must be relative!', 422);
    }

    enableDraftMode(event);
  } catch (error) {
    return handleUnexpectedError(error);
  }

  return event.redirect(redirectUrl, 307);
};
