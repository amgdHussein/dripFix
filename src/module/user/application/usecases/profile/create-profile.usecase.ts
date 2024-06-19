import { Inject, Injectable } from '@nestjs/common';

import { Usecase } from '../../../../../core/interfaces';

import { IProfileService, Profile, PROFILE_SERVICE_PROVIDER } from '../../../domain';

@Injectable()
export class CreateProfile implements Usecase<Profile> {
  constructor(
    @Inject(PROFILE_SERVICE_PROVIDER)
    private readonly profileService: IProfileService,
  ) {}

  public async execute(profile: Partial<Profile> & { userId: string }): Promise<Profile> {
    return await this.profileService.createProfile(profile);
  }
}
