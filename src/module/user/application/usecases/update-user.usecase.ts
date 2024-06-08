import { Inject, Injectable } from '@nestjs/common';

import { Usecase } from '../../../../core/interfaces';

import { IUserService, User, USER_SERVICE_PROVIDER } from '../../domain';

@Injectable()
export class UpdateUser implements Usecase<User> {
  constructor(
    @Inject(USER_SERVICE_PROVIDER)
    private readonly userService: IUserService,
  ) {}

  public async execute(user: Partial<User> & { id: string }): Promise<User> {
    user.updatedAt = new Date();
    return await this.userService.updateUser(user);
  }
}
