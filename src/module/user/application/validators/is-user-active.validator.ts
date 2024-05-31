import { Inject, Injectable } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { IUserService, USER_SERVICE_PROVIDER, UserNotActiveException } from '../../domain';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUserActiveConstraint implements ValidatorConstraintInterface {
  constructor(
    @Inject(USER_SERVICE_PROVIDER)
    private readonly userService: IUserService,
  ) {}

  async validate(userId: string, args: ValidationArguments): Promise<boolean> {
    if (typeof userId !== 'string') return false;

    if (await this.userService.isUserActive(userId)) {
      return true;
    }

    throw new UserNotActiveException(userId);
  }

  defaultMessage(args: ValidationArguments): string {
    return 'user is not active';
  }
}

export function IsUserActive(validationOptions?: ValidationOptions): Function {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserActiveConstraint,
    });
  };
}
