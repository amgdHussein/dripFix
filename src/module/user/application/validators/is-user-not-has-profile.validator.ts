/* eslint-disable @typescript-eslint/no-unused-vars */

import { Inject, Injectable } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { IProfileService, PROFILE_SERVICE_PROVIDER } from '../../domain';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUserNotHasProfileConstraint implements ValidatorConstraintInterface {
  constructor(
    @Inject(PROFILE_SERVICE_PROVIDER)
    private readonly profileService: IProfileService,
  ) {}

  async validate(userId: string, args: ValidationArguments): Promise<boolean> {
    if (typeof userId !== 'string') return false;

    try {
      const profile = await this.profileService.fetchUserProfile(userId);
      return !profile;
    } catch {
      return true;
    }
  }

  defaultMessage(args: ValidationArguments): string {
    return 'user already has profile';
  }
}

export function IsUserNotHasProfile(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserNotHasProfileConstraint,
    });
  };
}
