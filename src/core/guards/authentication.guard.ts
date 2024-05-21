import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { AUTH_STRATEGY_PROVIDER } from '../constants';
import { PUBLIC_ACCESS } from '../decorators';

@Injectable()
export class AuthenticationGuard extends AuthGuard(AUTH_STRATEGY_PROVIDER) {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  /**
   * Check if the user is allowed to activate the given context.
   * @param {ExecutionContext} context - the execution context
   * @return {Promise<boolean>} a boolean indicating if the user is allowed to activate the context
   */
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_ACCESS, [context.getHandler(), context.getClass()]);

    if (isPublic) return true; // Skip authentication for public routes

    const isValid = await super.canActivate(context);

    if (isValid) return true; // Authentication succeeded, and user ID is updated in the request
    return false; // Authentication failed
  }
}
