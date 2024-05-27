import { Inject, Injectable } from '@nestjs/common';

import { QueryOrder, QueryParam, SearchResult } from '../../../../core/shared';

import { IUserRepository, IUserService, User, USER_REPOSITORY_PROVIDER } from '../../domain';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY_PROVIDER)
    private readonly userRepository: IUserRepository,
  ) {}

  public async fetchUser(id: string): Promise<User> {
    return this.userRepository.fetch(id);
  }

  public async fetchUsers(): Promise<User[]> {
    return this.userRepository.fetchAll();
  }

  public async searchUsers(page?: number, limit?: number, params?: QueryParam[], orderBy?: QueryOrder): Promise<SearchResult<User>> {
    return this.userRepository.search(page, limit, params, orderBy);
  }

  public async createUser(user: Partial<User>): Promise<User> {
    return this.userRepository.create(user);
  }

  public async createUsers(users: Partial<User>[]): Promise<User[]> {
    return this.userRepository.createBatch(users);
  }

  public async updateUser(user: Partial<User> & { id: string }): Promise<User> {
    return this.userRepository.update(user);
  }

  public async updateUsers(users: (Partial<User> & { id: string })[]): Promise<User[]> {
    return this.userRepository.updateBatch(users);
  }

  public async overwriteUser(user: User): Promise<User> {
    return this.userRepository.overwrite(user);
  }

  public async deleteUser(id: string): Promise<void> {
    return this.userRepository.delete(id);
  }

  public async isUserActive(id: string): Promise<boolean> {
    const user = await this.userRepository.fetch(id);
    return user && user.active;
  }
}
