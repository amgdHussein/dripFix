import { Inject, Injectable } from '@nestjs/common';

import { Role } from '../../../../core/constants';
import { Usecase } from '../../../../core/shared';

import { IUserService, User, USER_SERVICE_PROVIDER } from '../../domain';

@Injectable()
export class CreateUser implements Usecase {
  constructor(
    @Inject(USER_SERVICE_PROVIDER)
    private readonly userService: IUserService,
  ) {}

  public async execute(user: Partial<User>): Promise<User> {
    user.createdAt = new Date().toISOString();
    user.active = false;
    user.role = Role.USER;
    return await this.userService.createUser(user);
  }
}
