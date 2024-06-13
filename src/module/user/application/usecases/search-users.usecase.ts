import { Inject, Injectable } from '@nestjs/common';

import { Usecase } from '../../../../core/interfaces';
import { QueryOrder, QueryParam, SearchResult } from '../../../../core/types';

import { IUserService, User, USER_SERVICE_PROVIDER } from '../../domain';

@Injectable()
export class SearchUsers implements Usecase<User> {
  constructor(
    @Inject(USER_SERVICE_PROVIDER)
    private readonly userService: IUserService,
  ) {}

  public async execute(page: number = 1, limit: number = 10, params?: QueryParam[], order?: QueryOrder): Promise<SearchResult<User>> {
    return await this.userService.searchUsers(page, limit, params, order);
  }
}
