/* eslint-disable @typescript-eslint/no-unused-vars */

import { Inject, Injectable } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { IUserService, USER_SERVICE_PROVIDER } from '../../domain';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUserExistConstraint implements ValidatorConstraintInterface {
  constructor(
    @Inject(USER_SERVICE_PROVIDER)
    private readonly userService: IUserService,
  ) {}

  async validate(userId: string, args: ValidationArguments): Promise<boolean> {
    if (typeof userId !== 'string') return false;
    return !!(await this.userService.fetchUser(userId));
  }

  defaultMessage(args: ValidationArguments): string {
    return 'user does not exist';
  }
}

export function IsUserExist(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserExistConstraint,
    });
  };
}
