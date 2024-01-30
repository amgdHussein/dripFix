import { CustomDecorator, SetMetadata } from '@nestjs/common';

import { Role } from '../constants';

/**
 * Decorator that allows only specified roles to access a specific route
 * @param roles - Array of roles allowed to access the route
 * @returns CustomDecorator
 */
export const RolesAllowed = (...roles: Role[]): CustomDecorator => SetMetadata('roles', roles);
