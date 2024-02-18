import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

/**
 * Decorator that returns the currently authenticated user from the request context.
 * @returns {DecodedIdToken} Currently authenticated user
 */
export const CurrentUser = createParamDecorator((_: unknown, context: ExecutionContext): DecodedIdToken => {
  const ctx = context.switchToHttp().getRequest();
  return ctx.user;
});
