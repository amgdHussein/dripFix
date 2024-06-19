import { Inject } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { Public } from '../../../../core/decorators';

import { IProfileService, IUserService, PROFILE_SERVICE_PROVIDER, USER_SERVICE_PROVIDER } from '../../domain';
import { ProfileSchema, UserSchema } from '../schemas';

@Resolver(() => ProfileSchema)
export class ProfileResolver {
  constructor(
    @Inject(USER_SERVICE_PROVIDER)
    private readonly userService: IUserService,

    @Inject(PROFILE_SERVICE_PROVIDER)
    private readonly profileService: IProfileService,
  ) {}

  @Public()
  @Query(() => ProfileSchema, { name: 'profile' })
  async fetchProfile(@Args('id') id: string): Promise<ProfileSchema> {
    return this.profileService.fetchProfile(id);
  }

  @Public()
  @Query(() => [ProfileSchema], { name: 'profiles' })
  async fetchProfiles(): Promise<ProfileSchema[]> {
    return this.profileService.fetchProfiles();
  }

  @Public()
  @ResolveField(() => UserSchema, { name: 'user', nullable: true })
  async fetchUser(@Parent() profile: ProfileSchema): Promise<UserSchema | null> {
    return this.userService.fetchUser(profile.userId);
  }
}
