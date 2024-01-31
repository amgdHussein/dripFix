import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorator that returns the currently authenticated user from the request context.
 * @returns Currently authenticated user
 */
export const CurrentUser: ParameterDecorator = createParamDecorator((_: unknown, context: ExecutionContext) => {
  const ctx = context.switchToHttp().getRequest();
  return ctx.user;
});
