import { Inject, Injectable } from '@nestjs/common';

import { Usecase } from '../../../../../core/interfaces';

import { IProfileService, Profile, PROFILE_SERVICE_PROVIDER } from '../../../domain';

@Injectable()
export class UpdateProfile implements Usecase<Profile> {
  constructor(
    @Inject(PROFILE_SERVICE_PROVIDER)
    private readonly profileService: IProfileService,
  ) {}

  public async execute(profile: Partial<Profile> & { id: string }): Promise<Profile> {
    delete profile.userId; // Avoid overwrite the user profile
    return await this.profileService.updateProfile(profile);
  }
}
