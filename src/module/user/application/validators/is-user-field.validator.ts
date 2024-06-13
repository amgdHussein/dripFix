/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { Utils } from '../../../../core/utils';
import { User } from '../../domain';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUserFieldConstraint implements ValidatorConstraintInterface {
  async validate(key: string, args: ValidationArguments): Promise<boolean> {
    if (typeof key !== 'string') return false;

    const keys = Utils.Object.getClassFields(User);
    return keys.includes(key);
  }

  defaultMessage(args: ValidationArguments): string {
    return 'filed given does not exist on user entity';
  }
}

export function IsUserField(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserFieldConstraint,
    });
  };
}
