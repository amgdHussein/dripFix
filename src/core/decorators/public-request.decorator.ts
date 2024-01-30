import { CustomDecorator, SetMetadata } from '@nestjs/common';

/**
 * Decorator for allowing public access to a route
 */
export const Public = (): CustomDecorator => SetMetadata('public', true);
