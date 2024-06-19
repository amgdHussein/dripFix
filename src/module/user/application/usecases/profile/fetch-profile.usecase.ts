import { Inject, Injectable } from '@nestjs/common';
import { Profile } from '@prisma/client';

import { Usecase } from '../../../../../core/interfaces';

import { IProfileService, PROFILE_SERVICE_PROVIDER, UserNotFoundException } from '../../../domain';

@Injectable()
export class FetchProfile implements Usecase<Profile> {
  constructor(
    @Inject(PROFILE_SERVICE_PROVIDER)
    private readonly profileService: IProfileService,
  ) {}

  public async execute(id: string): Promise<Profile> {
    return await this.profileService.fetchProfile(id).then(user => {
      if (user) return user;
      throw new UserNotFoundException(id);
    });
  }
}
