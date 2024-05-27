import { Inject, Injectable } from '@nestjs/common';

import { Usecase } from '../../../../core/shared';

import { IUserService, User, USER_SERVICE_PROVIDER } from '../../domain';

@Injectable()
export class ActivateUser implements Usecase {
  constructor(
    @Inject(USER_SERVICE_PROVIDER)
    private readonly userService: IUserService,
  ) {}

  public async execute(id: string): Promise<User> {
    return await this.userService.updateUser({
      id,
      active: true,
    });
  }
}
