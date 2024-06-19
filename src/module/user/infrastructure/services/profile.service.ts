import { Inject, Injectable } from '@nestjs/common';

import { QueryOrder, QueryParam, SearchResult } from '../../../../core/types';

import { IProfileRepository, IProfileService, Profile, PROFILE_REPOSITORY_PROVIDER } from '../../domain';

@Injectable()
export class ProfileService implements IProfileService {
  constructor(
    @Inject(PROFILE_REPOSITORY_PROVIDER)
    private readonly profileRepo: IProfileRepository,
  ) {}

  public async fetchProfile(id: string): Promise<Profile> {
    return this.profileRepo.fetch(id);
  }

  public async fetchProfiles(): Promise<Profile[]> {
    return this.profileRepo.fetchAll();
  }

  public async fetchUserProfile(userId: string): Promise<Profile> {
    const result = await this.profileRepo.search(1, 1, [
      {
        key: 'userId',
        operator: 'eq',
        value: userId,
      },
    ]);

    return result.data[0];
  }

  public async searchProfiles(page: number, limit: number, params?: QueryParam[], order?: QueryOrder): Promise<SearchResult<Profile>> {
    return this.profileRepo.search(page, limit, params, order);
  }

  public async createProfile(profile: Partial<Profile> & { userId: string }): Promise<Profile> {
    return this.profileRepo.create(profile);
  }

  public async updateProfile(profile: Partial<Profile> & { id: string }): Promise<Profile> {
    return this.profileRepo.update(profile);
  }

  public async deleteProfile(id: string): Promise<Profile> {
    return this.profileRepo.delete(id);
  }
}
