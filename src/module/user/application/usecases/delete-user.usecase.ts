import { Inject, Injectable } from '@nestjs/common';

import { Usecase } from '../../../../core/shared';

import { IUserService, USER_SERVICE_PROVIDER } from '../../domain';

@Injectable()
export class DeleteUser implements Usecase {
  constructor(
    @Inject(USER_SERVICE_PROVIDER)
    private readonly userService: IUserService,
  ) {}

  public async execute(id: string): Promise<void> {
    return await this.userService.deleteUser(id);
    // TODO: Delete user address, phone number, ...
  }
}
