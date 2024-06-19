import { Inject, Injectable } from '@nestjs/common';
import { Profile } from '@prisma/client';

import { Usecase } from '../../../../../core/interfaces';

import { IProfileService, PROFILE_SERVICE_PROVIDER } from '../../../domain';

@Injectable()
export class FetchUserProfile implements Usecase<Profile> {
  constructor(
    @Inject(PROFILE_SERVICE_PROVIDER)
    private readonly profileService: IProfileService,
  ) {}

  public async execute(userId: string): Promise<Profile> {
    return await this.profileService.fetchUserProfile(userId);
  }
}
