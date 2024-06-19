import { Inject, Injectable } from '@nestjs/common';

import { Usecase } from '../../../../../core/interfaces';
import { QueryOrder, QueryParam, SearchResult } from '../../../../../core/types';

import { IProfileService, Profile, PROFILE_SERVICE_PROVIDER } from '../../../domain';

@Injectable()
export class SearchProfiles implements Usecase<Profile> {
  constructor(
    @Inject(PROFILE_SERVICE_PROVIDER)
    private readonly profileService: IProfileService,
  ) {}

  public async execute(page: number = 1, limit: number = 10, params?: QueryParam[], order?: QueryOrder): Promise<SearchResult<Profile>> {
    return await this.profileService.searchProfiles(page, limit, params, order);
  }
}
