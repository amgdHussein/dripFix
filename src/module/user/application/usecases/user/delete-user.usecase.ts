import { Inject, Injectable } from '@nestjs/common';

import { Usecase } from '../../../../../core/interfaces';

import { IProfileService, IUserService, PROFILE_SERVICE_PROVIDER, User, USER_SERVICE_PROVIDER } from '../../../domain';

@Injectable()
export class DeleteUser implements Usecase<User> {
  constructor(
    @Inject(USER_SERVICE_PROVIDER)
    private readonly userService: IUserService,

    @Inject(PROFILE_SERVICE_PROVIDER)
    private readonly profileService: IProfileService,
  ) {}

  public async execute(id: string): Promise<User> {
    return await this.userService.deleteUser(id);
    // TODO: Delete user address, phone number, ...
  }
}
