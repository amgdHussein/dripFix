import { Inject, Injectable } from '@nestjs/common';

import { QueryOrder, QueryParam, SearchResult } from '../../../../core/types';

import { IUserRepository, IUserService, User, USER_REPOSITORY_PROVIDER } from '../../domain';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY_PROVIDER)
    private readonly userRepo: IUserRepository,
  ) {}

  public async fetchUser(id: string): Promise<User> {
    return this.userRepo.fetch(id);
  }

  public async fetchUsers(): Promise<User[]> {
    return this.userRepo.fetchAll();
  }

  public async searchUsers(page: number, limit: number, params?: QueryParam[], order?: QueryOrder): Promise<SearchResult<User>> {
    return this.userRepo.search(page, limit, params, order);
  }

  public async createUser(user: Partial<User>): Promise<User> {
    return this.userRepo.create(user);
  }

  public async createUsers(users: Partial<User>[]): Promise<User[]> {
    return this.userRepo.createBatch(users);
  }

  public async updateUser(user: Partial<User> & { id: string }): Promise<User> {
    return this.userRepo.update(user);
  }

  public async updateUsers(users: (Partial<User> & { id: string })[]): Promise<User[]> {
    return this.userRepo.updateBatch(users);
  }

  public async deleteUser(id: string): Promise<User> {
    return this.userRepo.delete(id);
  }

  public async isUserActive(id: string): Promise<boolean> {
    const user = await this.userRepo.fetch(id);
    return user && user.active;
  }
}
