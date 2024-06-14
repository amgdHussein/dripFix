import { Inject } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { Public } from '../../../../core/decorators';
import { IUserService, USER_SERVICE_PROVIDER } from '../../domain';
import { UserDto } from '../dtos';

@Resolver('User')
export class UserResolver {
  constructor(
    @Inject(USER_SERVICE_PROVIDER)
    private readonly userService: IUserService,
  ) {}

  @Public()
  @Query(() => UserDto, { name: 'user' })
  async fetchUser(@Args('id') id: string): Promise<UserDto> {
    return this.userService.fetchUser(id);
  }

  @Public()
  @Query(() => [UserDto], { name: 'users' })
  async fetchUsers(): Promise<UserDto[]> {
    return this.userService.fetchUsers();
  }
}
