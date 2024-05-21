import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthService } from '../auth';

import { AUTH_SERVICE_PROVIDER, Role } from '../constants';
import { PUBLIC_ACCESS, ROLE_ACCESS } from '../decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    @Inject(AUTH_SERVICE_PROVIDER)
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  /**
   * Check if the user can access the specified context based on their roles and permissions.
   * @param {ExecutionContext} context - the context in which the access is being checked
   * @return {boolean} true if the user can access the context, false otherwise
   */
  public canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndMerge<Role[]>(ROLE_ACCESS, [context.getClass(), context.getHandler()]) || [];

    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_ACCESS, [context.getHandler(), context.getClass()]);

    if (!requiredRoles.length || isPublic) {
      return true;
    }

    const user = context.switchToHttp().getRequest()?.user;
    const userRoles: Role[] = user?.roles || [];

    return this.authService.validateUserRole(userRoles, requiredRoles);
  }
}
