import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const PUBLIC_ACCESS = 'PUBLIC';

/**
 * Decorator for allowing public access to a route
 * @returns
 */
export const Public = (): CustomDecorator => SetMetadata(PUBLIC_ACCESS, true);
