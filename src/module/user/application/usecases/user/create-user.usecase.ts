import { Inject, Injectable } from '@nestjs/common';

import { Usecase } from '../../../../../core/interfaces';

import { IUserService, User, USER_SERVICE_PROVIDER } from '../../../domain';

@Injectable()
export class CreateUser implements Usecase<User> {
  constructor(
    @Inject(USER_SERVICE_PROVIDER)
    private readonly userService: IUserService,
  ) {}

  public async execute(user: Partial<User>): Promise<User> {
    user.active = false;
    user.role = 'USER';
    return await this.userService.createUser(user);
  }
}
