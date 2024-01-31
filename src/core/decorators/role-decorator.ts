import { CustomDecorator, SetMetadata } from '@nestjs/common';

import { Role } from '../constants';

export const ROLE_ACCESS = 'ROLES';

/**
 * Decorator that allows only specified roles to access a specific route
 * @param roles - Array of roles allowed to access the route
 * @returns
 */
export const RolesAllowed = (...roles: Role[]): CustomDecorator => SetMetadata(ROLE_ACCESS, roles);
